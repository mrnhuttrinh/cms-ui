import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          style={{padding: 0}}
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class LeftSideMenu extends React.Component {
  
  selectMenuClassName(path = '') {
    const { location: {
        pathname = '',
      }
    } = this.props;
    if (path === pathname) {
      return {
        background: 'green'
      };
    }
    return {};
  }

  render() {
    return (
      <Drawer
        docked={true}
        containerStyle={{ position: 'relative', height: '100%' }}
        open={this.props.leftMenuState}
      >
        <SelectableList defaultValue={3}>
          <ListItem
            value={1}
            primaryText="Bảng điều khiển"
            leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}
          />
          <ListItem
            value={2}
            primaryText={<Link to="/customer">Khách hàng</Link>}
            leftIcon={<FontIcon className="material-icons">people</FontIcon>}
          />
          <ListItem
            value={3}
            primaryText="Đại lí"
            leftIcon={<FontIcon className="material-icons">store</FontIcon>}
          />
          <ListItem
            value={4}
            primaryText="Hệ thống thẻ"
            leftIcon={<FontIcon className="material-icons">credit_card</FontIcon>}
          />
          <ListItem
            value={5}
            primaryText="Tài khoản"
            leftIcon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
          />
          <ListItem
            value={6}
            primaryText="Báo cáo thống kê"
            leftIcon={<FontIcon className="material-icons">assignment</FontIcon>}
          />
          <ListItem
            value={7}
            primaryText="Cài đặt"
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          />
          <ListItem
            value={8}
            primaryText="Đăng xuất"
            leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
          />
        </SelectableList>
      </Drawer>
    );
  }
}
const mapStateToProps = (state) => ({
  leftMenuState: state.privateRouteReducers.get('leftMenuState'),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LeftSideMenu));