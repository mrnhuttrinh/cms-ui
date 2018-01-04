import React from 'react';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import { CardText } from 'material-ui/Card';
import { GridList } from 'material-ui/GridList';
import { translate } from 'react-i18next';
import { dateFormatter, dateTimeFormatter } from '../../utils';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class CustomerDetails  extends React.Component  {

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
      <GridList
        cols={2}
        cellHeight="auto"
        style={{padding:'20px 100px 20px 100px'}}
      >
        <CardText>
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
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              cols={1}
              floatingLabelText={this.props.t('First name')}
              value={this.props.customer.firstName}
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              cols={1}
              floatingLabelText={this.props.t('Birthday')}
              value={dateFormatter(this.props.customer.dateOfBirth)}
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              cols={1}
              floatingLabelText={this.props.t('Gender')}
              value={this.props.t(`GENDER.${this.props.customer.gender}`)}
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Country')}
              value={this.props.t(`${this.props.customer.countryCode}`.toUpperCase())}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Occupation')}
              value={this.props.customer.occupation}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Position')}
              value={this.props.customer.position}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Title')}
              value={this.props.customer.title}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Email')}
              value={this.props.customer.email}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Phone1')}
              value={this.props.customer.phone1}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Phone2')}
              value={this.props.customer.phone2}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <Subheader style={titleStyle} cols={1}>{this.props.t('Address')}</Subheader>
            <TextField
              floatingLabelText={this.props.t('Line')}
              value={address.line1}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('State Province')}
              value={address.stateProvince}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('City')}
              value={address.city}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
          </GridList>
        </CardText>
        <CardText>
          <GridList
            cols={2}
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
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Date of issue')}
              value={dateFormatter(indetifyCard.dateOfIssue)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Date of expiry')}
              value={dateFormatter(indetifyCard.dateOfExpiry)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Place of issue')}
              value={indetifyCard.placeOfIssue}
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <Subheader
              cols={2}
              style={titleStyle}>
              {this.props.t('Passport card')}
            </Subheader>
            <TextField
              floatingLabelText={this.props.t('Number')}
              value={passportCard.number}
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Date of issue')}
              value={dateFormatter(passportCard.dateOfIssue)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Date of expiry')}
              value={dateFormatter(passportCard.dateOfExpiry)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Place of issue')}
              value={passportCard.placeOfIssue}
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <Subheader
              cols={2}
              style={titleStyle}>
              {this.props.t('Customer status')}
            </Subheader>
            <TextField
              floatingLabelText={this.props.t('Status')}
              value={this.props.t(this.props.customer.status)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Updated at')}
              value={dateTimeFormatter(this.props.customer.updatedAt)}
              cols={1}
              fullWidth
            />
          </GridList>
        </CardText>
      </GridList>)
  }
  render () {
    return this.props.customer ? this.renderCard() : null;
  }
}

CustomerDetails.defaultProps = {
  customer: null,
}


export default translate('translations')(CustomerDetails);
