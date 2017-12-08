import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import { AnimationGroup } from '../commons';
import {
  ENUM_ROLE_TYPE
} from '../../constants';

import {
  rowContainer,
} from './styles';

import * as actions from './actions';

const formatDate = (date) => (date ? moment(date).format('h:mm:ss DD/MM/YYYY') : 'N/A');
class UserInformation extends React.Component {
  render () {
    const {
      userData = {
        user: {}
      }
    } = this.props;
    const data = userData.user || {
      roles: [],
    };
    const firstRole = data.roles[0] || {};
    return (
      <Row style={rowContainer}>
        <Col md={12}>
          <Row>
            <Col md={7} ms={12}>
              <TextField
                floatingLabelText="Họ"
                floatingLabelFixed
                fullWidth
                value={data.lastName}
              />
            </Col>
            <Col md={5} ms={12}>
              <TextField
                floatingLabelText="Tên"
                floatingLabelFixed
                fullWidth
                value={data.firstName}
              />
            </Col>
            <Col md={7} ms={12}>
              <TextField
                floatingLabelText="Email"
                floatingLabelFixed
                fullWidth
                value={data.email}
              />
            </Col>
            <Col md={5} ms={12}>
              <TextField
                floatingLabelText="Tên Đăng Nhập"
                floatingLabelFixed
                fullWidth
                value={data.username}
              />
            </Col>
            <Col md={5} ms={12}>
              <TextField
                floatingLabelText="Nhóm"
                floatingLabelFixed
                fullWidth
                value={ENUM_ROLE_TYPE[firstRole.name]}
              />
            </Col>
            <Col md={7} ms={12}>
              <TextField
                floatingLabelText="Thời gian hoạt động gần nhất"
                floatingLabelFixed
                fullWidth
                floatingLabelStyle={{whiteSpace: 'nowrap'}}
                value={formatDate(data.lastLogin)}
              />
            </Col>
          </Row>
        </Col>
        <AnimationGroup
          loading={this.props.requesting}
          errorLoading={this.props.error ? true : false}
        />
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.get('data')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInformation);
