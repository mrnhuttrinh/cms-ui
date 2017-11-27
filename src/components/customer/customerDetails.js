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

import { GENDER, STATUS } from './constants';

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
          <Subheader style={titleStyle}>Thông tin cá nhân</Subheader>
          <TextField
            floatingLabelText="Họ"
            value={this.props.customer.lastName}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Tên"
            value={this.props.customer.firstName}
            floatingLabelFixed={true}
          /><br/>
          <TextField
            floatingLabelText="Ngày sinh"
            value={formatDate(this.props.customer.dateOfBirth)}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Giới tính"
            value={GENDER[this.props.customer.gender]}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Quốc tịch"
            value={this.props.customer.countryCode}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="Nhóm"
            value={this.props.customer.occupation}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Khoa | Phòng ban"
            value={this.props.customer.position}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Chức vụ"
            value={this.props.customer.title}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="Email"
            value={this.props.customer.email}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="SDT di động"
            value={this.props.customer.phone1}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="SDT khac"
            value={this.props.customer.phone2}
            floatingLabelFixed={true}
          />
          <Subheader style={titleStyle}>Địa chỉ thường trú</Subheader>
          <TextField
            floatingLabelText="Địa chỉ"
            value={address.line1}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="Phường (xã). Quận (Huyện)"
            value={address.stateProvince}
            floatingLabelFixed={true}
          /><br/>
          <TextField
            floatingLabelText="Tỉnh, Thành Phố"
            value={address.city}
            floatingLabelFixed={true}
          />
        </CardText>
        <CardText>
          <Subheader style={titleStyle}>Giấy tờ tùy thân - CMND</Subheader>
          <TextField
            floatingLabelText="Mã số"
            value={indetifyCard.number}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="Ngày cấp"
            value={formatDate(indetifyCard.dateOfIssue)}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="ngày hết hạn"
            value={formatDate(indetifyCard.dateOfExpiry)}
            floatingLabelFixed={true}
          /><br/>
          <TextField
            floatingLabelText="Nơi cấp"
            value={indetifyCard.placeOfIssue}
            floatingLabelFixed={true}
          />
          <Subheader style={titleStyle}>Giấy tờ tùy thân - PASSPORT</Subheader>
          <TextField
            floatingLabelText="Mã số"
            value={passportCard.number}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="Ngày cấp"
            value={passportCard.dateOfIssue}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="ngày hết hạn"
            value={formatDate(passportCard.dateOfExpiry)}
            floatingLabelFixed={true}
          /><br/>
          <TextField
            floatingLabelText="Nơi cấp"
            value={passportCard.placeOfIssue}
            floatingLabelFixed={true}
          />
          <Subheader style={titleStyle}>Thông tin tài khoản</Subheader>
          <TextField
            floatingLabelText="Trạng thái"
            value={STATUS[this.props.customer.status]}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Thời gian cập nhật gần nhất"
            value={formatDate(this.props.customer.updatedAt)}
          />
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
