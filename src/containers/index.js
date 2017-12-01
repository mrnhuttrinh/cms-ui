import PrivateRoute, { reducers as privateRouteReducers } from './privateRoute';
import PublicRoute from './publicRoute';
import ComponentsDemoRoute from './components-demo';

export {
  ComponentsDemoRoute,
  PrivateRoute,
  PublicRoute,
};

export const reducers = {
  ...privateRouteReducers,
}
