import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';

class RefreshButton extends React.Component {
  render () {
    return (
      <MenuItem
        style={{
          color: '#009688',
          letterSpacing: '0px'
        }}
        onClick={this.props.onClick}
        leftIcon={
          <FontIcon
            style={{
              color: '#009688',
            }}
            className="material-icons"
          >refresh</FontIcon>}>
          REFRESH
      </MenuItem>
    );
  }
}

export default RefreshButton;
