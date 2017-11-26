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
const formatText = (value) => (value || ' ');

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
            value={formatText(this.props.customer.lastName)}
          />
          <TextField
            floatingLabelText="Tên"
            value={formatText(this.props.customer.firstName)}
          /><br/>
          <TextField
            floatingLabelText="Ngày sinh"
            value={formatDate(this.props.customer.dateOfBirth)}
          />
          <TextField
            floatingLabelText="Giới tính"
            value={formatText(GENDER[this.props.customer.gender])}
          />
          <TextField
            floatingLabelText="Quốc tịch"
            value={formatText(this.props.customer.countryCode)}
          /><br />
          <TextField
            floatingLabelText="Nhóm"
            value={formatText(this.props.customer.occupation)}
          />
          <TextField
            floatingLabelText="Khoa | Phòng ban"
            value={formatText(this.props.customer.position)}
          />
          <TextField
            floatingLabelText="Chức vụ"
            value={this.props.customer.title}
            hintText=" "
          /><br />
          <TextField
            floatingLabelText="Email"
            value={formatText(this.props.customer.email)}
          /><br />
          <TextField
            floatingLabelText="SDT di động"
            value={formatText(this.props.customer.phone1)}
          />
          <TextField
            floatingLabelText="SDT khac"
            value={formatText(this.props.customer.phone2)}
          />
          <Subheader style={titleStyle}>Địa chỉ thường trú</Subheader>
          <TextField
            floatingLabelText="Địa chỉ"
            value={formatText(address.line1)}
          /><br />
          <TextField
            floatingLabelText="Phường (xã). Quận (Huyện)"
            value={formatText(address.stateProvince)}
          /><br/>
          <TextField
            floatingLabelText="Tỉnh, Thành Phố"
            value={formatText(address.city)}
          />
        </CardText>
        <CardText>
          <Subheader style={titleStyle}>Giấy tờ tùy thân - CMND</Subheader>
          <TextField
            floatingLabelText="Mã số"
            value={formatText(indetifyCard.number)}
          /><br />
          <TextField
            floatingLabelText="Ngày cấp"
            value={formatDate(indetifyCard.dateOfIssue)}
          />
          <TextField
            floatingLabelText="ngày hết hạn"
            value={formatDate(indetifyCard.dateOfExpiry)}
          /><br/>
          <TextField
            floatingLabelText="Nơi cấp"
            value={formatText(indetifyCard.placeOfIssue)}
          />
          <Subheader style={titleStyle}>Giấy tờ tùy thân - PASSPORT</Subheader>
          <TextField
            floatingLabelText="Mã số"
            value={formatText(passportCard.number)}
          /><br />
          <TextField
            floatingLabelText="Ngày cấp"
            value={formatDate(passportCard.dateOfIssue)}
          />
          <TextField
            floatingLabelText="ngày hết hạn"
            value={formatDate(passportCard.dateOfExpiry)}
          /><br/>
          <TextField
            floatingLabelText="Nơi cấp"
            value={formatText(passportCard.placeOfIssue)}
          />
          <Subheader style={titleStyle}>Thông tin tài khoản</Subheader>
          <TextField
            floatingLabelText="Trạng thái"
            value={formatText(STATUS[this.props.customer.status])}
          /><br />
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