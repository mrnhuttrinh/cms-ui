import Login, { reducers as loginReducers } from './login';
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
import ComingSoon from './comingSoon';
import Card, { reducers as CardReducers } from './card';
import CardList, { reducers as CardListReducers } from './cardList';

import UserProfile, { reducers as UserProfileReducers } from './userProfile';

import WalletList, { reducers as WalletListReducers } from './walletList';

import RoleList, { reducers as RoleListReducers } from './roleList';
import RoleDetail, { reducers as RoleDetailReducers } from './roleDetail';

import AddNewUser, { reducers as AddNewUserReducers } from './addNewUser';

import AddNewRole, { reducers as AddNewRoleReducer } from './addNewRole';

import AddNewCustomer, { reducers as AddNewCustomerReducer } from './addNewCustomer';

import Report, { reducers as ReportReducers } from './report';

import Launcher from './launcher';

import GlobalGuide from './globalGuide';

import './base-styles.scss';
// export view
export {
  Login,
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
  WalletList,
  Launcher,
  RoleList,
  RoleDetail,
  ComingSoon,
  GlobalGuide,
  AddNewUser,
  Report,
  AddNewRole,
  AddNewCustomer,
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
  ...WalletListReducers,
  ...RoleListReducers,
  ...RoleDetailReducers,
  ...ReportReducers,
  ...AddNewUserReducers,
  ...AddNewRoleReducer,
  ...AddNewCustomerReducer
};

// export commons control
export * from './commons';
