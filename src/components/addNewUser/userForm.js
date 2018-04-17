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
} from '../commons';
import { ENUM_USER_STATUS, ROLES, PATTERN_EMAIL } from '../../constants';

const validate = values => {
  const errors = {};
  if (values.email && !PATTERN_EMAIL.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (_.isEmpty(values.email)) {
    errors.email = 'Required';
  }
  if (_.isEmpty(values.firstName)) {
    errors.firstName = 'Required';
  }
  if (_.isEmpty(values.lastName)) {
    errors.lastName = 'Required';
  }
  if (_.isEmpty(values.username)) {
    errors.username = 'Required';
  }
  if (_.isEmpty(values.role)) {
    errors.role = 'Required';
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'Password must be more than 6 characters';
  }
  if (_.isEmpty(values.password)) {
    errors.password = 'Required';
  }
  if (_.isEmpty(values.status)) {
    errors.status = 'Required';
  }
  return errors;
}

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
          />
        </Col>
        <Col md={5} xs={12}>
          <Field
            name="firstName"
            type="text"
            component={TextField}
            label={this.props.t('First name')}
            fullWidth
          />
        </Col>
        <Col md={7} xs={12}>
          <Field
            name="email"
            type="text"
            component={TextField}
            label={this.props.t('Email')}
            fullWidth
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="username"
            type="text"
            component={TextField}
            label={this.props.t('User name')}
            fullWidth
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="password"
            type="password"
            component={TextField}
            label={this.props.t('Password')}
            fullWidth
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
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="status"
            component={SelectField}
            label={this.props.t('Status')}
            children={itemsStatus}
            fullWidth
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
  validate,
})(translate('translations')(UserForm)));
