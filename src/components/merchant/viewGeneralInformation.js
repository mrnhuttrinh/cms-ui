import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import {
  CardTitle,
} from 'material-ui/Card';

import { AnimationGroup } from '../commons';

import * as actions from './actions';

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 10,
  marginRight: 10,
  marginTop: 20,
  marginBottom: 20,
};
const titleStyle = {
  fontSize: '16px',
  color: '#00897b',
  paddingLeft: 0,
}

const MERCHANT_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

const formatDate = (date) => (date ? moment(date).format('h:mm:ss DD/MM/YYYY') : 'N/A');

class GeneralInformation extends React.Component {

  componentWillMount() {
    const {
      match: {
        params: {
          merchantId
        }
      }
    } = this.props;
    this.props.actions.getMerchantDetail(merchantId);
  }
  render() {
    const {
      data = {
        address: {}
      },
    } = this.props;
    const {
      address = {}
    } = data;
    return (
      <Row style={rowContainer}>
        <AnimationGroup
          loading={this.props.requesting}
          errorLoading={this.props.error ? true : false}
        />
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
                value={data.name}
              />
            </Col>
            <Col md={6}>
              <TextField
                floatingLabelText="SĐT"
                floatingLabelFixed
                fullWidth
                value={data.phone}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                floatingLabelText="Email"
                floatingLabelFixed
                fullWidth
                value={data.email}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextField
                floatingLabelText="Trạng Thái"
                floatingLabelFixed
                fullWidth
                value={MERCHANT_STATUS[data.status]}
              />
            </Col>
            <Col md={6}>
              <TextField
                floatingLabelText="THời gian cập nhật gần nhất"
                floatingLabelFixed
                fullWidth
                value={formatDate(data.updatedAt)}
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
                value={address.line1}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                floatingLabelText="Phường (Xã), Quận (Huyện)"
                floatingLabelFixed
                fullWidth
                value={address.line2}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                floatingLabelText="Tỉnh, Thành Phố"
                floatingLabelFixed
                fullWidth
                value={address.city}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const generalInformation = state.MerchantDetailReducer.get('generalInformation');
  return {
    requesting: generalInformation.get('requesting'),
    data: generalInformation.get('data'),
    error: generalInformation.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneralInformation));
