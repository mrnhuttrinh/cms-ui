import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';

const ACCOUNT_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

class CustomerList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/account/${this.props.dataAccesser(this.props.data)[indexRow].id}`);
  }
  render() {
    return (
      <ContentWrapper
        title="Danh sách tài khoản ví"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getAccountList}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          style={{
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
        />
      </ContentWrapper>
    );
  }
}

CustomerList.defaultProps = {
  columns: [
    {
      key: 'id',
      text: 'STK',
      sort: 'ASC',
    }, {
      key: 'accountName',
      text: 'TÊN KHOẢN',
    }, {
      key: 'accountType.description',
      text: 'LOẠI',
    }, {
      key: 'customer.lastName',
      text: 'HỌ',
      formater: (data) => (data && data.customer ? `${data.customer.lastName}` : ''),
    }, {
      key: 'customer.firstName',
      text: 'TÊN',
      formater: (data) => (data && data.customer ? `${data.customer.firstName}` : ''),
    }, {
      key: 'plan.planType.description',
      text: 'HẠNG VÍ',
    }, {
      key: 'dateOpened',
      text: 'NGÀY MỞ',
      type: TYPE.date,
    }, {
      key: 'status',
      text: 'TRẠNG THÁI',
      type: TYPE.option,
      options: ACCOUNT_STATUS,
    }
  ],
  sort: {
    key: 'id',
    type: 'ASC',
  },
  data: null,
  size: 10,
  search: {
    key: 'id',
  },
  dataAccesser: (data) => (data.content),
  pageAccesser: (data) => (data),
}

const mapStateToProps = (state) => ({
  page: state.AccountListReducer.get('page'),
  sort: state.AccountListReducer.get('sort'),
  search: state.AccountListReducer.get('search'),
  data: state.AccountListReducer.get('data'),
  requesting: state.AccountListReducer.get('requesting'),
  error: state.AccountListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerList);

export const reducers = {
  AccountListReducer,
}
