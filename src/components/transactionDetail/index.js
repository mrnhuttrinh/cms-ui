import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import { dateTimeFormatter } from '../../utils';

class TransactionDetail extends React.Component {
  renderDetails() {
    if (!this.props.transaction) {
      return null;
    }
    return (<Row>
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('transaction id')}
            floatingLabelFixed
            value={this.props.transaction.id}
          />
        </Col>
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('date time')}
            floatingLabelFixed
            value={dateTimeFormatter(this.props.transaction.date)}
          />
        </Col>
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('amount')}
            floatingLabelFixed
            value={this.props.transaction.amount}
          />
        </Col>
        <Col md={12}>
          <TextField
            floatingLabelText={this.props.t('details')}
            floatingLabelFixed
            value={this.props.transaction.transactionDetail.detail}
            fullWidth
          />
        </Col>

    </Row>);
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
