import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransactionByAccountListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE, dataAccesser } from '../../commons/table';

import TransactionDetail from '../../transactionDetail';

const TRANSACTION_TYPE = {
  'DEPOSIT': 'DEPOSIT',
  'EXPENSE': 'EXPENSE',
  'PAYMENT': 'PAYMENT',
  'REFUND': 'REFUND',
}

class TransactionByAccountList extends React.Component {
  constructor() {
    super();
    this.state = {
      transaction: null
    };
    this.refreshData = this.refreshData.bind(this);
    this.getData = this.getData.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.showTransactionDetail = this.showTransactionDetail.bind(this);
    this.closeTransactionDetail = this.closeTransactionDetail.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.showTransactionDetail(dataAccesser(this.props.data)[indexRow]);
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
  refreshData() {
    this.props.actions.getTransaction(this.props.cardId, {size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  getData(pageable, sort, search) {
    this.props.actions.getTransaction(this.props.cardId, pageable, sort, search);
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
          getData={this.getData}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          handleCellClick={this.handleCellClick}
          style={{
            height: '100%',
            display: 'block',
          }}
        />
      </div>
    );
  }
}

TransactionByAccountList.defaultProps = {
  columns: [
    {
      key: 'date',
      text: 'transaction date',
      type: TYPE.date,
    },
    {
      key: 'transaction.id',
      text: 'reference transaction',
    },
    {
      key: 'transactionType.typeCode',
      text: 'transaction type',
      type: TYPE.option,
      options: TRANSACTION_TYPE,
    },
    {
      key: 'amount',
      text: 'amount',
    },
    {
      key: 'transactionDetail.detail',
      text: 'Detail',
    },
    {
      key: 'createdAt',
      text: 'transaction created at',
      type: TYPE.date,
    },
  ],
  sort: {
    key: 'date',
    type: 'ASC',
  },
  search: {
    key: 'date',
  },
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.CardTransactionReducer.get('page'),
  sort: state.CardTransactionReducer.get('sort'),
  search: state.CardTransactionReducer.get('search'),
  data: state.CardTransactionReducer.get('data'),
  requesting: state.CardTransactionReducer.get('requesting'),
  error: state.CardTransactionReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionByAccountList);

export const reducers = {
  TransactionByAccountListReducer,
}
