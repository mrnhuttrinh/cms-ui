import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, getFormValues, getFormSyncErrors} from 'redux-form'; 
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import {
  TextField,
  SelectField,
} from '../../commons';

import { DetailsList } from './constants';


const validate = values => {
  const errors = {};
  if (_.isEmpty(values.amount)) {
    errors.amount = 'Amount not empty';
  } else {
    if ((values.amount + '').indexOf('e') !== -1) {
      errors.amount = 'Amount not match';
    }
  }
  if (_.isEmpty(values.sender)) {
    errors.sender = 'Sender not empty';
  }
  if (_.isEmpty(values.detail)) {
    errors.detail = 'Detail not empty';
  }
  if (_.isEmpty(values.type)) {
    errors.type = 'Type not empty';
  }
  if (_.isEmpty(values.card)) {
    errors.card = 'Card not empty';
  }
  if (!_.isEmpty(values.type) && values.type === DetailsList.OTHER) {
    if (_.isEmpty(values.detailOther)) {
      errors.detailOther = 'Detail other not empty';
    }
  }
  return errors;
}

class DepositForm extends React.Component {
  renderDetailOther() {
    const {
      values
    } = this.props;
    if (values && values.type && values.type === DetailsList.OTHER) {
      const { errors = {} } = this.props;
      return (
        <Field
          name="detailOther"
          type="text"
          component={TextField}
          label={this.props.t('Others')}
          fullWidth
          errorText={this.props.t(errors.detailOther)}
        />
      );
    }
    return null;
  }
  getItemStatus() {
    const itemsStatus = _.map(DetailsList, (key, value) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return itemsStatus;
  }
  getItemCard() {
    const {
      cardData = {}
    } = this.props;
    const {
      _embedded = {}
    } = cardData;
    const {
      cards = [],
    } = _embedded;
    const itemsCard = _.map(cards, (card) => (<MenuItem value={card.cardNumber} primaryText={card.cardNumber} />));
    return itemsCard;
  }
  render () {
    const { errors = {}} = this.props;
    this.renderDetailOther();
    
    return (
      [
        (<Row>
          <Col md={7} xs={12}>
            <Field
              name="amount"
              type="number"
              min={0}
              component={TextField}
              label={this.props.t('Amount')}
              fullWidth
              errorText={this.props.t(errors.amount)}
            />
          </Col>
        </Row>),
        (<Row>
          <Col md={6} xs={12}>
            <Field
              name="sender"
              type="text"
              component={TextField}
              label={this.props.t('Sender')}
              fullWidth
              errorText={this.props.t(errors.sender)}
            />
          </Col>
          <Col md={6} xs={12}>
            <Field
              name="card"
              type="text"
              component={SelectField}
              label={this.props.t('Card')}
              children={this.getItemCard()}
              fullWidth
              errorText={this.props.t(errors.card)}
            />
          </Col>
          <Col md={6} xs={12}>
            <Field
              name="type"
              component={SelectField}
              label={this.props.t('Type')}
              children={this.getItemStatus()}
              fullWidth
              errorText={this.props.t(errors.type)}
            />
          </Col>
          <Col md={6} xs={12}>
            {this.renderDetailOther()}
          </Col>
          <Col md={12} xs={12}>
            <Field
              name="detail"
              type="text"
              component={TextField}
              label={this.props.t('Detail')}
              multiLine={true}
              rows={3}
              fullWidth
              errorText={this.props.t(errors.detail)}
            />
          </Col>
        </Row>
        )
      ]
    );
  }
}

DepositForm.propTypes = {};

DepositForm.defaultProps = {};

const mapStateToProps = (state) => ({
  cardData: state.AccountCardsReducer.get('cards'),
  cardRequesting: state.AccountCardsReducer.get('requesting'),
  cardError: state.AccountCardsReducer.get('error'),
  values: getFormValues('depositToAccount')(state),
  errors: getFormSyncErrors('depositToAccount')(state),
  initialValues: {
    type: DetailsList.DEFAULT,
  }
});

export default connect(mapStateToProps)(reduxForm({
  form: 'depositToAccount',
  validate,
})(connect(mapStateToProps)(translate('translations')(DepositForm))));
