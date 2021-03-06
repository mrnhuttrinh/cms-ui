import React from 'react';
import TextField from 'material-ui/TextField';
import { dateFormatter, dateTimeFormatter } from '../../utils';
import { Row, Col } from 'react-flexbox-grid';
import { translate } from 'react-i18next';

const Card = (props) => (<Row className="card-detail-component">
  <Col md={6} xs={6}>
    <TextField
      floatingLabelText={props.t('Card code')}
      value={props.card.cardCode}
      floatingLabelFixed
      readOnly
      fullWidth
    />
  </Col>
  <Col md={6} xs={6}>
    <TextField
      floatingLabelText={props.t('Type')}
      value={props.t(props.card.cardType.typeCode)}
      floatingLabelFixed
      readOnly
      fullWidth
    />
  </Col>
  <Col md={6} xs={6}>
    <TextField
      floatingLabelText={props.t('Effective date')}
      value={dateFormatter(props.card.effectiveDate)}
      floatingLabelFixed
      readOnly
      fullWidth
    />
  </Col>
  <Col md={6} xs={6}>
    <TextField
      floatingLabelText={props.t('Expiry date')}
      value={dateFormatter(props.card.expiryDate)}
      floatingLabelFixed
      readOnly
      fullWidth
    />
  </Col>
  <Col md={6} xs={6}>
    <TextField
      floatingLabelText={props.t('Status')}
      value={props.t(props.card.status)}
      floatingLabelFixed
      readOnly
      fullWidth
    />
  </Col>
  <Col md={6} xs={6}>
    <TextField
      floatingLabelText={props.t('Updated at')}
      value={dateTimeFormatter(props.card.updatedAt)}
      floatingLabelFixed
      readOnly
      fullWidth
    />
  </Col>
</Row>);
export default translate('translations')(Card);
