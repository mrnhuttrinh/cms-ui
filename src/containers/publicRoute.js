import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import "./publicRoute.css";

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
          <Col xs={12} sm={6} md={6} lg={4} className="ecash-outside-form">
            <Component {...props}/>
          </Col>
          <Col xs={12} sm={6} md={6} lg={8} className="ecash-outside-picture">
            <div className="wrap-content">
              <div className="content">
                <div className="large-title">
                  Join Our Community
                </div>
                <div className="long-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                </div>
              </div>
            </div>
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
