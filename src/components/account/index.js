import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'material-ui/Tabs';
import { TabTemplate } from '../commons';
import { ContentWrapper } from '../commons';
import * as actions from './actions';

import AccountDetails from './accountDetails';
import AccountHistory from './accountHistory';
import AccountTransaction from './accountTransaction';


import AccountDetailReducer from './reducers';
import AccountTransactionReducer from './accountTransaction/reducers';
import AccountHistoryReducer from './accountHistory/reducers';


const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)',
  minHeight: 'calc(100% - 56px)',
  position: 'relative',
};

const indicatorStyle = {
  backgroundColor: '#009688'
};

class Account extends React.Component {
  componentWillMount() {
    this.props.actions.getAccountDetails(this.props.match.params.accountId);
  }
  render() {
    const accountId = this.props.match.params.accountId;
    return (
      <ContentWrapper
        title="Chi tiết tài khoản"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label="THÔNG TIN CHUNG" >
            <AccountDetails account={this.props.account} />
          </Tab>
          <Tab style={tabStyle} label="LỊCH SỬ" >
            <AccountHistory accountId={accountId} />
          </Tab>
          <Tab style={tabStyle} label="GIAO DỊCH" >
            <AccountTransaction accountId={accountId} />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.AccountDetailReducer.get('account'),
  requesting: state.AccountDetailReducer.get('requesting'),
  error: state.AccountDetailReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);

export const reducers = {
  AccountDetailReducer,
  AccountTransactionReducer,
  AccountHistoryReducer,
};
