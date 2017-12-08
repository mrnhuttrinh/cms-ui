import React from 'react';
import { Tab } from 'material-ui/Tabs';
import { TabTemplate } from '../commons';
import { ContentWrapper } from '../commons';
import AccountDetails from './accountDetails';
import AccountHistory from './accountHistory';
import AccountTransaction from './accountTransaction';


import AccountDetailReducer from './accountDetails/reducers';
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
            <AccountDetails accountId={accountId} />
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

export default Account;

export const reducers = {
  AccountDetailReducer,
  AccountTransactionReducer,
  AccountHistoryReducer,
};
