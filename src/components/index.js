import Login, { reducers as loginReducers } from './login';
import Dashboard from './dashboard';
import About from './about';
import Customer, { reducers as CustomerReducers } from './customer';
import CustomerList, { reducers as CustomerListReducers } from './customerList';
import ManagePrivilegeList, {reducers as ManagePrivilegeListReducer } from './managePrivilege';
import PrivilegeDetail from './privilegeDetail';

// export view
export {
  Login,
  Dashboard,
  About,
  Customer,
  CustomerList,
  ManagePrivilegeList,
  PrivilegeDetail,
};

export const reducers = {
  ...loginReducers,
  ...CustomerReducers,
  ...CustomerListReducers,
  ...ManagePrivilegeListReducer,
}

// export commons control
export * from './commons';
