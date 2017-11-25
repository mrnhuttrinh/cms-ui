import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

import {
  Card,
  CardText
} from 'material-ui/Card';

import { GridList } from 'material-ui/GridList';

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

class CustomerDetails  extends React.Component  {
  componentWillMount() {
    this.props.actions.getCustomer(this.props.accountId);
  }

  renderCard() {
    return (<Card>
      <GridList
        cols={2}
        cellHeight="auto"
      >
        <CardText>
          <Subheader style={titleStyle}>Thông tin tài khoản</Subheader>
          <TextField
            floatingLabelText="Số tài khoản"
            value={formatText(this.props.account.id)}
          />
          <TextField
            floatingLabelText="Loại"
            value={formatText(this.props.account.accountType.description)}
          /><br/>
          <TextField
            floatingLabelText="Tên tài khoản"
            value={formatText(this.props.account.accountName)}
          />
          <TextField
            floatingLabelText="Ngày mở"
            value={formatDate(this.props.account.dateOpened)}
          />
          <TextField
            floatingLabelText="Ngày đóng"
            value={formatDate(this.props.account.dateClosed)}
          /><br />
          <TextField
            floatingLabelText="Loại tiền"
            value={formatText(this.props.account.currencyCode.text)}
          />
          <TextField
            floatingLabelText="Trạng thái ví"
            value={formatText(STATUS[this.props.account.status])}
          />
          <TextField
            floatingLabelText="Số dư hiện tại"
            value={this.props.account.currentBalance}
          />
          <TextField
            floatingLabelText="Thời gian cập nhật gần nhất"
            value={formatDate(this.props.account.updatedAt)}
          /><br />
        </CardText>
        <CardText>
          <Subheader style={titleStyle}>Hạng ví</Subheader>
          <TextField
            floatingLabelText="Tên"
            value={formatText('')}
          /><br />
          <TextField
            floatingLabelText="Chi tiết"
            value="[TBD]"
          />
        </CardText>
      </GridList>
    </Card>)
  }
  render () {
    return (
      <Paper style={style} zDepth={1} rounded={false}>
        {this.props.account ? this.renderCard() : null}
      </Paper>);
  }
}

CustomerDetails.defaultProps = {
  data: [
    {
      account: {},
      card: {}
    }
  ],
}

const mapStateToProps = (state) => ({
  account: state.AccountDetailReducer.get('data'),
  requesting: state.AccountDetailReducer.get('requesting'),
  error: state.AccountDetailReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerDetails);
