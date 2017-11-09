import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import {Field, reduxForm, getFormValues} from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {
  TextField,
  Checkbox,
} from '../commons';
import { PATTERN_EMAIL } from '../../constants';
import * as actions from './actions';

import './styles.scss';

const validate = values => {
  const errors = {};
  // const requiredFields = [
  //   'email',
  //   'password'
  // ];
  // requiredFields.forEach(field => {
  //   if (!values[field]) {
  //     errors[field] = 'Required'
  //   }
  // });
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
  }
  onClickSignIn() {
    const values = this.props.values || {};
    this.props.actions.submitLogin(values.email, values.password);
  }
  render() {
    return (
      <div className="ecash-login">
        <div className="ecash-login-logo">
          <div>
            <img alt="Ecash" src="/assets/images/logo-128x128.png"/>
          </div>
        </div>
        <div className="ecash-login-form">
          <div>
            <p className="title">
              Sign In To Admin
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
                component={TextField}
                label="Password"
                fullWidth
              />
            </div>
            <div className="remember-me">
              <div className="pull-left">
                <Field name="rememberMe" component={Checkbox} label="Remember me" />
              </div>
              <div className="pull-right">Forgot Password ?</div>
              <div className="clearfix" />
            </div>
            <div className="button-sign-in">
              {
                this.props.requesting ? <CircularProgress /> : (
                  <FlatButton
                    style={{borderRadius: '25px'}}
                    labelStyle={{
                      textTransform: 'none',
                      color: "#fff",
                      fontWeight: 'bold'
                    }}
                    label={"Sign In"}
                    icon={this.props.requesting ? <CircularProgress size={20} /> : null}
                    backgroundColor="#9817F4"
                    onClick={this.onClickSignIn}
                  />
                )
              }
            </div>
          </div>
        </div>
        <div className="ecash-login-bottom-control">
          Don't have an account yet?  <span>Sign Up</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requesting: state.loginReducer.get('requesting'),
  data: state.loginReducer.get('data'),
  error: state.loginReducer.get('error'),
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
)(withRouter(Login)));
