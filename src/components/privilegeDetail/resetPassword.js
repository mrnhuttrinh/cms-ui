import React from 'react';
import { translate } from 'react-i18next';
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
    errors.newPassword = 'Password must be more than 6 characters';
  }
  if (!_.isEmpty(values.confirmNewPassword) && values.confirmNewPassword.length < 6) {
    errors.confirmNewPassword = 'Password must be more than 6 characters';
  } else if (!_.isEmpty(values.confirmNewPassword) && values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Passwords do not match';
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
        label={this.props.t('CANCEL')}
        primary={true}
        onClick={this.props.onClickCloseDialog}
      />,
      <FlatButton
        label={this.props.t('RESET')}
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
          title={this.props.t('Reset Password')}
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
                label={this.props.t('New password')}
                fullWidth
                errorText={this.props.t(errors.newPassword)}
              />
            </Col>
            <Col md={12} ms={12}>
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
)(translate('translations')(ResetPassword)));
