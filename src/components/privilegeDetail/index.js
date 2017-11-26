import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {
  Card,
  CardActions,
  CardTitle,
  CardText,
  CardHeader
} from 'material-ui/Card';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import moment from 'moment';

import * as actions from './actions';
import { STATUS } from './constants';

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)'
}
const indicatorStyle = {
  backgroundColor: '#009688'
}

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
  paddingLeft: 0,
}

const formatDate = (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A');
const formatText = (value) => (value || ' ');

class CustomerAccount  extends React.Component  {
  render () {
    return (
      <div>
      <AppBar
        title={<span style={{
            color: 'rgba(0, 0, 0, 0.4)'
          }}>Chi Tiết Người Dùng</span>}
        iconStyleLeft={{display: 'none'}}
        style={{
          backgroundColor: '#e8e8e8',
          boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)'
        }}
        iconElementRight={
          <MenuItem
            style={{
              color: '#009688',
              letterSpacing: '0px'
            }}
            leftIcon={
              <FontIcon
                style={{
                  color: '#009688',
                }}
                className="material-icons"
              >refresh</FontIcon>}>
              REFRESH
          </MenuItem>
        }
      />
      <Tabs style={tabStyle} inkBarStyle={indicatorStyle}>
        <Tab style={tabStyle} label="THÔNG TIN CHUNG & LỊCH SỬ HOẠT ĐỘNG" >
          <Row style={{backgroundColor: '#fff', marginLeft: 0, marginRight: 0 }}>
            <Col md={4} style={{borderRight: '1px solid rgba(0, 0, 0, 0.5)'}}>
              <CardTitle style={titleStyle}>
                Thông tin cá nhân
              </CardTitle>
              <Row>
                <Col md={7} ms={12}>
                  <TextField
                    floatingLabelText="Họ"
                    floatingLabelFixed
                    fullWidth
                  />
                </Col>
                <Col md={5} ms={12}>
                  <TextField
                    floatingLabelText="Tên"
                    floatingLabelFixed
                    fullWidth
                  />
                </Col>
                <Col md={7} ms={12}>
                  <TextField
                    floatingLabelText="Email"
                    floatingLabelFixed
                    fullWidth
                  />
                </Col>
                <Col md={5} ms={12}>
                  <TextField
                    floatingLabelText="Tên Đăng Nhập"
                    floatingLabelFixed
                    fullWidth
                  />
                </Col>
                <Col md={12} ms={12}>
                  <TextField
                    floatingLabelText="Nhóm"
                    floatingLabelFixed
                    fullWidth
                  />
                </Col>
                <Col md={6} ms={12}>
                  <TextField
                    floatingLabelText="Trạng Thái"
                    floatingLabelFixed
                    fullWidth
                  />
                </Col>
                <Col md={6} ms={12}>
                  <TextField
                    floatingLabelText="Thời gian hoạt động gần nhất"
                    floatingLabelFixed
                    fullWidth
                  />
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <CardTitle style={titleStyle}>
                Lịch Sử Hoạt Động
              </CardTitle>
              <Row>
                <List>
                </List>
                Hôm qua
                <Card>
                  <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    avatar="images/jsa-128.jpg"
                  />
                </Card>
              </Row>
            </Col>
          </Row>

            {/* <Card>
              <CardTitle style={titleStyle}>
                Thông tin cá nhân
              </CardTitle>
              <CardText>
                <TextField
                  floatingLabelText="Số tài khoản"
                />
              </CardText>
              <CardActions style={{textAlign: 'right'}}>
                <RaisedButton label="KHÓA TÀI KHOẢN" />
                <RaisedButton label="CHỈNH SỬA" />
              </CardActions>
            </Card> */}
        </Tab>
      </Tabs>
    </div>
    );
  }
}

CustomerAccount.defaultProps = {
  data: [
    {
      account: {},
      card: {}
    }
  ],
}

const mapStateToProps = (state) => ({
  data: state.CustomerAccountReducer.get('accounts'),
  requesting: state.CustomerAccountReducer.get('requesting'),
  error: state.CustomerAccountReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerAccount);
