import React from 'react';
import PropsType from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Pagination } from '../../components';
import _ from 'lodash';

class DataTable extends React.Component {
  constructor() {
    super();
    this.onPageChangeFromPagination = this.onPageChangeFromPagination.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }
  componentWillMount() {
    this.props.getData({size: this.props.size, page: this.props.page }, this.props.sort);
  }
  onPageChangeFromPagination(newPage) {
    this.props.getData({size: this.props.size, page: (newPage - 1)}, this.props.sort);
  }
  handleSortChange(index) {
    if (!this.props.sort) {
      return;
    }
    if (this.props.columns[index.target.id]) {
      const sortKey = this.props.columns[index.target.id].key;
      let sortType = 'ASC'
      if (this.props.sort.key === sortKey && this.props.sort.type === sortType) {
        sortType = 'DESC';
      }
      this.props.getData({size: this.props.size, page: this.props.page }, {key: sortKey, type: sortType});
    }
  }
  renderPagination() {
    if (this.props.data) {
      const fromElement = this.props.data.page.number
        * this.props.data.page.size + 1;
      const toElement = fromElement + this.props.data._embedded.customers.length - 1;
      const totalElements = this.props.data.page.totalElements;
      const pageDescrition = (fromElement === toElement) ? `${fromElement} of ${totalElements}` : `${fromElement}-${toElement} of ${totalElements}`;
      return (<div style={{backgroundColor: '#fff', padding: '7px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>
        <span style={{float: 'left', lineHeight: '50px'}}>{pageDescrition}</span>
        <div style={{float: 'right', display: 'inline-block', lineHeight: '50px'}}>
          <Pagination
            currentPage={(this.props.data.page.number + 1)}
            totalPages={this.props.data.page.totalPages}
            boundaryPagesRange={this.props.boundaryPagesRange}
            siblingPagesRange={this.props.siblingPagesRange}
            hidePreviousAndNextPageLinks={this.props.hidePreviousAndNextPageLinks}
            hideFirstAndLastPageLinks={this.props.hideFirstAndLastPageLinks}
            hideEllipsis={this.props.hideEllipsis}
            onChange={this.onPageChangeFromPagination}
          />
        </div>
        <div style={{clear: 'both'}} />
      </div>);
    }
    return null;
  }
  renderTable() {
    if (this.props.data) {
      const tableColumns = _.map(this.props.columns, (column, index) =>
        (this.props.sort && (this.props.sort.key === column.key)) ?
            (<TableHeaderColumn
                key={column.key}
                id={index}
              >
                <span style={{float: 'left', lineHeight: '58px'}}>{column.text}</span>
                <FontIcon style={{float: 'right', lineHeight: '58px'}} className="material-icons">
                  {this.props.sort.type==='ASC'?'keyboard_arrow_down':'keyboard_arrow_up'}
                </FontIcon>
            </TableHeaderColumn>) :
            <TableHeaderColumn key={column.key} id={index}><span>{column.text}</span></TableHeaderColumn>
      );
      const tableRows = _.map(this.props.data._embedded.customers, (customer) => (
        <TableRow>
          {_.map(this.props.columns, (column) => (
            <TableRowColumn>
              {column.formater ? column.formater (_.get(customer, column.key)) : _.get(customer, column.key)}
            </TableRowColumn>))}
          <TableRowColumn style={{width: '30px'}}><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
        </TableRow>
      ));
      return (<Table style={{color: 'rgba(0, 0, 0, 0.87)'}} onCellClick={this.props.handleCellClick} >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow onCellClick={this.handleSortChange}>
            {tableColumns}
            <TableHeaderColumn style={{width: '30px'}}></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {tableRows}
        </TableBody>
      </Table>);
    }
    return null;
  }
  render() {
    return (
      <div>
        {this.renderTable()}
        {this.renderPagination()}
      </div>
    );
  }
}

DataTable.propsType = {
  sort: PropsType.shape({
    key: PropsType.string,
    type: PropsType.string,
  }),
  getData: PropsType.func.isRequired,
  handleCellClick: PropsType.func,
}

DataTable.defaultProps = {
  boundaryPagesRange: 1,
  siblingPagesRange: 1,
  columns: [],
  sort: null,
  size: 10,
  page: 0,
  hidePreviousAndNextPageLinks: false,
  hideFirstAndLastPageLinks: true,
  hideEllipsis: false,
  data: null,
};

export default DataTable;
