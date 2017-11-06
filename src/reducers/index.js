import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

// the section import the reducer of components
import dashboardReducer from '../components/dashboard/reducers';
import loginReducer from '../components/login/reducers';

const rootReducer = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  form: formReducer,
  dashboard: dashboardReducer,
  loginReducer,
});

export default rootReducer;
