import React from 'react';
import { Tab } from 'material-ui/Tabs';
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
        title="Thông tin tài khoản"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label="THÔNG TIN TÀI KHOẢN" >
            <UserInformation />
          </Tab>
          <Tab style={tabStyle} label="ĐỔI MẬT KHẨU" >
            <PasswordChange />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

export default UserProfile;

export const reducers = {
  UserProfileReducers,
};