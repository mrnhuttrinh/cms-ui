import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import CustomerDetails from './customerDetails';
import CustomerAccount from './customerAccount';
import CustomerHistory from './customerHistory';


import CustomerDetailReducer from './reducers';
import CustomerAccountReducer from './customerAccount/reducers';

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)'
}
const indicatorStyle = {
  backgroundColor: '#009688'
}

class Customer extends React.Component {
  componentWillMount() {
    this.props.actions.getCustomer(this.props.match.params.customerId);
  }
  render() {
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
            <CustomerDetails customer={this.props.customer} />
          </Tab>
          <Tab style={tabStyle} label="TÀI KHOẢN VÍ ĐIỆN TỬ" >
            <CustomerAccount customerId={this.props.match.params.customerId} />
          </Tab>
          <Tab style={tabStyle} label="LỊCH SỬ" >
            <CustomerHistory customer={this.props.customer} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  customer: state.CustomerDetailReducer.get('customer'),
  requesting: state.CustomerDetailReducer.get('requesting'),
  error: state.CustomerDetailReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);


export const reducers = {
  CustomerDetailReducer,
  CustomerAccountReducer,
};
