import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AppBarHeader from './appBarHeader';
import LeftSideMenu from './leftSideMenu';

import "./index.css";

class PrivateRoute extends React.Component{
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
    if (this.props.data && this.props.data.credential) {
      const rightContentClassName = this.state.openLeftSideMenu ? 'ec-right-content-with-side-menu' : 'ec-right-content';
      return (
        <Route {...rest} render={props => (
          <div className="ec-main-container">
            <AppBarHeader onLeftIconButtonTouchTap={this.handleToggleLeftSideMenu} />
            <div>
              <LeftSideMenu openLeftSideMenu={this.state.openLeftSideMenu} />
              <div className={rightContentClassName}>
                <div>
                  <Component {...props}/>
                </div>
              </div>
              <div className="clear-float" />
            </div>
          </div>
        )} />
      );
    }
    return (
      <Route {...rest} render={props => (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location }
          }}
        />
      )} />
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.loginReducer.get('data'),
});

export default withRouter(connect(
  mapStateToProps, null, null, {
    pure: false,
  }
)(PrivateRoute));
