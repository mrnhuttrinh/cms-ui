import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import _ from 'lodash';
import MenuItem from 'material-ui/MenuItem';
import { COUNTRIES, GENDER, CUSTOMER_TYPES } from '../../constants';

import {
  TextField,
  FieldValidator,
  DatePicker,
  SelectField
} from '../commons';

import { Row, Col } from 'react-flexbox-grid';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '20px',
  color: '#00897b',
  marginTop: 20,
}

class AddCustomerForm  extends React.Component {
  getItemCustomerType() {
    const itemsStatus = _.map(CUSTOMER_TYPES, (value, key) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return itemsStatus;
  }
  getItemGender() {
    const itemsStatus = _.map(GENDER, (value, key) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return itemsStatus;
  }
  getItemCountry() {
    const itemsStatus = _.map(COUNTRIES, (value, key) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return itemsStatus;
  }
  renderNewCustomerForm() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <div style={titleStyle}>{this.props.t('Personal information')}</div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.scmsMemberCode"
              floatingLabelText={this.props.t('Code')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Code')}
              validate={[FieldValidator.required]}
            />
          </Col>
          <Col md={6} />
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.lastName"
              floatingLabelText={this.props.t('Last name')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Last name')}
              validate={[FieldValidator.required]}
            />
          </Col>
          <Col md={6}>
            <Field
              name="customer.firstName"
              floatingLabelText={this.props.t('First name')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('First name')}
              validate={[FieldValidator.required]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.email"
              floatingLabelText={this.props.t('Email')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Email')}
              validate={[FieldValidator.email]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.dateOfBirth"
              floatingLabelText={this.props.t('Birthday')}
              floatingLabelFixed
              fullWidth
              component={DatePicker}
              label={this.props.t('Birthday')}
              validate={[FieldValidator.required]}
              autoOk
            />
          </Col>
          <Col md={6}>
            <Field
              name="customer.gender"
              floatingLabelText={this.props.t('Gender')}
              floatingLabelFixed
              fullWidth
              component={SelectField}
              children={this.getItemGender()}
              label={this.props.t('Gender')}
              validate={[FieldValidator.required]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.countryCode"
              floatingLabelText={this.props.t('Country')}
              floatingLabelFixed
              fullWidth
              component={SelectField}
              label={this.props.t('Country')}
              children={this.getItemCountry()}
              validate={[FieldValidator.required]}
            />
          </Col>
          <Col md={6}>
            <Field
              name="customer.occupation"
              floatingLabelText={this.props.t('Occupation')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Occupation')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.position"
              floatingLabelText={this.props.t('Position')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Position')}
            />
          </Col>
          <Col md={6}>
            <Field
              name="customer.title"
              floatingLabelText={this.props.t('Title')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Title')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.phone1"
              floatingLabelText={this.props.t('Phone1')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Phone1')}
              validate={[FieldValidator.required, FieldValidator.alphaNumeric]}
            />
          </Col>
          <Col md={6}>
            <Field
              name="customer.phone2"
              floatingLabelText={this.props.t('Phone2')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Phone2')}
              validate={[FieldValidator.alphaNumeric]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.customerType.typeCode"
              floatingLabelText={this.props.t('Type')}
              floatingLabelFixed
              fullWidth
              component={SelectField}
              label={this.props.t('Type')}
              children={this.getItemCustomerType()}
              validate={[FieldValidator.required]}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div style={titleStyle} cols={1}>{this.props.t('Organization')}</div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Field
              name="organization.shortName"
              floatingLabelText={this.props.t('Organization Name')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Organization Name')}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div style={titleStyle} cols={1}>{this.props.t('Address')}</div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Field
              name="address.line1"
              floatingLabelText={this.props.t('Line')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('Line')}
              validate={[FieldValidator.required]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="address.stateProvince"
              floatingLabelText={this.props.t('State Province')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('State Province')}
              validate={[FieldValidator.required]}
            />
          </Col>
          <Col md={6}>
            <Field
              name="address.city"
              floatingLabelText={this.props.t('City')}
              floatingLabelFixed
              fullWidth
              component={TextField}
              label={this.props.t('City')}
              validate={[FieldValidator.required]}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div
              cols={2}
              style={titleStyle}>
              {this.props.t('Indetity card')}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="indetifyCard.number"
              floatingLabelText={this.props.t('Number')}
              floatingLabelFixed
              cols={4}
              fullWidth
              component={TextField}
              label={this.props.t('Number')}
              validate={[FieldValidator.required, FieldValidator.alphaNumeric]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="indetifyCard.dateOfIssue"
              floatingLabelText={this.props.t('Date of issue')}
              floatingLabelFixed
              cols={2}
              fullWidth
              component={DatePicker}
              label={this.props.t('Date of issue')}
              validate={[FieldValidator.required]}
              autoOk
            />
          </Col>
          <Col md={6}>
            <Field
              name="indetifyCard.dateOfExpiry"
              floatingLabelText={this.props.t('Date of expiry')}
              floatingLabelFixed
              cols={2}
              fullWidth
              component={DatePicker}
              label={this.props.t('Date of expiry')}
              autoOk
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="indetifyCard.placeOfIssue"
              floatingLabelText={this.props.t('Place of issue')}
              floatingLabelFixed
              cols={4}
              fullWidth
              component={TextField}
              label={this.props.t('Place of issue')}
              validate={[FieldValidator.required]}
            />
          </Col>
        </Row>
      </div>
    );
  }
  render () {
    return this.renderNewCustomerForm();
  }
}

const generateNumber = (range) => {
  const randomNumber = Math.floor((Math.random() * range) + 1);
  if (`${randomNumber}`.length < `${range}`.length) {
    return `0${randomNumber}`;
  }
  return randomNumber;
}


AddCustomerForm.defaultProps = {};

const mapStateToProps = (state) => {
  let initialValues = {
    organization: {
      shortName: '',
    },
    customer: {
      scmsMemberCode: `snd-${generateNumber(999)}-${generateNumber(99)}-${generateNumber(9999)}`,
      status: 'ACTIVE',
      countryCode: 'VN',
      customerType: {
        typeCode: CUSTOMER_TYPES.DEFAULT
      },
    },
    address: {
      status: 'ACTIVE',
      addressType: {
        typeCode: 'RESIDENT'
      }
    },
    indetifyCard: {
      status: 'ACTIVE',
      identifyDocumentType: {
        typeCode: 'IDENTIFY_CARD'
      }
    },
  };
  return {
    initialValues,
  };
};

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'addCustomerForm',
})(translate('translations')(AddCustomerForm)));
