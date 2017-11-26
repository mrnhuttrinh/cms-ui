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
import FlatButton from 'material-ui/FlatButton';
import { Pagination } from '../../components';
import SearchField from './search';
import _ from 'lodash';

class DataTable extends React.Component {
  constructor() {
    super();
    this.onPageChangeFromPagination = this.onPageChangeFromPagination.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  componentWillMount() {
    this.props.getData({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  onPageChangeFromPagination(newPage) {
    this.props.getData({size: this.props.size, page: (newPage - 1)}, this.props.sort, this.props.search);
  }
  handleSortChange(index) {
    if (!this.props.sort) {
      return;
    }
    if (this.props.columns[index]) {
      const sortKey = this.props.columns[index].key;
      let sortType = 'ASC'
      if (this.props.sort.key === sortKey && this.props.sort.type === sortType) {
        sortType = 'DESC';
      }
      this.props.getData({size: this.props.size, page: this.props.page }, {key: sortKey, type: sortType}, this.props.search);
    }
  }
  handleSearchChange(search) {
    this.props.getData({size: this.props.size, page: this.props.page }, this.props.sort, search);
  }
  renderPagination() {
    if (!this.props.data || !this.props.dataAccesser(this.props.data).length) {
      return null;
    }
    const page = this.props.pageAccesser(this.props.data);
    const fromElement = page.number
      * page.size + 1;
    const toElement = fromElement + this.props.dataAccesser(this.props.data).length - 1;
    const totalElements = page.totalElements;
    const pageDescrition = (fromElement === toElement) ? `${fromElement} of ${totalElements}` : `${fromElement}-${toElement} of ${totalElements}`;
    return (<div style={{backgroundColor: '#fff', padding: '7px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>
      <span style={{float: 'left', lineHeight: '50px'}}>{pageDescrition}</span>
      <div style={{float: 'right', display: 'inline-block', lineHeight: '50px'}}>
        <Pagination
          currentPage={(page.number + 1)}
          totalPages={page.totalPages}
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
  renderTable() {
    const tableColumns = _.map(this.props.columns, (column, index) =>
      (this.props.sort && (this.props.sort.key === column.key)) ?
          (<TableHeaderColumn key={column.key}>
              <FlatButton
                id={index}
                label={column.text}
                labelPosition="before"
                primary={false}
                icon={<FontIcon className="material-icons">
                  {this.props.sort.type==='ASC'?'keyboard_arrow_down':'keyboard_arrow_up'}
                </FontIcon>}
                onClick={() => {this.handleSortChange(index);}}
              />
          </TableHeaderColumn>) :
          <TableHeaderColumn key={column.key} id={index}>
            <FlatButton
              id={index}
              label={column.text}
              labelPosition="before"
              primary={false}
              onClick={() => {this.handleSortChange(index);}}
            />
          </TableHeaderColumn>
    );
    const tableRows = this.props.data ? _.map(this.props.dataAccesser(this.props.data), (customer) => (
      <TableRow>
        {_.map(this.props.columns, (column) => (
          <TableRowColumn>
            {column.formater ? column.formater (_.get(customer, column.key)) : _.get(customer, column.key)}
          </TableRowColumn>))}
        <TableRowColumn style={{width: '30px'}}><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
      </TableRow>
    )) : [];
    return (<Table style={{color: 'rgba(0, 0, 0, 0.87)'}} onCellClick={this.props.handleCellClick} >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          {tableColumns}
          <TableHeaderColumn style={{width: '30px'}}></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows>
        {tableRows}
      </TableBody>
    </Table>);
  }

  renderSearch() {
    if (!this.props.search) {
      return null;
    }

    return (<SearchField
      columns={this.props.columns}
      search={this.props.search}
      onChange={this.handleSearchChange}
    />);
  }

  render() {
    return (
      <div>
        {this.renderSearch()}
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
  dataAccesser: PropsType.func,
  handleCellClick: PropsType.func,
}

DataTable.defaultProps = {
  boundaryPagesRange: 1,
  siblingPagesRange: 1,
  columns: [],
  sort: null,
  search: null,
  size: 10,
  page: 0,
  hidePreviousAndNextPageLinks: false,
  hideFirstAndLastPageLinks: true,
  hideEllipsis: false,
  data: null,
  dataAccesser: (data) => (data._embedded[Object.keys(data._embedded)[0]]),
  pageAccesser: (data) => (data.page),
};

export default DataTable;
