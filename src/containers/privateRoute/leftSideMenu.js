import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import _ from 'lodash';
import uuid from 'uuid/v1';
import { translate } from 'react-i18next';
import * as actionsLogin from '../../components/login/actions';
import * as actions from './actions';

import { UI_ROUTES_LEFT_SIDE_MENU } from '../../constants';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.object.isRequired,
    };

    handleRequestChange = (event, index) => {
      if (this.props.onClick) {
        this.props.onClick(index);
      }
    };

    render() {
      return (
        <ComposedComponent
          style={{padding: 0}}
          value={this.props.defaultValue}
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
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: this.selectMenuClassName(props),
    };
    this.signOut = this.signOut.bind(this);
    this.onChangeMenu = this.onChangeMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedMenu: this.selectMenuClassName(nextProps),
    });
  }

  onChangeMenu(path) {
    this.setState({
      selectedMenu: this.selectMenuClassName(this.props),
    });
  }

  onClickMenu(path) {
    this.props.history.push(path);
  }

  signOut() {
    this.props.actions.signOut().then(() => {
      // redirect if sign out success
      window.location.href = '/login';
    });
  }

  selectMenuClassName(props) {
    const {
      location: {
        pathname = '',
      },
    } = props;
    const chooseMenu = _.find(UI_ROUTES_LEFT_SIDE_MENU, routeUI => {
      return pathname.indexOf(routeUI.value) === 1;
    });
    if (chooseMenu) {
      return chooseMenu.value;
    }
    return UI_ROUTES_LEFT_SIDE_MENU.CUSTOMER.value;
  }

  generateMenu(routeUI, key) {
    if (routeUI.value === UI_ROUTES_LEFT_SIDE_MENU.LOGOUT.value) {
     return (
        <ListItem
          key={key}
          value={routeUI.value}
          primaryText={this.props.t(routeUI.text)}
          onClick={this.signOut}
          leftIcon={<FontIcon className="material-icons">{routeUI.icon}</FontIcon>}
        />
      );
    }
    return (
      <ListItem
        key={key}
        value={routeUI.value}
        primaryText={this.props.t(routeUI.text)}
        onClick={() => this.onClickMenu(routeUI.url || '')}
        leftIcon={<FontIcon className="material-icons">{routeUI.icon}</FontIcon>}
      />
    );
  }

  render() {
    return (
      <Drawer
        docked={true}
        containerStyle={{ position: 'relative', height: '100%' }}
        open={this.props.leftMenuState}
      >
        <SelectableList defaultValue={this.state.selectedMenu} onClick={this.onChangeMenu}>
          {
            _.map(UI_ROUTES_LEFT_SIDE_MENU, routeUI => {
              return this.generateMenu(routeUI, uuid());
            })
          }
        </SelectableList>
      </Drawer>
    );
  }
}
const mapStateToProps = (state) => ({
  leftMenuState: state.privateRouteReducers.get('leftMenuState'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions, actionsLogin), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate('translations')(LeftSideMenu)));
