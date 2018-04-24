import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import AccountListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';

const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
}

const ACCOUNT_TYPE = {
  DEFAULT: 'DEFAULT',
}

const PLAN_TYPE = {
  DEFAULT: 'DEFAULT',
}

class AccountList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    const account = dataAccesser(this.props.data)[indexRow];
    const { updateAccountStatus } = this.props;
    const accountStatus = updateAccountStatus.get(account.id);
    if (accountStatus && accountStatus.requesting) {
      return;
    }
    if (column === 7) {
      // click checkbox
      let status = account.status === ACCOUNT_STATUS.ACTIVE ? ACCOUNT_STATUS.DEACTIVE : ACCOUNT_STATUS.ACTIVE;
      this.props.actions.updateAccountStatus(account);
    } else {
      this.props.history.push(`/account/${account.id}`);
    }
  }
  columnDefine() {
    return [
      {
        key: 'id',
        text: 'account id',
        sort: 'ASC',
      }, {
        key: 'accountName',
        text: 'Account name',
      }, {
        key: 'accountType.typeCode',
        text: 'Type',
        type: TYPE.option,
        options: ACCOUNT_TYPE,
      }, {
        key: 'customer.lastName',
        text: 'last name',
        formater: (data) => (data && data.customer ? `${data.customer.lastName}` : ''),
      }, {
        key: 'customer.firstName',
        text: 'first name',
        formater: (data) => (data && data.customer ? `${data.customer.firstName}` : ''),
      }, {
        key: 'plan.planType.typeCode',
        text: 'Plan',
        type: TYPE.option,
        options: PLAN_TYPE,
      }, {
        key: 'dateOpened',
        text: 'Date opened',
        type: TYPE.date,
      }, {
        key: 'status',
        text: 'status',
        type: TYPE.option,
        options: ACCOUNT_STATUS,
        formater: (d, t) => {
          const { updateAccountStatus } = this.props;
          const accountStatus = updateAccountStatus.get(d.id);
          if (accountStatus && accountStatus.requesting) {
            return (
              <CircularProgress size={30} thickness={3} />
            );
          }
          let checked = d.status === ACCOUNT_STATUS.ACTIVE ? true : false;
          return (
            <Checkbox checked={checked} />
          );
        },
      }
    ];
  }
  render() {
    return (
      <ContentWrapper
        title="Account list"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.columnDefine()}
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
          requesting={this.props.requesting}
        />
      </ContentWrapper>
    );
  }
}

AccountList.defaultProps = {
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
  updateAccountStatus: state.AccountListReducer.get('updateAccountStatus'),
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
