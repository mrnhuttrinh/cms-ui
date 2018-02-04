import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AppBarHeader from './appBarHeader';
import LeftSideMenu from './leftSideMenu';
import privateRouteReducers from './reducers';
import { AnimationGroup } from '../../components';
import * as actions from './actions';

import "./index.scss";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reloadChildren: true,
    };
    this.forceReloadContent = this.forceReloadContent.bind(this);
  }
  componentDidMount() {
    if (this.props.data && this.props.data.user && this.props.data.user.roles) {
      this.props.actions.getRoleDetail(this.props.data.user.roles[0].id);
    }
  }
  forceReloadContent() {
    this.setState({
      reloadChildren: false,
    });
    setTimeout(() => {
      this.setState({
        reloadChildren: true,
      });
    }, 0);
  }
  getChildContext() {
    return {
      forceReloadContent: this.forceReloadContent
    };
  }
  renderChildComponent(props, Component) {
    const {
      parentComponent,
    } = this.props;
    if (parentComponent) {
      const ParentComponent = parentComponent;
      return [
        <Component {...props}/>,
        <ParentComponent />
      ];
    }
    return (<Component {...props}/>);
  }
  getPermissions() {
    const {
      roleData: {
        permissions,
      },
    } = this.props;
    return _.map(permissions, per => per.name);
  }
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
                <LeftSideMenu location={props.location} permissions={this.getPermissions()}/>
              </div>
              <div
                className={`transparent-layer ${leftSidebarClassName}`}
                onClick={this.props.actions.toggleLeftMenu}
              />
              <div className={rightContentClassName}>
                <AnimationGroup
                  loading={loading || !this.state.reloadChildren}
                  errorLoading={errorLoading}
                />
                {
                  this.state.reloadChildren ? this.renderChildComponent(props, Component) : null
                }
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

PrivateRoute.defaultProps = {
  roleData: {
    permissions: [],
  },
  data: {
    user: {
      roles: []
    }
  }
}

PrivateRoute.childContextTypes = {
  forceReloadContent: PropTypes.func,
};

const mapStateToProps = (state) => ({
  roleRequesting: state.privateRouteReducers.get('roleDetail').get('requesting'),
  roleData: state.privateRouteReducers.get('roleDetail').get('data'),
  roleError: state.privateRouteReducers.get('roleDetail').get('error'),
  data: state.loginReducer.get('data'),
  leftMenuState: state.privateRouteReducers.get('leftMenuState'),
  loading: state.animationGroup.get('loading'),
  errorLoading: state.animationGroup.get('errorLoading'),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps, null, {
    pure: false,
  }
)(PrivateRoute));

export const reducers = {
  privateRouteReducers
};
