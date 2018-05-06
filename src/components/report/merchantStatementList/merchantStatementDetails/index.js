import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import MerchantStatementsDetailsListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE, dataAccesser } from '../../../commons/table';
import TransactionDetail from '../../../transactionDetail';

const TRANSACTIONS_TYPE = {
  DEPOSIT: 'DEPOSIT',
  EXPENSE: 'EXPENSE',
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
}

class MerchantStatementsDetailsList extends React.Component {
  constructor() {
    super();
    this.state = {
      transaction: null
    };
    this.getdata = this.getdata.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.showTransactionDetail = this.showTransactionDetail.bind(this);
    this.closeTransactionDetail = this.closeTransactionDetail.bind(this);
  }
  getdata(pageable, sort, search) {
    this.props.actions.getMerchantStatementDetails(this.props.merchantStatementId, pageable, sort, search);
  }
  handleCellClick(indexRow, column, event) {
    const data = dataAccesser(this.props.data)[indexRow];
    const transaction = {
      transactionDetail: {
        detail: data.description
      },
      amount: data.transactionAmount,
      date: data.transactionDate,
      ...data,
    };
    this.showTransactionDetail(transaction);
  }
  showTransactionDetail(transaction) {
    this.setState({
      transaction
    });
  }
  closeTransactionDetail() {
    this.setState({
      transaction: null
    });
  }
  render() {
    return (
      <div>
        <TransactionDetail
          open={this.state.transaction !== null}
          transaction={this.state.transaction}
          handleClose={this.closeTransactionDetail}
        />
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
          handleCellClick={this.handleCellClick}
        />
      </div>
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
      formater: (data, t) => {
        const description = JSON.parse(_.get(data, 'description'));
        if (description && description.invoiceType === 'canteen_invoice') {
          return `${t('Invoice')}: ${t('Canteen Invoice')}`;
        }
        if (description && (description.sender || description.teller)) {
          return `${t('Sender')}: ${description.sender}`;
        }
        return description;
      }
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
  size: 8,
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
