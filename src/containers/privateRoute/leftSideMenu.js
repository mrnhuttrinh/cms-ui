import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

export default class LeftSideMenu extends React.Component {

  render() {
    return (
      <Drawer
        docked={true}
        containerStyle={{ position: 'relative', height: '100%' }}
        open={this.props.openLeftSideMenu}
      >
        <MenuItem leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}>Bảng điều khiển</MenuItem>
        <MenuItem leftIcon={<FontIcon className="material-icons">people</FontIcon>}>Khách hàng</MenuItem>
        <MenuItem leftIcon={<FontIcon className="material-icons">store</FontIcon>}>Đại lí</MenuItem>
        <MenuItem leftIcon={<FontIcon className="material-icons">credit_card</FontIcon>}>Hệ thống thẻ</MenuItem>
        <MenuItem leftIcon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}>Tài khoản</MenuItem>
        <MenuItem leftIcon={<FontIcon className="material-icons">assignment</FontIcon>}>Báo cáo thống kê</MenuItem>
        <MenuItem leftIcon={<FontIcon className="material-icons">settings</FontIcon>}>Cài đặt</MenuItem>
        <MenuItem leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}>Đăng xuất</MenuItem>
      </Drawer>
    );
  }
}

LeftSideMenu.PropTypes = {
  openLeftSideMenu: PropTypes.bool,
}