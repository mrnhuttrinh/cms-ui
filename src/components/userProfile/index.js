import React from 'react';
import { translate } from 'react-i18next';

import { ContentWrapper } from '../commons';
import { TabTemplate } from '../commons';
import UserInformation from './userInformation';
import PasswordChange from './passwordChange';
import UserProfileReducers from './reducers';
import { Tab } from '../commons';

import './styles.scss';


class UserProfile extends React.Component {
  render() {
    return (
      <ContentWrapper
        title="User details"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate>
          <Tab label={this.props.t('user information')} >
            <UserInformation />
          </Tab>
          <Tab label={this.props.t('change password')} >
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
