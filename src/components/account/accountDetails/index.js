import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import * as actions from './actions';
import AccoutDetailsComponent from '../accountDetailsComponent';
import ConfirmationDialog from './confirmationDialog';
import DepositDialog from './depositDialog';
import DepositForm from './depositForm';

class AccountDetails  extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      dialog: null,
    };
    this.updateStatus = this.updateStatus.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.openDepositDialog = this.openDepositDialog.bind(this);
  }
  componentWillMount() {
    this.props.actions.getAccountDetails(this.props.accountId);
  }
  updateStatus() {
    this.closeDialog();
    const params = {
      id: this.props.account.id,
      status: this.props.account.status === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE',
    };
    this.props.actions.updateAccountStatus(params);
  }
  closeDialog() {
    this.setState({
      dialog: null,
      showDialog: false,
    });
  }
  openDialog() {
    this.setState({
      dialog: 'confirm',
      showDialog: true,
    });
  }

  openDepositDialog() {
    this.setState({
      dialog: 'deposit',
      showDialog: true,
    });
  }

  renderCard() {
    const depositButton = (
      <FlatButton
        style={{
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        float: 'right',
        marginRight: 15,
      }}
        backgroundColor="#009688"
        labelStyle={{color: '#fff'}}
        label={this.props.t('Deposit')}
        onClick={this.openDepositDialog}
        disabled={this.props.updateRequesting}
      />
    );
    const lockButton = (<FlatButton
      style={{
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        float: 'right',
        marginRight: 15,
      }}
      backgroundColor="#b93221"
      labelStyle={{color: '#fff'}}
      label={this.props.t('lock account')}
      onClick={this.openDialog}
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
      label={this.props.t('unlock account')}
      onClick={this.openDialog}
      disabled={this.props.updateRequesting}
    />);

    const dialogTitle = this.props.t(`dialog tilte when account is ${this.props.account.status}`);
    const dialogContent = this.props.t(`dialog content when account is ${this.props.account.status}`);

    return (
      <div className="account-detail-container">
        <div className="group-control">
          {depositButton}
          {this.props.account.status === 'ACTIVE' ? lockButton : unLockButton}
        </div>
        <div className="account-detail">
          <AccoutDetailsComponent account={this.props.account} />
        </div>
        <DepositDialog
          handleOk={this.updateStatus}
          handleCancel={this.closeDialog}
          title={this.props.t(`Deposit to this account`)}
          open={this.state.showDialog && this.state.dialog === 'deposit'}
        >
          <DepositForm></DepositForm>
        </DepositDialog>
        <ConfirmationDialog
          handleOk={this.updateStatus}
          handleCancel={this.closeDialog}
          title={dialogTitle}
          content={dialogContent}
          open={this.state.showDialog && this.state.dialog === 'confirm'}
        />
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

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountDetails));
