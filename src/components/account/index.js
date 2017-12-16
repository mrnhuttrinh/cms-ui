import React from 'react';
import { Tab } from 'material-ui/Tabs';
import { translate } from 'react-i18next';

import { TabTemplate } from '../commons';
import { ContentWrapper } from '../commons';
import AccountDetails from './accountDetails';
import AccountCards from './accountCards';
import AccountCustomer from './accountCustomer';
import AccountHistory from './accountHistory';
import AccountTransaction from './accountTransaction';
import AccountDetailReducer from './accountDetails/reducers';
import AccountCardsReducer from './accountCards/reducers';
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
        title={this.props.t('Account details')}
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label={this.props.t('general information')} >
            <AccountDetails accountId={accountId} />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('Customer')} >
            <AccountCustomer />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('cards')} >
            <AccountCards accountId={accountId} />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('history')} >
            <AccountHistory accountId={accountId} />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('transaction')} >
            <AccountTransaction accountId={accountId} />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

export default translate('translations')(Account);

export const reducers = {
  AccountDetailReducer,
  AccountTransactionReducer,
  AccountHistoryReducer,
  AccountCardsReducer,
};
