import React from 'react';
import {Field } from 'redux-form';
import Subheader from 'material-ui/Subheader';
import { translate } from 'react-i18next';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import {
  TextField,
  FieldValidator,
  DatePicker,
  SelectField
} from '../commons';

import { COUNTRIES, GENDER, CUSTOMER_TYPES } from '../../constants';

import { Row, Col } from 'react-flexbox-grid';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '20px',
  color: '#00897b',
  marginTop: 20,
}

class CustomerInformation extends React.PureComponent {
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
  render() {
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
      </div>
    );
  }
}

export default translate('translations')(CustomerInformation);