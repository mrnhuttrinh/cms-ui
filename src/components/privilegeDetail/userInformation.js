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

import { dateTimeFormatter } from '../../utils';

class UserInformation extends React.Component {
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
        <Col md={5} xs={12}>
          <Field
            name="username"
            type="text"
            component={TextField}
            label={this.props.t('User name')}
            disabled
            fullWidth
            validate={[FieldValidator.required, FieldValidator.alphaNumeric]}
          />
        </Col>
        <Col md={12} xs={12}>
          <Field
            name="role"
            component={SelectField}
            label={this.props.t('Role')}
            children={items}
            disabled={disabledRole}
            multiple
            validate={FieldValidator.listRequired}
          />
        </Col>
        <Col md={6} xs={12}>
          <Field
            name="status"
            component={SelectField}
            label={this.props.t('Status')}
            children={itemsStatus}
            disabled
          />
        </Col>
        <Col md={6} xs={12}>
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
  let initialValues = null;
  if (userData) {
    initialValues =  {
      ...userData,
      lastLogin: dateTimeFormatter(_.get(userData, 'lastLogin')),
    };
    userData.status = userData.enabled ? ENUM_USER_STATUS.ACTIVE : ENUM_USER_STATUS.DEACTIVE;
    userData.role = _.map(userData.roles, (r) => r.id);
    initialValues =  {
      ...userData,
      lastLogin: dateTimeFormatter(_.get(userData, 'lastLogin')),
    };
  }
  return {
    initialValues,
    roleList: roleList.get('data'),
  };
};


export default connect(
  mapStateToProps
)(reduxForm({
  form: 'userInformation',
})(translate('translations')(UserInformation)));
