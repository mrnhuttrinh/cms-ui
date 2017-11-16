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
const formatText = (value) => (value || ' ');

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
          value={formatText(account.id)}
        />
        <TextField
          floatingLabelText="Loại"
          value={formatText(account.accountType.description)}
        />
        <TextField
          floatingLabelText="Tên"
          value={formatText(account.accountName)}
        /><br/>
        <TextField
          floatingLabelText="Tên Tài Khoản"
          value={formatText(account.accountName)}
        />
        <TextField
          floatingLabelText="Ngày mở"
          value={formatDate(account.dateOpened)}
        />
        <TextField
          floatingLabelText="Ngày đóng"
          value={formatDate(account.dateClosed)}
        />
        <TextField
          floatingLabelText="Chi tiết"
          value="[TBD]"
        /><br />
        <TextField
          floatingLabelText="Loại tiền"
          value={formatText(account.currencyCode.text)}
        />
        <TextField
          floatingLabelText="Trạng thái ví"
          value={formatText(STATUS[account.status])}
        /><br />
        <TextField
          floatingLabelText="Số dư hiện tại"
          value={formatText(account.currentBalance)}
        />
        <TextField
          floatingLabelText="Thời gian cập nhật gần nhất"
          value="07:30:55 5/11/2017"
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
