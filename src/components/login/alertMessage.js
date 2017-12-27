import React from 'react';
import { translate } from 'react-i18next'; 
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class AlertMessage extends React.Component {

  render() {
    const actions = [
      <FlatButton
        label={this.props.t('CANCEL')}
        primary={true}
        onClick={this.props.alertMessageHandleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.openAlertMessage}
          onRequestClose={this.props.alertMessageHandleClose}
        >
          {this.props.t('You logged in from another device')}
        </Dialog>
      </div>
    );
  }
}

export default translate('translations')(AlertMessage);
