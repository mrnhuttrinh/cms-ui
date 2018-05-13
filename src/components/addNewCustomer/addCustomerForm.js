import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Field, reduxForm, getFormValues, getFormSyncErrors} from 'redux-form';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import { GridList } from 'material-ui/GridList';
import { dateFormatter, dateTimeFormatter } from '../../utils';

import { Row, Col } from 'react-flexbox-grid';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
  marginTop: 20,
}

class AddCustomerForm  extends React.Component  {

  renderCard() {
    let  address = {};
    if (this.props.addresses && this.props.addresses._embedded.addresses.length) {
      address = _.filter(this.props.addresses._embedded.addresses, (address) =>
        (address.addressType.typeCode === 'RESIDENT'))[0] || this.props.addresses._embedded.addresses[0] || {};
    }

    let  indetifyCard = {};
    if (this.props.identifyDocuments && this.props.identifyDocuments._embedded.identifyDocuments.length) {
      indetifyCard = _.filter(this.props.identifyDocuments._embedded.identifyDocuments, (identifyDocument) =>
        (identifyDocument.identifyDocumentType.typeCode === 'IDENTIFY_CARD'))[0] || {};
    }

    let  passportCard = {};
    if (this.props.identifyDocuments && this.props.identifyDocuments._embedded.identifyDocuments.length) {
      passportCard = _.filter(this.props.identifyDocuments._embedded.identifyDocuments, (identifyDocument) =>
        (identifyDocument.identifyDocumentType.typeCode === 'PASSPORT_CARD'))[0] || {};
    }

    return (
      <Row className="customer-detail">
        <Col xs={12} sm={12} md={12} >
          <Row>
            <Col xs={12} sm={12} md={6} >
              <GridList
                cols={3}
                padding={5}
                cellHeight={56}
              >
                <Subheader style={titleStyle}>{this.props.t('Personal information')}</Subheader>
                <TextField
                  floatingLabelText={this.props.t('Last name')}
                  cols={2}
                  value={this.props.customer.lastName}
                  floatingLabelFixed
                  readOnly
                  fullWidth
                />
                <TextField
                  cols={1}
                  floatingLabelText={this.props.t('First name')}
                  value={this.props.customer.firstName}
                  floatingLabelFixed
                  readOnly
                  fullWidth
                />
                <TextField
                  cols={1}
                  floatingLabelText={this.props.t('Birthday')}
                  value={dateFormatter(this.props.customer.dateOfBirth)}
                  floatingLabelFixed
                  readOnly
                  fullWidth
                />
                <TextField
                  cols={1}
                  floatingLabelText={this.props.t('Gender')}
                  value={this.props.t(`GENDER.${this.props.customer.gender}`)}
                  floatingLabelFixed
                  readOnly
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Country')}
                  value={this.props.t(`${this.props.customer.countryCode}`.toUpperCase())}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Occupation')}
                  value={this.props.customer.occupation}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Position')}
                  value={this.props.customer.position}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Title')}
                  value={this.props.customer.title}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Email')}
                  value={this.props.customer.email}
                  floatingLabelFixed
                  readOnly
                  cols={3}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Phone1')}
                  value={this.props.customer.phone1}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Phone2')}
                  value={this.props.customer.phone2}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
              </GridList>
            </Col>
            <Col xs={12} sm={12} md={6} >
              <GridList
                cols={3}
                padding={5}
                cellHeight={56}
              >
                <Subheader style={titleStyle} cols={1}>{this.props.t('Address')}</Subheader>
                <TextField
                  floatingLabelText={this.props.t('Line')}
                  value={address.line1}
                  floatingLabelFixed
                  readOnly
                  cols={3}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('State Province')}
                  value={address.stateProvince}
                  floatingLabelFixed
                  readOnly
                  cols={3}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('City')}
                  value={address.city}
                  floatingLabelFixed
                  readOnly
                  cols={3}
                  fullWidth
                />
            </GridList>
            </Col>
            <Col xs={12} sm={12} md={6} >
              <GridList
                cols={3}
                padding={5}
                cellHeight={56}
              >
                <Subheader
                  cols={2}
                  style={titleStyle}>
                  {this.props.t('Indetity card')}
                </Subheader>
                <TextField
                  floatingLabelText={this.props.t('Number')}
                  value={indetifyCard.number}
                  floatingLabelFixed
                  readOnly
                  cols={2}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Date of issue')}
                  value={dateFormatter(indetifyCard.dateOfIssue)}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Date of expiry')}
                  value={dateFormatter(indetifyCard.dateOfExpiry)}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Place of issue')}
                  value={indetifyCard.placeOfIssue}
                  floatingLabelFixed
                  readOnly
                  cols={2}
                  fullWidth
                />
              </GridList>
            </Col>
            <Col xs={12} sm={12} md={6} >
              <GridList
                cols={3}
                padding={5}
                cellHeight={56}
              >
                <Subheader
                  cols={2}
                  style={titleStyle}>
                  {this.props.t('Passport card')}
                </Subheader>
                <TextField
                  floatingLabelText={this.props.t('Number')}
                  value={passportCard.number}
                  floatingLabelFixed
                  readOnly
                  cols={2}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Date of issue')}
                  value={dateFormatter(passportCard.dateOfIssue)}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Date of expiry')}
                  value={dateFormatter(passportCard.dateOfExpiry)}
                  floatingLabelFixed
                  readOnly
                  cols={1}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Place of issue')}
                  value={passportCard.placeOfIssue}
                  floatingLabelFixed
                  readOnly
                  cols={2}
                  fullWidth
                />
              </GridList>
            </Col>
         </Row>
        </Col>
      </Row>
    )
  }
  render () {
    return this.props.customer ? this.renderCard() : null;
  }
}

AddCustomerForm.defaultProps = {
  customer: null,
}


export default translate('translations')(AddCustomerForm);