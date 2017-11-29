import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

import {
  Card,
  CardText
} from 'material-ui/Card';

import { GridList } from 'material-ui/GridList';

import { GENDER, STATUS, COUNTRY } from './constants';

const style = {
  width: '100%',
  display: 'inline-block',
  padding: '14px 24px 24px',
  margin: '0px',
};

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

const formatDate = (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A');

class CustomerDetails  extends React.Component  {

  renderCard() {
    const  address = _.filter(this.props.customer.addresses, (address) =>
      (address.addressType.typeCode === 'RESIDENT'))[0] || this.props.customer.addresses[0] || {};

    const  indetifyCard = _.filter(this.props.customer.identifyDocuments, (identifyDocument) =>
      (identifyDocument.identifyDocumentType.typeCode === 'IDENTIFY_CARD'))[0] || {};

    const  passportCard = _.filter(this.props.customer.identifyDocuments, (identifyDocument) =>
        (identifyDocument.identifyDocumentType.typeCode === 'PASSPORT_CARD'))[0] || {};

    return (<Card>
      <GridList
        cols={2}
        cellHeight="auto"
      >
        <CardText>
          <GridList
            cols={3}
            padding={5}
            cellHeight={56}
          >
            <Subheader style={titleStyle}>Thông tin cá nhân</Subheader>
            <TextField
              floatingLabelText="Họ"
              cols={2}
              value={this.props.customer.lastName}
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              cols={1}
              floatingLabelText="Tên"
              value={this.props.customer.firstName}
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              cols={1}
              floatingLabelText="Ngày sinh"
              value={formatDate(this.props.customer.dateOfBirth)}
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              cols={1}
              floatingLabelText="Giới tính"
              value={GENDER[this.props.customer.gender]}
              floatingLabelFixed={true}
              fullWidth
            />
            <TextField
              floatingLabelText="Quốc tịch"
              value={this.props.customer.countryCode && COUNTRY[this.props.customer.countryCode] ? COUNTRY[this.props.customer.countryCode] : ''}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="Nhóm"
              value={this.props.customer.occupation}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="Khoa | Phòng ban"
              value={this.props.customer.position}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="Chức vụ"
              value={this.props.customer.title}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="Email"
              value={this.props.customer.email}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText="SDT di động"
              value={this.props.customer.phone1}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="SDT khác"
              value={this.props.customer.phone2}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <Subheader style={titleStyle} cols={1}>Địa chỉ thường trú</Subheader>
            <TextField
              floatingLabelText="Địa chỉ"
              value={address.line1}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText="Phường (xã). Quận (Huyện)"
              value={address.stateProvince}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText="Tỉnh, Thành Phố"
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
              Giấy tờ tùy thân - CMND
            </Subheader>
            <TextField
              floatingLabelText="Mã số"
              value={indetifyCard.number}
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <TextField
              floatingLabelText="Ngày cấp"
              value={formatDate(indetifyCard.dateOfIssue)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="ngày hết hạn"
              value={formatDate(indetifyCard.dateOfExpiry)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="Nơi cấp"
              value={indetifyCard.placeOfIssue}
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <Subheader
              cols={2}
              style={titleStyle}>
              Giấy tờ tùy thân - PASSPORT
            </Subheader>
            <TextField
              floatingLabelText="Mã số"
              value={passportCard.number}
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <TextField
              floatingLabelText="Ngày cấp"
              value={passportCard.dateOfIssue}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="ngày hết hạn"
              value={formatDate(passportCard.dateOfExpiry)}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="Nơi cấp"
              value={passportCard.placeOfIssue}
              floatingLabelFixed={true}
              cols={2}
              fullWidth
            />
            <Subheader
              cols={2}
              style={titleStyle}>
              Thông tin tài khoản
            </Subheader>
            <TextField
              floatingLabelText="Trạng thái"
              value={STATUS[this.props.customer.status]}
              floatingLabelFixed={true}
              cols={1}
              fullWidth
            />
            <TextField
              floatingLabelText="Thời gian cập nhật gần nhất"
              value={formatDate(this.props.customer.updatedAt)}
              cols={1}
              fullWidth
            />
          </GridList>
        </CardText>
      </GridList>
    </Card>)
  }
  render () {
    return (
      <Paper style={style} zDepth={1} rounded={false}>
        {this.props.customer ? this.renderCard() : null}
      </Paper>);
  }
}

CustomerDetails.defaultProps = {
  customer: null,
}


export default CustomerDetails;
