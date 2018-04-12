import React from 'react';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { dateTimeFormatter } from '../../../utils';

const cardStyle = {
  padding: 10,
  marginBottom: 5,
  marginTop: 5,
};

const titleStyle = {
  fontSize: '16px',
  color: '#00897b',
  paddingLeft: 0,
}


class Application extends React.Component {
  render() {
    const {
      application = {}
    } = this.props;
    return (
      <Card style={cardStyle}>
        <Row>
          <Col md={12} xs={12}>
            <CardTitle style={titleStyle}>
              {application.name}
            </CardTitle>
          </Col>
        </Row>
        <Row>
          <Col md={8} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Code number')}
              floatingLabelFixed
              readOnly
              fullWidth
              value={application.id}
            />
          </Col>
          <Col md={4} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Type')}
              floatingLabelFixed
              readOnly
              fullWidth
              value={this.props.t('Default')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Security code')}
              floatingLabelFixed
              readOnly
              fullWidth
              value={application.pubKey}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Status')}
              floatingLabelFixed
              readOnly
              fullWidth
              value={this.props.t(application.status)}
            />
          </Col>
          <Col md={4} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Date of expiry')}
              floatingLabelFixed
              readOnly
              fullWidth
              value={dateTimeFormatter(application.pubKeyExpireDate)}
            />
          </Col>
          <Col md={4} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Updated at')}
              floatingLabelFixed
              readOnly
              fullWidth
              value={dateTimeFormatter(application.updatedAt || application.createdAt)}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default translate('translations')(Application);
