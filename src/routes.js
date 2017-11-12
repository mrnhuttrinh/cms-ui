import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  PrivateRoute,
  PublicRoute,
  ComponentsDemoRoute,
  NotFound
} from './containers';

import {
  Login,
  Dashboard,
  Customer,
  CustomerList,
} from './components';

// https://reacttraining.com/react-router/web/example/auth-workflow

const AppRoutes = () => (
  <Router>
    <MuiThemeProvider>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <ComponentsDemoRoute path="/components-demo" />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/customer/:customerId" component={Customer} />
        <PrivateRoute path="/customer" isExact component={CustomerList} />
        <Route component={NotFound}/>
      </Switch>
    </MuiThemeProvider>
  </Router>
);

export default AppRoutes;
