import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import {
  TextField,
  SelectField,
  FieldValidator,
} from '../commons';
import { ENUM_USER_STATUS, ROLES, PATTERN_EMAIL } from '../../constants';

class UserForm extends React.Component {
  render () {
    const {
      roleList: {
        _embedded: {
          roles
        },
      },
      initialValues,
    } = this.props;
    const items = _.map(roles, role => {
      const disabled = role.name === ROLES.USER;
      return (<MenuItem disabled={disabled} value={role.id} primaryText={this.props.t(role.name)} />);
    });
    const itemsStatus = _.map(ENUM_USER_STATUS, (key, value) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    let disabledRole = false;
    if (!_.isEmpty(initialValues)) {
      disabledRole = !_.isEmpty(_.find(roles, role => initialValues.role === role.id && role.name === ROLES.USER));
    }
    return (
      <Row>
        <Col md={7} xs={12}>
          <Field
            name="lastName"
            type="text"
            component={TextField}
            label={this.props.t('Last name')}
            fullWidth
            validate={FieldValidator.required}
          />
        </Col>
        <Col md={5} xs={12}>
          <Field
            name="firstName"
            type="text"
            component={TextField}
            label={this.props.t('First name')}
            fullWidth
            validate={FieldValidator.required}
          />
        </Col>
        <Col md={7} xs={12}>
          <Field
            name="email"
            type="text"
            component={TextField}
            label={this.props.t('Email')}
            fullWidth
            validate={[FieldValidator.required, FieldValidator.email]}
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="username"
            type="text"
            component={TextField}
            label={this.props.t('User name')}
            fullWidth
            validate={
              [
                FieldValidator.required,
                FieldValidator.pattern(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i, 'Username do not match')
              ]
            }
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="password"
            type="password"
            component={TextField}
            label={this.props.t('Password')}
            fullWidth
            validate={[FieldValidator.required, FieldValidator.length(6, 'Password must be more than 6 characters')]}
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="role"
            component={SelectField}
            label={this.props.t('Role')}
            children={items}
            disabled={disabledRole}
            fullWidth
            validate={FieldValidator.required}
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="status"
            component={SelectField}
            label={this.props.t('Status')}
            children={itemsStatus}
            fullWidth
            validate={FieldValidator.required}
          />
        </Col>
      </Row>
    );
  }
}

UserForm.propTypes = {
  roleList: PropTypes.object,
};

UserForm.defaultProps = {
  roleList: {
    _embedded: {
      roles: [],
    },
  },
}

const mapStateToProps = (state) => {
  const roleList = state.ManagePrivilegeListReducer.get('roleList');
  return {
    roleList: roleList.get('data'),
    initialValues: {
      status: 'ACTIVE',
      role: 'ff8081815fa1bc2a015fa1bc64870003',
    }
  };
};


export default connect(
  mapStateToProps
)(reduxForm({
  form: 'addNewUser',
})(translate('translations')(UserForm)));
