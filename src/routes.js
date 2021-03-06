import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AnimationGroup, GlobalGuide } from './components';
import {
  PrivateRoute,
  PublicRoute,
} from './containers';

import {
  Login,
  Customer,
  CustomerList,
  ManagePrivilegeList,
  PrivilegeDetail,
  AccountList,
  Account,
  MerchantList,
  Merchant,
  NotFound,
  CardList,
  Card,
  UserProfile,
  WalletList,
  RoleList,
  RoleDetail,
  Launcher,
  ComingSoon,
  AddNewUser,
  Report,
  AddNewRole,
  AddNewCustomer,
} from './components';

// https://reacttraining.com/react-router/web/example/auth-workflow

const AppRoutes = ({refreshTokenRequesting}) => {
  return (
    <Router>
      <MuiThemeProvider>
        <GlobalGuide />
        {
          refreshTokenRequesting ? (
            <div className="ecash-app-loading">
              <AnimationGroup
                loading={true}
                style={{
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          ) : (
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Launcher} />

              <PrivateRoute path="/customer/new-customer" isExact component={AddNewCustomer} parentComponent={CustomerList} />
              <PrivateRoute path="/customer/:customerId" component={Customer} />
              <PrivateRoute path="/customer" isExact component={CustomerList} />

              <PrivateRoute path="/permission/new-user" isExact component={AddNewUser} parentComponent={ManagePrivilegeList} />
              <PrivateRoute path="/permission/:userId" component={PrivilegeDetail} />
              <PrivateRoute path="/permission" isExact component={ManagePrivilegeList} />

              <PrivateRoute path="/account/:accountId" component={Account} />
              <PrivateRoute path="/account" isExact component={AccountList} />

              <PrivateRoute path="/merchant/:merchantId" isExact component={Merchant} />
              <PrivateRoute path="/merchant" isExact component={MerchantList} />

              <PrivateRoute path="/card/:cardId" isExact component={Card} />
              <PrivateRoute path="/card" isExact component={CardList} />

              <PrivateRoute path="/wallet" isExact component={WalletList} />

              <PrivateRoute path="/user-profile" isExact component={UserProfile} />

              <PrivateRoute path="/role/new-role" isExact component={AddNewRole} parentComponent={RoleList} />
              <PrivateRoute path="/role/:id" isExact component={RoleDetail} />
              <PrivateRoute path="/role" isExact component={RoleList} />

              <PrivateRoute path="/settings" isExact component={ComingSoon} />

              <PrivateRoute path="/report" isExact component={Report} />

              <Route component={NotFound}/>
            </Switch>
          )
        }
      </MuiThemeProvider>
    </Router>
  )
};

const mapStateToProps = (state) => ({
  refreshTokenRequesting: state.loginReducer.get('refreshTokenRequesting'),
});

export default connect(
  mapStateToProps,
)(AppRoutes);
