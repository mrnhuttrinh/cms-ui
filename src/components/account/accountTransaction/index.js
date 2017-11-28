import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransactionByAccountListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE } from '../../commons/table';

class TransactionByAccountList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.getData = this.getData.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    // this.props.history.push(`/customer/${dataAccesser(this.props.data)[indexRow].id}`);
  }
  refreshData() {
    this.props.actions.getTransaction(this.props.accountId, {size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  getData(pageable, sort, search) {
    this.props.actions.getTransaction(this.props.accountId, pageable, sort, search);
  }
  render() {
    return (
      <div>
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.getData}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
        />
      </div>
    );
  }
}

TransactionByAccountList.defaultProps = {
  columns: [
    {
      key: 'date',
      text: 'TG PHÁT SINH',
      type: TYPE.date,
    },
    {
      key: 'transaction.id',
      text: 'SỐ THAM CHIẾU',
    },
    {
      key: 'transactionType.description',
      text: 'LOẠI GD',
    },
    {
      key: 'amount',
      text: 'SỐ TIỀN',
    },
    {
      key: 'transactionDetail.detail',
      text: 'NỘI DUNG',
    },
    {
      key: 'createdAt',
      text: 'TG CẬP NHẬT',
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
  page: state.AccountTransactionReducer.get('page'),
  sort: state.AccountTransactionReducer.get('sort'),
  search: state.AccountTransactionReducer.get('search'),
  data: state.AccountTransactionReducer.get('data'),
  requesting: state.AccountTransactionReducer.get('requesting'),
  error: state.AccountTransactionReducer.get('error'),
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
