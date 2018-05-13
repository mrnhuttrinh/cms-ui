import React from 'react';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { AnimationGroup } from '../commons';

class DialogDeleteConfirm extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label={this.props.t('CANCEL')}
        primary={true}
        onClick={() => this.props.onClickCloseDialog(null, null)}
        disabled={this.props.requesting}
      />,
      <FlatButton
        label={this.props.t('DELETE')}
        primary={true}
        backgroundColor="rgb(185, 50, 33)"
        labelStyle={{color: '#fff'}}
        onClick={() => this.props.deleteCustomer()}
        disabled={this.props.requesting}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.t('Delete Customer')}
          actions={actions}
          modal={true}
          open={this.props.openDialog}
        >
          {this.props.t('Are you sure delete the customer?')}
          <AnimationGroup
            loading={this.props.requesting}
          />
        </Dialog>
      </div>
    );
  }
}

export default translate('translations')(DialogDeleteConfirm);