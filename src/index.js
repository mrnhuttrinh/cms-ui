import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import ReduxToastr from 'react-redux-toastr';
import { I18nextProvider } from 'react-i18next';
import _ from 'lodash';
import { DEFAULT_LANGUAGE } from './constants';
import i18n from './i18n';

// import css
import './styles';
import registerServiceWorker from './registerServiceWorker';
import App from './routes';
import { refreshLogin } from './components/login/actions';
import { setItem, getItem, parseStringToObjectJson } from './utils';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// always refresh token when user reload page
store.dispatch(refreshLogin());

// setting language
store.subscribe(() => {
  const state = store.getState();
  const data = state.loginReducer.get('data');

  let language = getItem('language') || DEFAULT_LANGUAGE;
  // user have been signed in
  if (!_.isEmpty(data) && !_.isEmpty(data.user)) {
    const loggedUser = data.user;
    language = (parseStringToObjectJson(loggedUser.setting)).language || DEFAULT_LANGUAGE;
  }
  const currentLanguage = i18n.language;
  if (language !== currentLanguage) {
    setItem('language', language);
    i18n.changeLanguage(language);
  }
});

render(
  <I18nextProvider i18n={ i18n }>
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
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);
registerServiceWorker();
