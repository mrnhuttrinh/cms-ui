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
import { ENUM_USER_STATUS } from '../../constants';

const validate = values => {
  const errors = {};
  // if (
  //   values.email && !PATTERN_EMAIL.test(values.email)
  // ) {
  //   errors.email = 'Invalid email address';
  // }
  return errors;
}

class UserInformation extends React.Component  {
  render () {
    const {
      roleList: {
        _embedded: {
          roles
        },
      },
    } = this.props;
    const items = _.map(roles, role => (<MenuItem value={role.id} primaryText={this.props.t(role.name)} />));
    const itemsStatus = _.map(ENUM_USER_STATUS, (key, value) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return (
      <Row>
        <Col md={7} ms={12}>
          <Field
            name="lastName"
            type="text"
            component={TextField}
            label={this.props.t('Last name')}
            fullWidth
          />
        </Col>
        <Col md={5} ms={12}>
          <Field
            name="firstName"
            type="text"
            component={TextField}
            label={this.props.t('First name')}
            fullWidth
          />
        </Col>
        <Col md={7} ms={12}>
          <Field
            name="email"
            type="text"
            component={TextField}
            label={this.props.t('Email')}
            fullWidth
          />
        </Col>
        <Col md={5} ms={12}>
          <Field
            name="username"
            type="text"
            component={TextField}
            label={this.props.t('User name')}
            fullWidth
          />
        </Col>
        <Col md={12} ms={12}>
          <Field
            name="role"
            component={SelectField}
            label={this.props.t('Role')}
            children={items}
          />
        </Col>
        <Col md={6} ms={12}>
          <Field
            name="status"
            component={SelectField}
            label={this.props.t('Status')}
            children={itemsStatus}
          />
        </Col>
        <Col md={6} ms={12}>
          <Field
            name="lastLogin"
            type="text"
            component={TextField}
            label={this.props.t('Last login')}
            floatingLabelStyle={{whiteSpace: 'nowrap'}}
            fullWidth
            disabled
          />
        </Col>
      </Row>
    );
  }
}

UserInformation.propTypes = {
  roleList: PropTypes.object,
};

UserInformation.defaultProps = {
  roleList: {
    _embedded: {
      roles: [],
    },
  },
};

const mapStateToProps = (state) => {
  const userDetail = state.PrivilegeDetailReducer.get('userDetail');
  const roleList = state.PrivilegeDetailReducer.get('roleList');
  const userData = userDetail.get('data');
  if (userData) {
    userData.status = userData.enabled ? ENUM_USER_STATUS.ACTIVE : ENUM_USER_STATUS.DEACTIVE;
    const firstRole = userData.roles[0];
    if (!_.isEmpty(firstRole)) {
      userData.role = firstRole.id;
    }
  }
  return {
    initialValues: userData,
    roleList: roleList.get('data'),
  };
};


export default connect(
  mapStateToProps
)(reduxForm({
  form: 'userInformation',
  validate,
})(translate('translations')(UserInformation)));
