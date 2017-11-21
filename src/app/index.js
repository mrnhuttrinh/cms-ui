import React from 'react';

import { Admin, Resource } from 'admin-on-rest';
import { AccountList, EditAccount } from './account';
import { CustomerList, EditCustomer, CustomerShow } from './customer';
import { MerchantList, EditMerchant } from './merchant';
import restClient from '../utils/fetcher';
import PostIcon from 'material-ui/svg-icons/action/book';
import AccountIcon from 'material-ui/svg-icons/action/account-balance-wallet';
import CustomerIcon from 'material-ui/svg-icons/action/supervisor-account';

const App = () =>
(<Admin restClient={restClient} title="CMS" >
  <Resource name="customers" list={CustomerList} edit={EditCustomer} show={CustomerShow} icon={CustomerIcon} options={{ label: 'Khách Hàng' }}/>
  <Resource name="merchants" list={MerchantList} edit={EditMerchant} icon={CustomerIcon} options={{ label: 'Đại Lý' }}/>
  <Resource name="accounts" list={AccountList} edit={EditAccount} icon={AccountIcon} options={{ label: 'Tài Khoản' }}/>
</Admin>);

export default App;
