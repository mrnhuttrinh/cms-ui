import React from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

import {
  CardText
} from 'material-ui/Card';

import { GridList } from 'material-ui/GridList';
import _ from 'lodash';

import { dateFormatter, dateTimeFormatter } from '../../utils';

import { STATUS } from './constants';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

const groupControl = {
  display: 'block',
  padding: '14px 33px 49px',
  backgroundColor: '#e8e8e8',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 4px 4px 0px, rgba(0, 0, 0, 0.12) 0px 0px 4px 0px'
}

class AccountDetails  extends React.Component  {
  renderCard() {
    return (
      <GridList
        cols={2}
        cellHeight="auto"
        style={{padding:'20px 100px 20px 100px'}}
      >
        <CardText>
          <Subheader style={titleStyle}>Thông tin tài khoản</Subheader>
          <TextField
            floatingLabelText="Số tài khoản"
            value={this.props.account.id}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Loại"
            value={_.get(this.props.account, 'accountType.description')}
            floatingLabelFixed={true}
          /><br/>
          <TextField
            floatingLabelText="Tên tài khoản"
            value={this.props.account.accountName}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Ngày mở"
            value={dateFormatter(this.props.account.dateOpened)}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Ngày đóng"
            value={dateFormatter(this.props.account.dateClosed)}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="Loại tiền"
            value={this.props.account.currencyCode.text}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Trạng thái ví"
            value={STATUS[this.props.account.status]}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Số dư hiện tại"
            value={this.props.account.currentBalance}
            floatingLabelFixed={true}
          />
          <TextField
            floatingLabelText="Thời gian cập nhật gần nhất"
            value={dateTimeFormatter(this.props.account.updatedAt)}
            floatingLabelFixed={true}
          /><br />
        </CardText>
        <CardText>
          <Subheader style={titleStyle}>Hạng ví</Subheader>
          <TextField
            floatingLabelText="Tên"
            value={_.get(this.props.account, 'plan.planType.description')}
            floatingLabelFixed={true}
          /><br />
          <TextField
            floatingLabelText="Chi tiết"
            value={_.get(this.props.account, 'plan.id')}
            floatingLabelFixed={true}
          />
        </CardText>
      </GridList>);
  }
  render () {
    return (
      <div>
        <div style={groupControl}>
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginLeft: 15
            }}
            backgroundColor="#009688"
            labelStyle={{color: '#fff'}}
            label="CHỈNH SỬA"
          />
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginRight: 15,
            }}
            backgroundColor="#b93221"
            labelStyle={{color: '#fff'}}
            label="KHÓA TÀI KHOẢN"
          />
        </div>
        {this.props.account ? this.renderCard() : null}
      </div>);
  }
}

export default AccountDetails;
