import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';

const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
}

class AccountList extends React.Component {
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
        title="Account list"
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

AccountList.defaultProps = {
  columns: [
    {
      key: 'id',
      text: 'account id',
      sort: 'ASC',
    }, {
      key: 'accountName',
      text: 'Account name',
    }, {
      key: 'accountType.description',
      text: 'Type',
    }, {
      key: 'customer.lastName',
      text: 'last name',
      formater: (data) => (data && data.customer ? `${data.customer.lastName}` : ''),
    }, {
      key: 'customer.firstName',
      text: 'first name',
      formater: (data) => (data && data.customer ? `${data.customer.firstName}` : ''),
    }, {
      key: 'plan.planType.description',
      text: 'Plan',
    }, {
      key: 'dateOpened',
      text: 'Date opened',
      type: TYPE.date,
    }, {
      key: 'status',
      text: 'status',
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
)(AccountList);

export const reducers = {
  AccountListReducer,
}
