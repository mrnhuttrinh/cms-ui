import Login, { reducers as loginReducers } from './login';
import Dashboard from './dashboard';
import About from './about';
import Customer, { reducers as CustomerReducers } from './customer';
import CustomerList, { reducers as CustomerListReducers } from './customerList';
import ManagePrivilegeList, {reducers as ManagePrivilegeListReducer } from './managePrivilege';
import PrivilegeDetail, {reducers as PrivilegeDetailReducer } from './privilegeDetail';
import Account, { reducers as AccountReducers } from './account';
import AccountList, { reducers as AccountListReducers } from './accountList';

// export view
export {
  Login,
  Dashboard,
  About,
  Customer,
  CustomerList,
  ManagePrivilegeList,
  PrivilegeDetail,
  AccountList,
  Account,
};

export const reducers = {
  ...loginReducers,
  ...CustomerReducers,
  ...CustomerListReducers,
  ...ManagePrivilegeListReducer,
  ...AccountListReducers,
  ...AccountReducers,
  ...PrivilegeDetailReducer,
}

// export commons control
export * from './commons';
