import React from 'react';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import currencyFormatter from 'currency-formatter';
import MerchantStatementsListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../../commons/table';
import MerchantStatementsDetailsList, { reducers as MerchantStatementsDetailsListReducer } from './merchantStatementDetails';
import { dateFormatter, dateTimeFormatter } from '../../../utils';

const STATUS_TYPE = {
  STORAGE: 'STORAGE',
  PENDING: 'PENDING',
};

const appBarStyle = {
  backgroundColor: '#FFFFFF',
  border: 'none',
  boxShadow: 'none'
};

const titleStyle = {
  color: '#000000',
  fontSize: 20,
  height: '56px',
  lineHeight: '56px',
}
const dateStyle = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: 20,
  height: '56px',
  lineHeight: '56px',
  paddingLeft: '18px',
}

const iconStyle = {
  color: '#000000',
}

class MerchantStatementsList extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedStatement: null,
    }
    this.handleCellClick = this.handleCellClick.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.getdata = this.getdata.bind(this);
  }
  getdata(pageable, sort, search) {
    this.props.actions.getMerchantStatement(this.props.merchantId, pageable, sort, search);
  }
  handleCellClick(indexRow, column, event) {
    this.setState({
      selectedStatement: dataAccesser(this.props.data)[indexRow],
    });
  }
  closeDetail() {
    this.setState({
      selectedStatement: null,
    });
  }
  render() {
    if(!this.state.selectedStatement) {
      return (
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.getdata}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          requesting={this.props.requesting}
          style={{
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
        />
      );
    }
    else {
      return ([
        <AppBar
          titleStyle={titleStyle}
          title={<div>{this.state.selectedStatement.merchant.name}<span style={dateStyle}>{dateFormatter(this.state.selectedStatement.dueDate)}</span></div>}
          style={appBarStyle}
          iconElementLeft={
            <IconButton
              onClick={this.closeDetail}
              style={{ marginTop: '-4px'}}
              iconStyle={iconStyle}
            >
              <FontIcon className="material-icons">arrow_back</FontIcon> Back
            </IconButton>
          }
        />,
        <MerchantStatementsDetailsList merchantStatementId={this.state.selectedStatement.id} />
      ]);
    }
  }
}

MerchantStatementsList.defaultProps = {
  columns: [
    {
      key: 'dueDate',
      text: 'date',
      type: TYPE.date,
      sort: 'DESC',
    },
    {
      key: 'merchant.name',
      text: 'merchant',
    },
    {
      key: 'totalTransaction',
      text: 'total transaction',
    },
    {
      key: 'openingAmount',
      text: 'opening amount',
      formater: currencyFormatter.format,
    },
    {
      key: 'closingAmount',
      text: 'closing amount',
      // formater: (amount) => currencyFormatter.format(parseFloat(amount),  { code: 'USD' }),
    },
    {
      key: 'createdAt',
      text: 'record at',
      type: TYPE.date,
      formater: dateTimeFormatter,
    },
    {
      key: 'createdBy',
      text: 'created by',
    },
    {
      key: 'status',
      text: 'status',
      type: TYPE.option,
      options: STATUS_TYPE,
    },
  ],
  sort: {
    key: 'dueDate',
    type: 'DESC',
  },
  search: {
    key: 'dueDate',
  },
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.MerchantStatementsListReducer.get('page'),
  sort: state.MerchantStatementsListReducer.get('sort'),
  search: state.MerchantStatementsListReducer.get('search'),
  data: state.MerchantStatementsListReducer.get('data'),
  requesting: state.MerchantStatementsListReducer.get('requesting'),
  error: state.MerchantStatementsListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(MerchantStatementsList));

export const reducers = {
  MerchantStatementsListReducer,
  ...MerchantStatementsDetailsListReducer,
}
