import React from 'react';
import Paper from 'material-ui/Paper';
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

import * as actions from './actions';
import { STATUS } from './constants';

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
        <RaisedButton label="Xem chi tiết" />
      </CardActions>
    </Card>)
  }
  render () {
    if (this.props.data && this.props.data._embedded) {
      const accountsCard = _.map(this.props.data._embedded.accounts, this.renderCard);
      return (
        <Paper style={style} zDepth={1} rounded={false}>
          {accountsCard}
        </Paper>);
    }
    return null;
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
