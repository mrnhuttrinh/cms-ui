import React from 'react';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { AnimationGroup } from '../commons';

class DialogEnableConfirm extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label={this.props.t('CANCEL')}
        primary={true}
        onClick={() => this.props.onClickCloseDialog(null, null)}
        disabled={this.props.requesting}
      />,
      <FlatButton
        label={this.props.t('RECOVERY')}
        primary={true}
        backgroundColor="#9F6000"
        labelStyle={{color: '#fff'}}
        onClick={() => this.props.deleteCustomer()}
        disabled={this.props.requesting}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.t('Recovery Customer')}
          actions={actions}
          modal={true}
          open={this.props.openDialog}
        >
          {this.props.t('Are you sure recovery the customer?')}
          <AnimationGroup
            loading={this.props.requesting}
          />
        </Dialog>
      </div>
    );
  }
}

export default translate('translations')(DialogEnableConfirm);