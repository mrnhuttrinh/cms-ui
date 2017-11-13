import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AppBarHeader from './appBarHeader';
import LeftSideMenu from './leftSideMenu';

import "./index.scss"; 

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
      const leftSidebarClassName = this.state.openLeftSideMenu ? 'column-left' : 'column-left-none-width';
      const rightContentClassName = this.state.openLeftSideMenu ? 'column-right' : 'column-right-full-width';
      return (
        <Route {...rest} render={props => (
          <div className="ec-main-container">
            <AppBarHeader onLeftIconButtonTouchTap={this.handleToggleLeftSideMenu} />
            <div className="main-body">
              <div className={leftSidebarClassName}>
                <LeftSideMenu openLeftSideMenu={this.state.openLeftSideMenu} />
              </div> 
              <div className={rightContentClassName}>
                <Component {...props}/> 
              </div>
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
