import React from 'react';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import { Row, Col } from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import { dateFormatter, dateTimeFormatter } from '../../utils';
import { STATUS } from './constants';


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
          floatingLabelFixed={true}
          cols={8}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Type')}
          value={props.account.accountType.description}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Account name')}
          value={props.account.accountName}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Date opened')}
          value={dateFormatter(props.account.dateOpened)}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Date closed')}
          value={dateFormatter(props.account.dateClosed)}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Currency')}
          value={props.account.currencyCode.text}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Status')}
          value={props.t(props.account.status)}
          floatingLabelFixed={true}
          cols={8}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Current balance')}
          value={props.account.currentBalance}
          floatingLabelFixed={true}
          cols={6}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Updated at')}
          value={dateTimeFormatter(props.account.updatedAt)}
          floatingLabelFixed={true}
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
          value={props.account.plan.planType.description}
          floatingLabelFixed={true}
          cols={1}
          fullWidth
        />
        <TextField
          floatingLabelText={props.t('Detail')}
          value={props.account.plan.id}
          floatingLabelFixed={true}
          cols={1}
          fullWidth
        />
      </GridList>
    </Col>
  </Row>);

export default translate('translations')(AccoutDetailsComponent);
