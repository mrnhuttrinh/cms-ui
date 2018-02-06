import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getFormValues, getFormSyncErrors} from 'redux-form'; 
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

class DepositDialog extends React.Component {
  getDisabledOk() {
    const {
      values, errors, 
    } = this.props;
    if (_.isEmpty(errors)) {
      return false;
    }
    return true;
  }
  render() {
    const {
      depositToAccountRequesting, 
    } = this.props;
    const actions = [
      <FlatButton
        label={this.props.t('Cancel')}
        primary={true}
        onClick={this.props.handleCancel}
      />,
      <FlatButton
        label={this.props.t('Ok')}
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleOk}
        disabled={this.getDisabledOk() || depositToAccountRequesting}
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.props.open}
      >
        {this.props.children}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  const depositToAccount = state.AccountDetailReducer.get('depositToAccount')
  return {
    values: getFormValues('depositToAccount')(state),
    errors: getFormSyncErrors('depositToAccount')(state),
    depositToAccountData: depositToAccount.get('data'),
    depositToAccountRequesting: depositToAccount.get('requesting'),
    depositToAccountError: depositToAccount.get('error'),
  }
  
};

export default connect(mapStateToProps)(translate('translations')(DepositDialog));
