import Login, { reducers as loginReducers } from './login';
import Dashboard from './dashboard';
import About from './about';
import Customer, { reducers as CustomerReducers } from './customer';
import CustomerList, { reducers as CustomerListReducers } from './customerList';

// export view
export {
  Login,
  Dashboard,
  About,
  Customer,
  CustomerList,
};

export const reducers = {
  ...loginReducers,
  ...CustomerReducers,
  ...CustomerListReducers,
}

// export commons control
export * from './commons';
