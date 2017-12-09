import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import {Field, reduxForm, getFormValues, getFormSyncErrors} from 'redux-form';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import { TextField } from '../commons';
import { AnimationGroup } from '../commons';

import {
  rowContainerChangePassword,
  groupControl,
  passwordChange,
} from './styles';

import * as actions from './actions';

const validate = values => {
  const errors = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  };
  if (!_.isEmpty(values.newPassword) && values.newPassword.length < 6) {
    errors.newPassword = 'Mật khẩu phải nhiều hơn 6 ký tự';
  }
  if (!_.isEmpty(values.confirmNewPassword) && values.confirmNewPassword.length < 6) {
    errors.confirmNewPassword = 'Mật khẩu phải nhiều hơn 6 ký tự';
  } else if (!_.isEmpty(values.confirmNewPassword) && values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Mật khẩu không trùng khớp';
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
      <Row style={rowContainerChangePassword}>
        <Col md={12} style={passwordChange}>
          <Row>
            <Col md={12} ms={12}>
              <Field
                name="oldPassword"
                type="password"
                component={TextField}
                label="Mật khẩu cũ"
                fullWidth
                errorText={errors.oldPassword}
              />
            </Col>
            <Col md={12} ms={12}>
              <Field
                name="newPassword"
                type="password"
                component={TextField}
                label="Mật khẩu mới"
                fullWidth
                errorText={errors.newPassword}
              />
            </Col>
            <Col md={12} ms={12}>
              <Field
                name="confirmNewPassword"
                type="password"
                component={TextField}
                label="Xác nhận mật khẩu mới"
                fullWidth
                errorText={errors.confirmNewPassword}
              />
            </Col>
          </Row>
        </Col>
        <div style={groupControl}>
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginLeft: 15
            }}
            backgroundColor="#009688"
            labelStyle={{color: '#fff'}}
            label="ĐỔI MẬT KHẨU"
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
)(withRouter(PasswordChange)));
