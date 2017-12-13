import React from 'react';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';


import {
  ENUM_USER_STATUS,
} from '../../constants';

const formatDate = (date) => (date ? moment(date).format('h:mm:ss DD/MM/YYYY') : 'N/A');
class UserInformation extends React.Component  {
  render () {
    const {
      userData = {
        roles: [],
      }
    } = this.props;
    const status = userData.enabled ? 'ACTIVE' : 'INACTIVE';
    const firstRole = userData.roles[0] || {};
    return (
      <Row>
        <Col md={7} ms={12}>
          <TextField
            floatingLabelText="Họ"
            floatingLabelFixed
            fullWidth
            value={userData.firstName}
          />
        </Col>
        <Col md={5} ms={12}>
          <TextField
            floatingLabelText="Tên"
            floatingLabelFixed
            fullWidth
            value={userData.lastName}
          />
        </Col>
        <Col md={7} ms={12}>
          <TextField
            floatingLabelText="Email"
            floatingLabelFixed
            fullWidth
            value={userData.email}
          />
        </Col>
        <Col md={5} ms={12}>
          <TextField
            floatingLabelText="Tên Đăng Nhập"
            floatingLabelFixed
            fullWidth
            value={userData.username}
          />
        </Col>
        <Col md={12} ms={12}>
          <TextField
            floatingLabelText="Nhóm"
            floatingLabelFixed
            fullWidth
            value={firstRole.name}
          />
        </Col>
        <Col md={6} ms={12}>
          <TextField
            floatingLabelText="Trạng Thái"
            floatingLabelFixed
            fullWidth
            value={ENUM_USER_STATUS[status]}
          />
        </Col>
        <Col md={6} ms={12}>
          <TextField
            floatingLabelText="Thời gian hoạt động gần nhất"
            floatingLabelFixed
            fullWidth
            floatingLabelStyle={{whiteSpace: 'nowrap'}}
            value={formatDate(userData.lastLogin)}
          />
        </Col>
      </Row>
    );
  }
}

export default UserInformation;
