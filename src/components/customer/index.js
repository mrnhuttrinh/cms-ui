import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';

import CustomerDetails from './customerDetails';
import CustomerAccount from './customerAccount';
import CustomerHistory from './customerHistory';

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)'
}
const indicatorStyle = {
  backgroundColor: '#009688'
}

const CustomerShow = (props) => {
    return (
      <Tabs style={tabStyle} inkBarStyle={indicatorStyle}>
        <Tab style={tabStyle} label="THÔNG TIN CHUNG" >
          <CustomerDetails {...props} />
        </Tab>
        <Tab style={tabStyle} label="TÀI KHOẢN VÍ ĐIỆN TỬ" >
          <CustomerAccount {...props} />
        </Tab>
        <Tab style={tabStyle} label="LỊCH SỬ" >
          <CustomerHistory {...props} />
        </Tab>
      </Tabs>
    );
  }

export default CustomerShow;
