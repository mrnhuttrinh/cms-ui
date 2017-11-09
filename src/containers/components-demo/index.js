import React from 'react';
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import {
  Login,
  Dashboard,
  Address,
  IdentifyDocument,
} from '../../components';
import AppBarHeader from './appBarHeader';
import LeftSideMenu from './leftSideMenu';

import "./index.css";

class ComponentsDemoRoute extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      openLeftSideMenu: false
    };
    this.handleToggleLeftSideMenu = this.handleToggleLeftSideMenu.bind(this);
  }
  handleToggleLeftSideMenu() {
    this.setState({
      openLeftSideMenu: !this.state.openLeftSideMenu
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const rightContentClassName = this.state.openLeftSideMenu ? 'ec-right-content-with-side-menu' : 'ec-right-content';
    return (
      <Route {...rest} render={props => (
        <div className="ec-main-container">
          <AppBarHeader onLeftIconButtonTouchTap={this.handleToggleLeftSideMenu} />
          <div>
            <LeftSideMenu openLeftSideMenu={this.state.openLeftSideMenu} />
            <div className={rightContentClassName}>
              <div>
                <Switch>
                  <Route exact path="/components-demo/login" component={Login}/>
                  <Route exact path="/components-demo/dashboard" component={Dashboard}/>
                  <Route exact path="/components-demo/common/address" component={Address}/>
                  <Route exact path="/components-demo/common/identify-document" component={IdentifyDocument}/>
                </Switch>
              </div>
            </div>
            <div className="clear-float" />
          </div>
        </div>
      )} />
    );
  }
}


export default withRouter(ComponentsDemoRoute);
