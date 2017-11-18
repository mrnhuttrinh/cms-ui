import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import ReduxToastr from 'react-redux-toastr';

// import css
import './styles';
import registerServiceWorker from './registerServiceWorker';
import App from './routes';
import { refreshLogin } from './components/login/actions'; 

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// always refresh token when user reload page 
store.dispatch(refreshLogin());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ReduxToastr
          timeOut={5000}
          newestOnTop
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
        <App history={history} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();