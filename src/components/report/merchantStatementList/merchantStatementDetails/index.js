import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MerchantStatementsDetailsListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE } from '../../../commons/table';

const TRANSACTIONS_TYPE = {
  DEPOSIT: 'DEPOSIT',
  EXPENSE: 'EXPENSE',
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
}

class MerchantStatementsDetailsList extends React.Component {
  constructor() {
    super();
    this.getdata = this.getdata.bind(this);
  }
  getdata(pageable, sort, search) {
    this.props.actions.getMerchantStatementDetails(this.props.merchantStatementId, pageable, sort, search);
  }
  render() {
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
          height: 'calc(100% - 120px)',
          display: 'block',
        }}
      />
    );
  }
}

MerchantStatementsDetailsList.defaultProps = {
  columns: [
    {
      key: 'transactionType.typeCode',
      text: 'transaction type',
      type: TYPE.option,
      options: TRANSACTIONS_TYPE,
    },
    {
      key: 'description',
      text: 'Detail',
      sort: 'ASC',
    },
    {
      key: 'transactionAmount',
      text: 'amount',
    },
    {
      key: 'createdBy',
      text: 'created by',
    },
  ],
  sort: {
    key: 'description',
    type: 'ASC',
  },
  search: {
    key: 'description',
  },
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.MerchantStatementsDetailsListReducer.get('page'),
  sort: state.MerchantStatementsDetailsListReducer.get('sort'),
  search: state.MerchantStatementsDetailsListReducer.get('search'),
  data: state.MerchantStatementsDetailsListReducer.get('data'),
  requesting: state.MerchantStatementsDetailsListReducer.get('requesting'),
  error: state.MerchantStatementsDetailsListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(MerchantStatementsDetailsList));

export const reducers = {
  MerchantStatementsDetailsListReducer,
}
