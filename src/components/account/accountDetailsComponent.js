import React from 'react';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import { Row, Col } from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import { dateFormatter, dateTimeFormatter } from '../../utils';


const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

const AccoutDetailsComponent = (props) => (
  <Row>
    <Col md={6}>
      <span style={titleStyle}>
        {props.t('Account information')}
      </span>
      <GridList
        cols={12}
        padding={5}
        cellHeight={56}
      >
        <TextField
          floatingLabelText={props.t('Account ID')}
          value={props.account.id}
          floatingLabelFixed
          readOnly
          cols={8}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Type')}
          value={props.t(props.account.accountType.typeCode)}
          floatingLabelFixed
          readOnly
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Account name')}
          value={props.account.accountName}
          floatingLabelFixed
          readOnly
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Date opened')}
          value={dateFormatter(props.account.dateOpened)}
          floatingLabelFixed
          readOnly
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Date closed')}
          value={dateFormatter(props.account.dateClosed)}
          floatingLabelFixed
          readOnly
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Currency')}
          value={props.account.currencyCode.text}
          floatingLabelFixed
          readOnly
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Status')}
          value={props.t(props.account.status)}
          floatingLabelFixed
          readOnly
          cols={8}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Current balance')}
          value={props.account.currentBalance}
          floatingLabelFixed
          readOnly
          cols={6}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Updated at')}
          value={dateTimeFormatter(props.account.updatedAt)}
          floatingLabelFixed
          readOnly
          cols={6}
          fullWidth
        />
      </GridList>
    </Col>
    <Col md={6}>
      <span style={titleStyle}>{props.t('Plan')}</span>
      <GridList
        padding={5}
        cellHeight={56}
        cols={1}
      >
        <TextField
          floatingLabelText={props.t('Name')}
          value={props.t(props.account.plan.planType.typeCode)}
          floatingLabelFixed
          readOnly
          cols={1}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Detail')}
          value={props.account.plan.id}
          floatingLabelFixed
          readOnly
          cols={1}
          fullWidth
        />
      </GridList>
    </Col>
  </Row>);

export default translate('translations')(AccoutDetailsComponent);
