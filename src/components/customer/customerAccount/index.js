import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Card,
  CardActions,
  CardTitle,
  CardText
} from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

import * as actions from './actions';
import { STATUS } from './constants';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

const formatDate = (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A');
const formatTinmeDate = (date) => (date ? moment(date).format('hh:mm:ss DD/MM/YYYY') : 'N/A');

class CustomerAccount  extends React.Component  {
  componentWillMount() {
    this.props.actions.getAccountByCustomerId(this.props.customerId);
  }
  renderCard(account, key) {
    return (<Card key={key}>
      <CardTitle style={titleStyle}>
        Thông tin tài khoản
      </CardTitle>
      <CardText>
        <TextField
          floatingLabelText="Số tài khoản"
          value={account.id}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Loại"
          value={account.accountType.description}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Tên"
          value={account.accountName}
          floatingLabelFixed={true}
        /><br/>
        <TextField
          floatingLabelText="Tên Tài Khoản"
          value={account.accountName}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Ngày mở"
          value={formatDate(account.dateOpened)}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Ngày đóng"
          value={formatDate(account.dateClosed)}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Chi tiết"
          value="[TBD]"
          floatingLabelFixed={true}
        /><br />
        <TextField
          floatingLabelText="Loại tiền"
          value={account.currencyCode.text}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Trạng thái ví"
          value={STATUS[account.status]}
          floatingLabelFixed={true}
        /><br />
        <TextField
          floatingLabelText="Số dư hiện tại"
          value={account.currentBalance}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Thời gian cập nhật gần nhất"
          value={formatTinmeDate(account.updatedAt)}
          floatingLabelFixed={true}
        />
      </CardText>
      <CardActions style={{textAlign: 'right'}}>
        <RaisedButton containerElement={<Link to={`/account/${account.id}`} />} label="Xem chi tiết" style={{border: 'solid 1px #009688'}} labelColor='#009688'/>
      </CardActions>
    </Card>)
  }
  render () {
    if (this.props.data && this.props.data._embedded) {
      const accountsCard = _.map(this.props.data._embedded.accounts, this.renderCard);
      return (
        <div style={{padding:'20px 100px 20px 100px'}}>
          {accountsCard}
        </div>);
    }
    return null;
  }
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
