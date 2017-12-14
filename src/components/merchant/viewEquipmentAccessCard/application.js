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
          <Col md={12}>
            <CardTitle style={titleStyle}>
              {application.name}
            </CardTitle>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <TextField
              floatingLabelText={this.props.t('Code number')}
              floatingLabelFixed
              fullWidth
              value={application.id}
            />
          </Col>
          <Col md={4}>
            <TextField
              floatingLabelText={this.props.t('Type')}
              floatingLabelFixed
              fullWidth
              value={this.props.t('Default')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TextField
              floatingLabelText={this.props.t('Security code')}
              floatingLabelFixed
              fullWidth
              value={application.pubKey}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <TextField
              floatingLabelText={this.props.t('Status')}
              floatingLabelFixed
              fullWidth
              value={this.props.t(application.status)}
            />
          </Col>
          <Col md={4}>
            <TextField
              floatingLabelText={this.props.t('Date of expiry')}
              floatingLabelFixed
              fullWidth
              value={dateTimeFormatter(application.pubKeyExpireDate)}
            />
          </Col>
          <Col md={4}>
            <TextField
              floatingLabelText={this.props.t('Updated at')}
              floatingLabelFixed
              fullWidth
              value={dateTimeFormatter(application.updatedAt || application.createdAt)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              border: 'solid 1px #009688'
            }}
            backgroundColor="#fff"
            labelStyle={{
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.5px',
              color: '#009688'
            }}
            label={this.props.t('View details')} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default translate('translations')(Application);
