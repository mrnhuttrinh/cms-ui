import PrivateRoute, { reducers as privateRouteReducers } from './privateRoute';
import PublicRoute from './publicRoute';

export {
  PrivateRoute,
  PublicRoute,
};

export const reducers = {
  ...privateRouteReducers,
}
