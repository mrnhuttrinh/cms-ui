import Login, { reducers as loginReducers } from './login';
import Dashboard from './dashboard';
import About from './about';

// export view
export {
  Login,
  Dashboard,
  About,
};

export const reducers = {
  ...loginReducers,
}

// export commons control
export * from './commons';
