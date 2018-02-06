import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormValues, getFormSyncErrors} from 'redux-form'; 
import { translate } from 'react-i18next';
import * as actions from './actions';
import * as actionsCard from '../accountCards/actions';
import AccoutDetailsComponent from '../accountDetailsComponent';
import ConfirmationDialog from './confirmationDialog';
import DepositDialog from './depositDialog';
import DepositForm from './depositForm';
import { ENUM_USER_STATUS } from './../../../constants';

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
    this.handleOKDeposit = this.handleOKDeposit.bind(this);
  }
  componentWillMount() {
    this.props.actions.getAccountDetails(this.props.accountId);
    // get list card
    this.props.actions.getCardsByAccountId(this.props.accountId);
  }
  updateStatus() {
    this.closeDialog();
    const params = {
      id: this.props.account.id,
      status: this.props.account.status === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE',
    };
    this.props.actions.updateAccountStatus(params);
  }
  handleOKDeposit() {
    /**
     * build params
     */
    const {
      values = {},
      userLogin
    } = this.props;
    const params = {
      amount: values.amount,
      card: {
        number: values.card,
      },
      extendedInformation: {
        targetAccount: {
          category: "ACCOUNT",
          type: "DEFAULT"
        }
      },
      transactionDetails: {
        sender: values.sender,
        teller: userLogin.user.id,
        detail: values.detail,
      },
      additionalTerminalInfo: {
        terminalId: '288816b1-369d-4d3f-8396-111111111111',
        terminalAddress: {
          addressType: 1,
          details: {
            city: 'HCM',
            district: 'Tan Binh'
          }
        }
      }
    };
    this.props.actions.depositToAccount(params).then(() => {
      this.props.actions.getAccountDetails(this.props.accountId);
      this.closeDialog();
    });
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

  renderDialogDeposit() {
    if (this.props.account.status === ENUM_USER_STATUS.ACTIVE) {
      return (
        <DepositDialog
          handleOk={this.handleOKDeposit}
          handleCancel={this.closeDialog}
          title={this.props.t(`Deposit to this account`)}
          open={this.state.showDialog && this.state.dialog === 'deposit'}
        >
          <DepositForm />
        </DepositDialog>
      );
    }
    return null;
  } 
 
  renderButtonDeposit() {
    if (this.props.account.status === ENUM_USER_STATUS.ACTIVE) {
      return (
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
    }
    return null;
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
          {this.renderButtonDeposit()}
          {this.props.account.status === 'ACTIVE' ? lockButton : unLockButton}
        </div>
        <div className="account-detail">
          <AccoutDetailsComponent account={this.props.account} />
        </div>
        {this.renderDialogDeposit()}
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
  values: getFormValues('depositToAccount')(state),
  errors: getFormSyncErrors('depositToAccount')(state),
  userLogin: state.loginReducer.get('data'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actionsCard, actions) , dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountDetails));
