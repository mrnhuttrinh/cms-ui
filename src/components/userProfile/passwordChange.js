import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import {Field, reduxForm, getFormValues, getFormSyncErrors} from 'redux-form';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import { translate } from 'react-i18next';

import { TextField } from '../commons';
import { AnimationGroup } from '../commons';

import * as actions from './actions';

const validate = values => {
  const errors = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  };
  if (!_.isEmpty(values.newPassword) && values.newPassword.length < 6) {
    errors.newPassword = 'Password must be more than 6 characters';
  }
  if (!_.isEmpty(values.confirmNewPassword) && values.confirmNewPassword.length < 6) {
    errors.confirmNewPassword = 'Password must be more than 6 characters';
  } else if (!_.isEmpty(values.confirmNewPassword) && values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Passwords do not match';
  }
  return errors;
}

class PasswordChange extends React.Component  {
  constructor(props) {
    super(props);
    this.onPushPasswordChange = this.onPushPasswordChange.bind(this);
  }
  onPushPasswordChange() {
    const { values = {}, userData } = this.props;
    const params = {
      ...values,
      id: userData.user.id,
    }
    this.props.actions.pushPasswordChange(params);
    this.props.reset();
  }
  getDisableChangePasswordButton() {
    const { errors = {}, values = {} } = this.props;
    if (_.isEmpty(values.oldPassword) || _.isEmpty(values.newPassword) || _.isEmpty(values.confirmNewPassword)) {
      return true;
    }
    if (!_.isEmpty(errors.confirmNewPassword)) {
      return true;
    }
    return false;
  }
  render () {
    const { errors = {} } = this.props;
    return (
      <Row className="rowContainerChangePassword">
        <Col md={12} className="change-password">
          <Row>
            <Col md={12} xs={12}>
              <Field
                name="oldPassword"
                type="password"
                component={TextField}
                label={this.props.t('Old password')}
                fullWidth
                errorText={this.props.t(errors.oldPassword)}
              />
            </Col>
            <Col md={12} xs={12}>
              <Field
                name="newPassword"
                type="password"
                component={TextField}
                label={this.props.t('New password')}
                fullWidth
                errorText={this.props.t(errors.newPassword)}
              />
            </Col>
            <Col md={12} xs={12}>
              <Field
                name="confirmNewPassword"
                type="password"
                component={TextField}
                label={this.props.t('Confirm new password')}
                fullWidth
                errorText={this.props.t(errors.confirmNewPassword)}
              />
            </Col>
          </Row>
        </Col>
        <div className="groupControl">
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginLeft: 15
            }}
            backgroundColor="#009688"
            labelStyle={{color: '#fff'}}
            label={this.props.t('change password')}
            disabled={this.getDisableChangePasswordButton()}
            onClick={this.onPushPasswordChange}
          />
        </div>
        <AnimationGroup
          loading={this.props.requesting}
        />
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const updatePassword = state.UserProfileReducers.get('updatePassword');
  return {
    requesting: updatePassword.get('requesting'),
    data: updatePassword.get('data'),
    error: updatePassword.get('error'),
    values: getFormValues('passwordChange')(state),
    errors: getFormSyncErrors('passwordChange')(state),
    userData: state.loginReducer.get('data'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default reduxForm({
  form: 'passwordChange',
  validate,
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate('translations')(PasswordChange))));
