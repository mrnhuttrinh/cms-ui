import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import { translate } from 'react-i18next';

import { AnimationGroup } from '../commons';

import * as actions from './actions';

const formatDate = (date) => (date ? moment(date).format('h:mm:ss DD/MM/YYYY') : 'N/A');
class UserInformation extends React.Component {
  render () {
    const {
      userData = {
        user: {}
      }
    } = this.props;
    const data = userData.user || {
      roles: [],
    };
    const firstRole = data.roles[0] || {};
    return (
      <Row className="userRowContainer">
        <Col md={12}>
          <Row>
            <Col md={7} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Last name')}
                floatingLabelFixed
                fullWidth
                value={data.lastName}
              />
            </Col>
            <Col md={5} xs={12}>
              <TextField
                floatingLabelText={this.props.t('First name')}
                floatingLabelFixed
                fullWidth
                value={data.firstName}
              />
            </Col>
            <Col md={7} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Email')}
                floatingLabelFixed
                fullWidth
                value={data.email}
              />
            </Col>
            <Col md={5} xs={12}>
              <TextField
                floatingLabelText={this.props.t('User name')}
                floatingLabelFixed
                fullWidth
                value={data.username}
              />
            </Col>
            <Col md={5} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Role')}
                floatingLabelFixed
                fullWidth
                value={this.props.t(firstRole.name)}
              />
            </Col>
            <Col md={7} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Last login')}
                floatingLabelFixed
                fullWidth
                floatingLabelStyle={{whiteSpace: 'nowrap'}}
                value={formatDate(data.lastLogin)}
              />
            </Col>
          </Row>
        </Col>
        <AnimationGroup
          loading={this.props.requesting}
          errorLoading={this.props.error ? true : false}
        />
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.get('data')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInformation));
