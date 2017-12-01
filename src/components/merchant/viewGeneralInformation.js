import React from 'react';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import {
  CardTitle,
} from 'material-ui/Card';

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 0,
  marginRight: 0
};
const titleStyle = {
  fontSize: '16px',
  color: '#00897b',
  paddingLeft: 0,
}

export default class GeneralInformation extends React.Component {
  render() {
    return (
      <Row style={rowContainer}>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <CardTitle style={titleStyle}>
                Thông tin đại lý
              </CardTitle>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextField
                floatingLabelText="Tên Gọi"
                floatingLabelFixed
                fullWidth
                value="S-Canteen Khu A"
              />
            </Col>
            <Col md={6}>
              <TextField
                floatingLabelText="SĐT"
                floatingLabelFixed
                fullWidth
                value="08-62728206"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                floatingLabelText="Email"
                floatingLabelFixed
                fullWidth
                value="vmnam@yopmail.com"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextField
                floatingLabelText="Trạng Thái"
                floatingLabelFixed
                fullWidth
                value="ĐANG HOẠT ĐỘNG"
              />
            </Col>
            <Col md={6}>
              <TextField
                floatingLabelText="THời gian cập nhật gần nhất"
                floatingLabelFixed
                fullWidth
                value="07:30:55 5/11/2017"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CardTitle style={titleStyle}>
                Địa Chỉ
              </CardTitle>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                floatingLabelText="Số nhà, đường"
                floatingLabelFixed
                fullWidth
                value="368 Đường Số 7"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                floatingLabelText="Phường (Xã), Quận (Huyện)"
                floatingLabelFixed
                fullWidth
                value="Phường 8, quận Phú Nhuận"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                floatingLabelText="Tỉnh, Thành Phố"
                floatingLabelFixed
                fullWidth
                value="TP Hồ Chí Minh"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}