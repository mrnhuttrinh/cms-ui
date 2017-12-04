import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AppBarHeader from './appBarHeader';
import LeftSideMenu from './leftSideMenu';
import privateRouteReducers from './reducers';
import { AnimationGroup } from '../../components';

import "./index.scss"; 

class PrivateRoute extends React.Component{
  render() {
    const {
      component: Component,
      leftMenuState,
      loading,
      errorLoading,
      ...rest
    } = this.props;
    if (this.props.data && this.props.data.credential) {
      const leftSidebarClassName = leftMenuState ? 'column-left' : 'column-left-none-width';
      const rightContentClassName = leftMenuState ? 'column-right' : 'column-right-full-width';
      return (
        <Route {...rest} render={props => (
          <div className="ec-main-container">
            <AppBarHeader />
            <div className="main-body">
              <div className={leftSidebarClassName}>
                <LeftSideMenu location={props.location} />
              </div> 
              <div className={rightContentClassName}>
                <AnimationGroup
                  loading={loading}
                  errorLoading={errorLoading}
                />
                <Component {...props}/>
              </div>
            </div>
          </div>
        )} />
      );
    }
    const {
      path = '/',
    } = this.props;
    return (
      <Route {...rest} render={props => (
        <Redirect
          from={path}
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
  leftMenuState: state.privateRouteReducers.get('leftMenuState'),
  loading: state.animationGroup.get('loading'),
  errorLoading: state.animationGroup.get('errorLoading'),
});

export default withRouter(connect(
  mapStateToProps, null, null, {
    pure: false,
  }
)(PrivateRoute));

export const reducers = {
  privateRouteReducers
};
