import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { dateTimeFormatter } from '../../../utils';

import { MERCHANT_STATUS } from '../constants';

const cardStyle = {
  padding: 10,
  marginBottom: 5,
  marginTop: 5,
};

const titleStyle = {
  fontSize: '16px',
  color: '#00897b',
  paddingLeft: 0,
}


class Application extends React.Component {
  render() {
    const {
      application = {}
    } = this.props;
    return (
      <Card style={cardStyle}>
        <Row>
          <Col md={12}>
            <CardTitle style={titleStyle}>
              {application.name}
            </CardTitle>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <TextField
              floatingLabelText="Mã số"
              floatingLabelFixed
              fullWidth
              value={application.id}
            />
          </Col>
          <Col md={4}>
            <TextField
              floatingLabelText="Loại"
              floatingLabelFixed
              fullWidth
              value="Mặc định"
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TextField
              floatingLabelText="Khóa bảo mật"
              floatingLabelFixed
              fullWidth
              value={application.pubKey}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <TextField
              floatingLabelText="Trạng thái"
              floatingLabelFixed
              fullWidth
              value={MERCHANT_STATUS[application.status]}
            />
          </Col>
          <Col md={4}>
            <TextField
              floatingLabelText="Ngày hết hạn khóa"
              floatingLabelFixed
              fullWidth
              value={dateTimeFormatter(application.pubKeyExpireDate)}
            />
          </Col>
          <Col md={4}>
            <TextField
              floatingLabelText="Cập nhật lúc"
              floatingLabelFixed
              fullWidth
              value={dateTimeFormatter(application.updatedAt || application.createdAt)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              border: 'solid 1px #009688'
            }}
            backgroundColor="#fff"
            labelStyle={{
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.5px',
              color: '#009688'
            }}
            label="Xem chi tiết" />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Application;
