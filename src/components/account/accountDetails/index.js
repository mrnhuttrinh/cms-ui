import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import AccoutDetailsComponent from '../accountDetailsComponent';

const groupControl = {
  display: 'block',
  padding: '14px 33px 49px',
  backgroundColor: '#e8e8e8',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 4px 4px 0px, rgba(0, 0, 0, 0.12) 0px 0px 4px 0px'
}

class AccountDetails  extends React.Component  {
  constructor(props) {
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
  }
  componentWillMount() {
    this.props.actions.getAccountDetails(this.props.accountId);
  }
  updateStatus() {
    const params = {
      id: this.props.account.id,
      status: this.props.account.status === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE',
    }
    this.props.actions.updateAccountStatus(params);
  }
  renderCard() {
    const lockButton = (<FlatButton
      style={{
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        float: 'right',
        marginRight: 15,
      }}
      backgroundColor="#b93221"
      labelStyle={{color: '#fff'}}
      label="KHÓA TÀI KHOẢN"
      onClick={this.updateStatus}
      disabled={this.props.updateRequesting}
    />);
    const unLockButton = (<FlatButton
      style={{
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        float: 'right',
        marginRight: 15,
      }}
      backgroundColor="#009688"
      labelStyle={{color: '#fff'}}
      label="MỞ KHÓA TÀI KHOẢN"
      onClick={this.updateStatus}
      disabled={this.props.updateRequesting}
    />);

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
          {this.props.account.status === 'ACTIVE' ? lockButton : unLockButton}
        </div>
        <div
          style={{padding:'20px 100px 20px 100px'}}
        >
          <AccoutDetailsComponent account={this.props.account} />
        </div>
      </div>);
  }
  render () {
    return this.props.account ? this.renderCard() : null;
  }
}

const mapStateToProps = (state) => ({
  account: state.AccountDetailReducer.get('account'),
  requesting: state.AccountDetailReducer.get('requesting'),
  error: state.AccountDetailReducer.get('error'),
  updateRequesting: state.AccountDetailReducer.get('updateRequesting'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountDetails);
