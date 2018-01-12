import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import {
  TextField,
} from '../commons';

const validate = (values, props) => {
  const errors = {};
  if (_.isEmpty(values.roleName)) {
    errors.roleName = 'Role name not empty';
  }
  if (values.roleName) {
    const {
      roleList: {
        _embedded: {
          roles
        },
      },
    } = props;
    const roleExistence = _.find(roles, role => _.upperCase(role.name) === _.upperCase(_.trim(values.roleName)));
    if (!_.isEmpty(roleExistence)) {
      errors.roleName = 'Role name is exists';
    }
  }
  return errors;
}

class RoleForm extends React.Component {
  render () {
    return (
      <Row>
        <Col md={12} ms={12}>
          <Field
            name="roleName"
            type="text"
            component={TextField}
            label={this.props.t('Role name')}
            fullWidth
          />
        </Col>
      </Row>
    );
  }
}

RoleForm.propTypes = {
  roleList: PropTypes.object,
};

RoleForm.defaultProps = {
  roleList: {
    _embedded: {
      roles: [],
    },
  },
}

const mapStateToProps = (state) => {
  return {
    roleList: state.RoleListReducer.get('data'),
  };
};


export default connect(
  mapStateToProps
)(reduxForm({
  form: 'addNewRole',
  validate,
})(translate('translations')(RoleForm)));
