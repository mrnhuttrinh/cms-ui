import React from 'react';
import { Tab } from 'material-ui/Tabs';
import { translate } from 'react-i18next';

import { ContentWrapper } from '../commons';
import { TabTemplate } from '../commons';
import UserInformation from './userInformation';
import PasswordChange from './passwordChange';
import UserProfileReducers from './reducers';
import {
  tabStyle,
  indicatorStyle,
} from './styles';

class UserProfile extends React.Component {
  render() {
    return (
      <ContentWrapper
        title="User details"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label={this.props.t('user information')} >
            <UserInformation />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('change password')} >
            <PasswordChange />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

export default translate('translations')(UserProfile);

export const reducers = {
  UserProfileReducers,
};
