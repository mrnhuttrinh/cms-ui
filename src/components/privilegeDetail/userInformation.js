import React from 'react';
import { translate } from 'react-i18next';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';

const formatDate = (date) => (date ? moment(date).format('h:mm:ss DD/MM/YYYY') : 'N/A');
class UserInformation extends React.Component  {
  render () {
    const {
      userData = {
        roles: [],
      }
    } = this.props;
    const status = userData.enabled ? 'ACTIVE' : 'INACTIVE';
    const firstRole = userData.roles[0] || {};
    return (
      <Row>
        <Col md={7} ms={12}>
          <TextField
            floatingLabelText={this.props.t('Last name')}
            floatingLabelFixed
            fullWidth
            value={userData.firstName}
          />
        </Col>
        <Col md={5} ms={12}>
          <TextField
            floatingLabelText={this.props.t('First name')}
            floatingLabelFixed
            fullWidth
            value={userData.lastName}
          />
        </Col>
        <Col md={7} ms={12}>
          <TextField
            floatingLabelText={this.props.t('Email')}
            floatingLabelFixed
            fullWidth
            value={userData.email}
          />
        </Col>
        <Col md={5} ms={12}>
          <TextField
            floatingLabelText={this.props.t('User name')}
            floatingLabelFixed
            fullWidth
            value={userData.username}
          />
        </Col>
        <Col md={12} ms={12}>
          <TextField
            floatingLabelText={this.props.t('Role')}
            floatingLabelFixed
            fullWidth
            value={this.props.t(firstRole.name)}
          />
        </Col>
        <Col md={6} ms={12}>
          <TextField
            floatingLabelText={this.props.t('Status')}
            floatingLabelFixed
            fullWidth
            value={this.props.t(status)}
          />
        </Col>
        <Col md={6} ms={12}>
          <TextField
            floatingLabelText={this.props.t('Last login')}
            floatingLabelFixed
            fullWidth
            floatingLabelStyle={{whiteSpace: 'nowrap'}}
            value={formatDate(userData.lastLogin)}
          />
        </Col>
      </Row>
    );
  }
}

export default translate('translations')(UserInformation);
