import React from 'react';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ConfirmDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label={this.props.t('CANCEL')}
        primary={true}
        onClick={this.props.onClickCloseDialog}
        disabled={this.props.requesting}
      />,
      <FlatButton
        label={this.props.t('AGREE')}
        primary={true}
        backgroundColor="#9F6000"
        labelStyle={{color: '#fff'}}
        onClick={this.props.updateEntireUser}
        disabled={this.props.requesting}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.t('Update entire user status')}
          actions={actions}
          modal={true}
          open={this.props.openDialog}
        >
          {this.props.t('Do you want to update entire user status from')} {this.props.t(this.props.from)} {this.props.t('to')} {this.props.t(this.props.to)}?
        </Dialog>
      </div>
    );
  }
}

export default translate('translations')(ConfirmDialog);