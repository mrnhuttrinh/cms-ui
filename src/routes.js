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
  NotFound
} from './containers';

import {
  Login,
  Dashboard,
} from './components';

// https://reacttraining.com/react-router/web/example/auth-workflow

const AppRoutes = () => (
  <Router>
    <MuiThemeProvider>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route component={NotFound}/>
      </Switch>
    </MuiThemeProvider>
  </Router>
);

export default AppRoutes;