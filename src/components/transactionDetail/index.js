import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { dateTimeFormatter } from '../../utils';
import CanteenInvoice from './canteenInvoice';
import { parseStringToObjectJson } from '../../utils';

class TransactionDetail extends React.Component {
  renderDetails() {
    if (!this.props.transaction) {
      return null;
    }

    let transactionDetails = null;
    let detailsComponent = null

    try {
      transactionDetails = JSON.parse(this.props.transaction.transactionDetail.detail);
    } catch (err) {
    }

    if (transactionDetails && transactionDetails.invoiceType === 'canteen_invoice') {
      detailsComponent = (
        <CanteenInvoice
          details={transactionDetails.details}
        />
      );
    } else {
      detailsComponent = [(
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('Sender')}
            floatingLabelFixed
            readOnly
            value={_.get(transactionDetails, 'sender', '')}
            fullWidth
          />
        </Col>
      ), (
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('Teller')}
            floatingLabelFixed
            readOnly
            value={_.get(transactionDetails, 'teller', '')}
            fullWidth
          />
        </Col>
      ), (
        <Col md={12}>
          <TextField
            floatingLabelText={this.props.t('Detail')}
            floatingLabelFixed
            readOnly
            value={_.get(transactionDetails, 'detail', '')}
            fullWidth
          />
        </Col>
      )];
    }
    return [(
      <Row key="row-1">
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('transaction id')}
            floatingLabelFixed
            readOnly
            value={this.props.transaction.id}
          />
        </Col>
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('date time')}
            floatingLabelFixed
            readOnly
            value={dateTimeFormatter(this.props.transaction.date)}
          />
        </Col>
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('amount')}
            floatingLabelFixed
            readOnly
            value={this.props.transaction.amount}
          />
        </Col>
    </Row>
    ), (
        <Row key="row-2">
          {detailsComponent}
        </Row>
      )
    ];
  }

  render() {
    const actions = [
      <FlatButton
        label={this.props.t('Ok')}
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleClose}
      />,
    ];
    return (
      <Dialog
          title={this.props.t('Transaction Details')}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
        {this.renderDetails()}
      </Dialog>
    );
  }
}


export default translate('translations')(TransactionDetail);
