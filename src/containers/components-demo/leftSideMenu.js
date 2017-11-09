import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

export default class LeftSideMenu extends React.Component {

  render() {
    return (
      <div>
        <Drawer
          docked={true}
          containerStyle={{height: 'calc(100% - 64px)', top: 64}}
          open={this.props.openLeftSideMenu}
        >
          <Link to="/components-demo/login">
            <MenuItem leftIcon={<FontIcon className="material-icons">lock_open</FontIcon>}>Login</MenuItem>
          </Link>
          <Link to="/components-demo/dashboard">
            <MenuItem leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}>Dashboard</MenuItem>
          </Link>
          <Link to="/components-demo/common/address">
            <MenuItem leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}>Address</MenuItem>
          </Link>
          <Link to="/components-demo/common/identify-document">
            <MenuItem leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}>Identify Document</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}

LeftSideMenu.PropTypes = {
  openLeftSideMenu: PropTypes.bool,
}
