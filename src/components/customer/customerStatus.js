import React from 'react';
import {Field } from 'redux-form';
import Subheader from 'material-ui/Subheader';
import { translate } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';
import {
  TextField,
  FieldValidator,
  DatePicker,
  SelectField,
} from '../commons';
import { dateTimeFormatter } from '../../utils'; 
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '20px',
  color: '#00897b',
  marginTop: 20,
}


const CUSTOMER_STATUS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
}


class CustomerStatus extends React.PureComponent {
  getItemCustomerStatus() {
    const itemsStatus = _.map(CUSTOMER_STATUS, (value, key) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return itemsStatus;
  }
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <div
              cols={2}
              style={titleStyle}>
              {this.props.t('Customer status')}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Field
              name="customer.status"
              floatingLabelText={this.props.t('Status')}
              floatingLabelFixed
              cols={4}
              fullWidth
              component={SelectField}
              children={this.getItemCustomerStatus()}
              label={this.props.t('Status')}
              validate={[FieldValidator.required]}
            />
          </Col>
          <Col md={6}>
            <Field
              name="customer.updatedAt"
              floatingLabelText={this.props.t('Updated at')}
              floatingLabelFixed
              cols={2}
              fullWidth
              component={DatePicker}
              label={this.props.t('Updated at')}
              autoOk
              disabled
              DateTimeFormat={dateTimeFormatter}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default translate('translations')(CustomerStatus);