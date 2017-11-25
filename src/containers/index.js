import PrivateRoute, { reducers as privateRouteReducers } from './privateRoute';
import PublicRoute from './publicRoute';
import ComponentsDemoRoute from './components-demo';
import NotFound from './notFound';

export {
  ComponentsDemoRoute,
  PrivateRoute,
  PublicRoute,
  NotFound
};

export const reducers = {
  ...privateRouteReducers,
}
