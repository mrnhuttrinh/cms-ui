import React from 'react';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

class AddPermissionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    this.setState({
      value: null
    });
    this.props.handleClose();
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.value === null}
        onClick={this.handleClose}
      />,
    ];
    const {
      permissions = [],
      currentPermissions = [],
    } = this.props;
    const newPermissions = _.differenceBy(permissions, currentPermissions, 'id');
    const items = _.map(newPermissions, per => (<MenuItem value={per.name} primaryText={per.displayName} />));
    return (
      <Dialog
        title="Add new permission"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
        <div>
        <SelectField
          floatingLabelText={this.props.t('Role')}
          value={this.state.value}
          onChange={this.handleChange}
        >
          {items}
        </SelectField>
        </div>
      </Dialog>
    );
  }
}

export default translate('translations')(AddPermissionDialog);
