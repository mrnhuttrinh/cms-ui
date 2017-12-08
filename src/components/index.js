import Login, { reducers as loginReducers } from './login';
import Dashboard from './dashboard';
import About from './about';
import Customer, { reducers as CustomerReducers } from './customer';
import CustomerList, { reducers as CustomerListReducers } from './customerList';
import ManagePrivilegeList, {reducers as ManagePrivilegeListReducer } from './managePrivilege';
import PrivilegeDetail, {reducers as PrivilegeDetailReducer } from './privilegeDetail';
import Account, { reducers as AccountReducers } from './account';
import AccountList, { reducers as AccountListReducers } from './accountList';

import Merchant, { reducers as MerchantDetailReducers } from './merchant';
import MerchantList, { reducers as MerchantListReducers } from './merchantList';

import NotFound from './notFound';
import Card, { reducers as CardReducers } from './card';
import CardList, { reducers as CardListReducers } from './cardList';

import UserProfile, { reducers as UserProfileReducers } from './userProfile';
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
  MerchantList,
  Merchant,
  NotFound,
  CardList,
  Card,
  UserProfile,
};

export const reducers = {
  ...loginReducers,
  ...CustomerReducers,
  ...CustomerListReducers,
  ...ManagePrivilegeListReducer,
  ...AccountListReducers,
  ...AccountReducers,
  ...PrivilegeDetailReducer,
  ...MerchantListReducers,
  ...MerchantDetailReducers,
  ...CardListReducers,
  ...CardReducers,
  ...UserProfileReducers,
}

// export commons control
export * from './commons';
