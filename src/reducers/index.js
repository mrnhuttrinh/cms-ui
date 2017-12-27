import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

// the section import the reducer of components
import animationGroup from './mainLoading';
import { reducers as componentsReducers } from '../components';
import { reducers as containerReducers } from '../containers';

const rootReducer = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  form: formReducer,
  animationGroup,
  ...componentsReducers,
  ...containerReducers,
});

export default rootReducer;
