import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Field, reduxForm, getFormValues, getFormSyncErrors} from 'redux-form';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import { TextField } from '../commons';

import * as actions from './actions';

const validate = values => {
  const errors = {
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


class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.onPushResetPasswordChange = this.onPushResetPasswordChange.bind(this);
  }
  onPushResetPasswordChange() {
    const { values = {}, userData } = this.props;
    const params = {
      ...values,
      id: userData.id,
    }
    this.props.actions.pushResetPassword(params).then(() => {
      const { error } = this.props;
      if (!error) {
        this.props.actions.getUserHistories(userData.id);
        this.props.onClickCloseDialog();
      }
    });
    this.props.reset();
  }
  getDisableChangePasswordButton() {
    const { errors = {}, values = {} } = this.props;
    if (_.isEmpty(values.newPassword) || _.isEmpty(values.confirmNewPassword)) {
      return true;
    }
    if (!_.isEmpty(errors.confirmNewPassword)) {
      return true;
    }
    return false;
  }
  render() {
    const actions = [
      <FlatButton
        label="Hủy"
        primary={true}
        onClick={this.props.onClickCloseDialog}
      />,
      <FlatButton
        label="Reset"
        primary={true}
        backgroundColor="#9F6000"
        labelStyle={{color: '#fff'}}
        disabled={this.getDisableChangePasswordButton()}
        onClick={this.onPushResetPasswordChange}
      />,
    ];

    const { errors = {} } = this.props;
    return (
      <div>
        <Dialog
          title="Reset Mật Khẩu"
          actions={actions}
          modal={true}
          open={this.props.openDialog}
        >
          <Row>
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
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userDetail = state.PrivilegeDetailReducer.get('userDetail');
  const resetPassword = state.PrivilegeDetailReducer.get('resetPassword');
  return {
    userData: userDetail.get('data'),
    requesting: resetPassword.get('requesting'),
    data: resetPassword.get('data'),
    error: resetPassword.get('error'),
    values: getFormValues('resetPassword')(state),
    errors: getFormSyncErrors('resetPassword')(state),
  };
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default reduxForm({
  form: 'resetPassword',
  validate,
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword));
