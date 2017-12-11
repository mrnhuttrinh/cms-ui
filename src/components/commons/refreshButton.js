import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import { translate } from 'react-i18next';

class RefreshButton extends React.Component {
  render () {
    return (
      <MenuItem
        style={{
          color: '#009688',
          letterSpacing: '0px',
          textTransform: 'uppercase',
        }}
        onClick={this.props.onClick}
        leftIcon={
          <FontIcon
            style={{
              color: '#009688',
            }}
            className="material-icons"
          >refresh</FontIcon>}>
          {this.props.t('refresh')}
      </MenuItem>
    );
  }
}

export default translate('translations')(RefreshButton);
