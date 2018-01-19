import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import "./index.css";

class PublicRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    if (this.props.data && this.props.data.credential) {
      return (
        <Route {...rest} render={props => (
          <Redirect
            to={{
              pathname: '/',
              state: { from: this.props.location }
            }}
          />
        )} />
      );
    }

    return <Route {...rest} render={props => (
      <Grid fluid className="ecash-outside">
        <Row>
          <Col xs={12} sm={12} md={6} lg={4} className="ecash-outside-form">
            <Component {...props}/>
          </Col>
          <Col xs={12} sm={12} md={6} lg={8} className="ecash-outside-picture">
            <div className="wrap-content" />
          </Col>
        </Row>
      </Grid>
    )} />
  };
}

const mapStateToProps = (state) => ({
  data: state.loginReducer.get('data'),
});

export default withRouter(connect(
  mapStateToProps, null, null, {
    pure: false,
  }
)(PublicRoute));
