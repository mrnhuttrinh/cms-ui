import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

class PrivateRoute extends React.Component{
  render() {
    const { component: Component, ...rest } = this.props;
    if (this.props.data && this.props.data.credential) {
      return (
        <Route {...rest} render={props => (
          <div>
            <div>
              <AppBar title={<span>App inside</span>} />
            </div>
            <div>
              <Component {...props}/>
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
