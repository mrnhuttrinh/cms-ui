import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import {
  TextField,
  SelectField,
} from '../../commons';

const DetailsList = {
  'DEBIT': 'Debit',
  'DEFAULT': 'Default',
  'OTHER': 'Other',
};


const validate = values => {
  const errors = {};
  if (_.isEmpty(values.email)) {
    errors.email = 'Email not empty';
  }
  if (_.isEmpty(values.firstName)) {
    errors.firstName = 'First name not empty';
  }
  if (_.isEmpty(values.lastName)) {
    errors.lastName = 'Last name not empty';
  }
  if (_.isEmpty(values.username)) {
    errors.username = 'Username not empty';
  }
  if (_.isEmpty(values.role)) {
    errors.role = 'Role not empty';
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'Password must be more than 6 characters';
  }
  if (_.isEmpty(values.password)) {
    errors.password = 'Password not empty';
  }
  if (_.isEmpty(values.status)) {
    errors.status = 'Status not empty';
  }
  return errors;
}

class UserForm extends React.Component {
  render () {
    // const {
    //   roleList: {
    //     _embedded: {
    //       roles
    //     },
    //   },
    //   initialValues,
    // } = this.props;
    // const items = _.map(roles, role => {
    //   const disabled = role.name === ROLES.USER;
    //   return (<MenuItem disabled={disabled} value={role.id} primaryText={this.props.t(role.name)} />);
    // });
    const itemsStatus = _.map(DetailsList, (key, value) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    // let disabledRole = false;
    // if (!_.isEmpty(initialValues)) {
    //   disabledRole = !_.isEmpty(_.find(roles, role => initialValues.role === role.id && role.name === ROLES.USER));
    // }
    return (
      [
        (<Row>
          <Col md={7} xs={12}>
            <Field
              name="amount"
              type="number"
              component={TextField}
              label={this.props.t('Amount')}
              fullWidth
            />
          </Col>
        </Row>),
        (<Row>
          <Col md={5} xs={12}>
            <Field
              name="sender"
              type="text"
              component={TextField}
              label={this.props.t('Sender')}
              fullWidth
            />
          </Col>
          <Col md={6} xs={12}>
            <Field
              name="detail"
              component={SelectField}
              label={this.props.t('detail')}
              children={itemsStatus}
              fullWidth
            />
          </Col>
          <Col md={7} xs={12}>
            <Field
              name="detailOther"
              type="text"
              component={TextField}
              label={this.props.t('Others')}
              fullWidth
            />
          </Col>
        </Row>
        )
      ]
    );
  }
}

UserForm.propTypes = {};

UserForm.defaultProps = {};

const mapStateToProps = (state) => {};

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'depositToAccount',
  validate,
})(translate('translations')(UserForm)));
