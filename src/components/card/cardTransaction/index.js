import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransactionByAccountListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE } from '../../commons/table';

class TransactionByAccountList extends React.Component {
  constructor() {
    super();
    this.refreshData = this.refreshData.bind(this);
    this.getData = this.getData.bind(this);
  }
  refreshData() {
    this.props.actions.getTransaction(this.props.cardId, {size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  getData(pageable, sort, search) {
    this.props.actions.getTransaction(this.props.cardId, pageable, sort, search);
  }
  render() {
    return (
      <DataTable
        columns={this.props.columns}
        sort={this.props.sort}
        data={this.props.data}
        getData={this.getData}
        size={this.props.size}
        search={this.props.search}
        dataAccesser={this.props.dataAccesser}
        pageAccesser={this.props.pageAccesser}
        style={{
          height: '100%',
          display: 'block',
        }}
      />
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
      key: 'transactionType.description',
      text: 'transaction type',
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
