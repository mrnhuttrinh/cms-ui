import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next'; 
import {Field, reduxForm, getFormValues} from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import {
  TextField,
  Checkbox,
} from '../commons';
import {
  PATTERN_EMAIL,
  LANGUAGE_SELECTION,
} from '../../constants';
import * as actions from './actions';

import loginReducer from './reducers';

import './styles.scss';

const validate = values => {
  const errors = {};
  if (
    values.email && !PATTERN_EMAIL.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.onClickSignIn = this.onClickSignIn.bind(this);
    this.onSelectLanguage = this.onSelectLanguage.bind(this);
  }
  onClickSignIn() {
    const {
      values = {},
      location: {
        state = {}
      },
      history,
    } = this.props;
    this.props.actions.submitLogin(values.email, values.password, this.props.language).then(() => {
      history.push(state.from);
    });
  }
  onSelectLanguage (event, index, value) {
    this.props.actions.changeLanguage(value);
  }
  buildOptionLanguage() {
    return _.map(LANGUAGE_SELECTION, language => {
      return (
        <MenuItem key={language.value} value={language.value} primaryText={this.props.t(language.text)} />
      )
    });
  }
  renderOptionLanguages() {
    return (
      <DropDownMenu
        value={this.props.language}
        onChange={this.onSelectLanguage}
        style={{textAlign: 'left', width: '45%'}}
      >
        {this.buildOptionLanguage()}
      </DropDownMenu>
    );
  }
  render() {
    const errorTextLoginFailed = 'Sorry, that login was invalid. Please try again.';
    return (
      <form onSubmit={this.onClickSignIn} className="login-form">
        <div className="ecash-login">
          <div className="ecash-login-logo">
            <div>
              <img alt="Ecash" src="/assets/images/swt_logo.png"/>
            </div>
          </div>
          <div className="ecash-login-form">
            <div>
              <p className="title">
              {this.props.t('Sign In To Admin')}
              </p>
              <div className="email">
                <Field
                  name="email"
                  component={TextField}
                  label="Email"
                  fullWidth
                />
              </div>
              <div className="password">
                <Field
                  name="password"
                  type="password"
                  component={TextField}
                  label={this.props.t('Password')}
                  fullWidth
                  errorText={this.props.errorLogin ? this.props.t(errorTextLoginFailed) : null}
                />
              </div>
              <div className="remember-me">
                <div className="pull-left">
                  <Field
                    name="rememberMe"
                    component={Checkbox}
                    label={this.props.t('Remember me')}
                  />
                </div>
                <div className="pull-right forgot-password">{this.props.t('Forgot Password')}?</div>
                <div className="clearfix" />
              </div>
              <div className="button-sign-in">
                {
                  this.props.requesting ? <CircularProgress /> : (
                    <FlatButton
                      type="submit"
                      fullWidth
                      style={{
                        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)'
                      }}
                      labelStyle={{
                        color: "#fff",
                        fontWeight: 'bold',
                        fontSize: '14px',
                        letterSpacing: '0px',
                        textTransform: 'uppercase'
                      }}
                      label={this.props.t('SIGN IN')}
                      icon={this.props.requesting ? <CircularProgress size={20} /> : null}
                      backgroundColor="#009688"
                      onClick={this.onClickSignIn}
                    />
                  )
                }
              </div>
            </div>
          </div>
          <div className="ecash-login-bottom-control">
            <div className="text-note">{this.props.t('Display language')}</div>
            {this.renderOptionLanguages()}
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.loginReducer.get('language'),
  requesting: state.loginReducer.get('requesting'),
  data: state.loginReducer.get('data'),
  errorLogin: state.loginReducer.get('errorLogin'),
  values: getFormValues('loginForm')(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default reduxForm({
  form: 'loginForm',
  validate,
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate('translations')(Login))));

export const reducers = {
  loginReducer,
};
