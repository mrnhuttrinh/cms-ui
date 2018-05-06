import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import AccountListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';
import ConfirmDialog from './confirmDialog';

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
  constructor(props, context) {
    super(props, context);
    this.state = {
      openDialog: false,
    };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.allCheckBoxChange = this.allCheckBoxChange.bind(this);
    this.onClickCloseDialog = this.onClickCloseDialog.bind(this);
  }
  getData() {
    return dataAccesser(this.props.data || {});
  }
  onClickCloseDialog() {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  }
  allCheckBoxChange() {
    const accountList = [];
    _.each(this.getData(), account => {
      accountList.push(account);
    });
    const allCheckBoxCheck = _.filter(this.getData(), account => account.status === ACCOUNT_STATUS.DEACTIVE);
    const status = allCheckBoxCheck && allCheckBoxCheck.length > 0 ? ACCOUNT_STATUS.ACTIVE : ACCOUNT_STATUS.DEACTIVE;
    this.props.actions.updateAccountListStatus(accountList, status).then(() => {
      this.setState({
        openDialog: !this.state.openDialog,
      });
      this.context.forceReloadContent();
    });
  }
  handleCellClick(indexRow, column, event) {
    const account = this.getData()[indexRow];
    const { updateAccountStatus } = this.props;
    const accountStatus = updateAccountStatus.get(account.id);
    if (accountStatus && accountStatus.requesting) {
      return;
    }
    if (column === 7) {
      // click checkbox
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
        type: TYPE.option,
        options: ACCOUNT_STATUS,
        headerFormatter: (t) => {
          const { updateAccountListStatus } = this.props;
          if (updateAccountListStatus && updateAccountListStatus.get('requesting')) {
            return (
              <CircularProgress size={30} thickness={3} />
            );
          }
          const allCheckBoxCheck = _.filter(this.getData(), account => account.status === ACCOUNT_STATUS.DEACTIVE);
          const checked = allCheckBoxCheck && allCheckBoxCheck.length > 0 ? false : true;
          return (
            <div style={{display: 'block', height: '58px', lineHeight: '58px'}}>
              <span style={{display: 'inline-block', height: '18px', width: '25px'}}>
                <Checkbox checked={checked} onClick={this.onClickCloseDialog} />
              </span>
              <span style={{display: 'inline-block'}}>{this.props.t('STATUS')}</span>
            </div>
          );
        },
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
    const allCheckBoxCheck = _.filter(this.getData(), account => account.status === ACCOUNT_STATUS.DEACTIVE);
    const checked = allCheckBoxCheck && allCheckBoxCheck.length > 0 ? false : true;
    const { updateAccountListStatus } = this.props;
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
        <ConfirmDialog
          onClickCloseDialog={this.onClickCloseDialog}
          updateEntireUser={this.allCheckBoxChange}
          openDialog={this.state.openDialog}
          from={checked ? ACCOUNT_STATUS.ACTIVE : ACCOUNT_STATUS.DEACTIVE}
          to={checked ? ACCOUNT_STATUS.DEACTIVE : ACCOUNT_STATUS.ACTIVE}
          requesting={updateAccountListStatus && updateAccountListStatus.get('requesting')}
        />
      </ContentWrapper>
    );
  }
}

AccountList.contextTypes = {
  forceReloadContent: PropTypes.func,
};

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
  updateAccountListStatus: state.AccountListReducer.get('updateAccountListStatus'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(AccountList));

export const reducers = {
  AccountListReducer,
}
