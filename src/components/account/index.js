import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';

import CustomerDetails from './accountDetails';


import AccountDetailReducer from './accountDetails/reducers';


const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)'
}
const indicatorStyle = {
  backgroundColor: '#009688'
}

class Dashboard extends React.Component {
  render() {
    const accountId = this.props.match.params.accountId;
    return (
      <div>
        <AppBar
          title={<span style={{
              color: 'rgba(0, 0, 0, 0.4)'
            }}>Chi Tiết Khách Hàng</span>}
          iconStyleLeft={{display: 'none'}}
          style={{
            backgroundColor: '#e8e8e8',
            boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)'
          }}
          iconElementRight={
            <MenuItem
              style={{
                color: '#009688',
                letterSpacing: '0px'
              }}
              leftIcon={
                <FontIcon
                  style={{
                    color: '#009688',
                  }}
                  className="material-icons"
                >refresh</FontIcon>}>
                REFRESH
            </MenuItem>
          }
        />
        <Tabs style={tabStyle} inkBarStyle={indicatorStyle}>
          <Tab style={tabStyle} label="THÔNG TIN CHUNG" >
            <CustomerDetails accountId={accountId} />
          </Tab>
          <Tab style={tabStyle} label="THẺ" >

          </Tab>
          <Tab style={tabStyle} label="LỊCH SỬ" >

          </Tab>
          <Tab style={tabStyle} label="GIAO DỊCH" >

          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;

export const reducers = {
  AccountDetailReducer,
};
