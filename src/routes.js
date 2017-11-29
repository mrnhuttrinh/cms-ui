import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {
  PrivateRoute,
  PublicRoute,
  ComponentsDemoRoute,
  NotFound
} from './containers';

import {
  Login,
  Customer,
  CustomerList,
  ManagePrivilegeList,
  PrivilegeDetail,
  AccountList,
  Account,
} from './components';

// https://reacttraining.com/react-router/web/example/auth-workflow

const AppRoutes = ({refreshTokenRequesting}) => {
  return (
    <Router>
      <MuiThemeProvider>
        {
          refreshTokenRequesting ? (
            <div className="ecash-app-loading">
              <CircularProgress size={80} thickness={5} />
            </div>
          ) : (
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <ComponentsDemoRoute path="/components-demo" />
              <PrivateRoute exact path="/" component={CustomerList} />
              <PrivateRoute path="/dashboard" component={CustomerList} />
              <PrivateRoute path="/customer/:customerId" component={Customer} />
              <PrivateRoute path="/customer" isExact component={CustomerList} />
              <PrivateRoute path="/permission/:userId" component={PrivilegeDetail} />
              <PrivateRoute path="/permission" isExact component={ManagePrivilegeList} />
              <PrivateRoute path="/account/:accountId" component={Account} />
              <PrivateRoute path="/account" isExact component={AccountList} />
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
