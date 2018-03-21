import React from 'react';
import Proptypes from 'prop-types';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import _ from 'lodash';
import { Col } from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { dateTimeFormatter } from '../../utils';

export const formaters = {
  date: (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A'),
  option: (key, options, t) => (t(options[key])),
};

class CanteenInvoice extends React.Component {
  render() {
    const {
      details: {
        receiptDate,
        details: data,
      }
    } = this.props;

    const tableColumns = _.map(this.props.columns, (column, index) => {
      return (<TableHeaderColumn key={column.key} id={index}>
        <FlatButton
          id={index}
          label={this.props.t(column.text)}
          labelPosition="before"
          primary={false}
        />
      </TableHeaderColumn>)
    });

    const tableRows = data ? _.map(data, (d) => (
        <TableRow>
          {_.map(this.props.columns, (column) => (
            <TableRowColumn>
              {column.formater ? column.formater(d, this.props.t) : formaters[column.type] ? formaters[column.type](_.get(d, column.key), column.options, this.props.t) : _.get(d, column.key)}
            </TableRowColumn>))}
        </TableRow>
      )) : [];

    return (
      <div style={{ width: '100%' }}>
        <Col md={6}>
          <TextField
            floatingLabelText={this.props.t('receipt date')}
            floatingLabelFixed
            value={dateTimeFormatter(receiptDate)}
          />
        </Col>
        <Col xs={12}>
          <Table
            wrapperStyle={{ height: '100%', backgroundColor: '#ececec', overflow: 'visible'}}
            style={{color: 'rgba(0, 0, 0, 0.87)'}}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                {tableColumns}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows>
              {tableRows}
            </TableBody>
          </Table>
        </Col>
      </div>

    );
  }
}

CanteenInvoice.propTypes = {
  details: Proptypes.shape({
    receiptDate: Proptypes.string,
    details: Proptypes.arrayOf(Proptypes.shape({}))
  })
};

CanteenInvoice.defaultProps = {
  columns: [
    {
      key: 'productName',
      text: 'Product name',
      sort: 'ASC',
    },
    {
      key: 'quantity',
      text: 'Quantity',
    },
    {
      key: 'unitPrice',
      text: 'Price',
    },
    {
      text: 'Total',
      formater: (data) =>  {return data.unitPrice * data.quantity;},
    },
  ],
  sort: {
    key: 'productName',
    type: 'ASC',
  },
};


export default translate('translations')(CanteenInvoice);
