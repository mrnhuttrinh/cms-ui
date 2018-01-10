import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'react-i18next';

class ConfirmationDialog extends React.Component {
  render() {
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
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleCancel}
      >
        {this.props.content}
      </Dialog>
    );
  }
}

export default  translate('translations')(ConfirmationDialog);
