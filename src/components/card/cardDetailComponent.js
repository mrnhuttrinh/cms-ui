import React from 'react';
import TextField from 'material-ui/TextField';
import { dateFormatter, dateTimeFormatter } from '../../utils';
import { Row, Col } from 'react-flexbox-grid';
import { translate } from 'react-i18next';

const Card = (props) => (<Row>
  <Col md={6}>
    <TextField
      floatingLabelText={props.t('Card code')}
      value={props.card.cardCode}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText={props.t('Type')}
      value={props.card.cardType.description}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText={props.t('Effective date')}
      value={dateFormatter(props.card.effectiveDate)}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText={props.t('Expiry date')}
      value={dateFormatter(props.card.expiryDate)}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText={props.t('Status')}
      value={props.t(props.card.status)}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText={props.t('Updated at')}
      value={dateTimeFormatter(props.card.updatedAt)}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
</Row>);
export default translate('translations')(Card);
