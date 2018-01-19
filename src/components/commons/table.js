import React from 'react';
import ReactDOM from 'react-dom';
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
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import moment from 'moment';
import { translate } from 'react-i18next';
import { Pagination } from '../../components';
import SearchField from './search';
import AnimationGroup from './animationGroup';


export const dataAccesser = (data) => {
  if (data._embedded) {
    return data._embedded[Object.keys(data._embedded)[0]];
  } else if (data.content) {
    return data.content;
  } else {
    return [];
  }
};
export const pageAccesser = (data) => (data.page);

export const TYPE = {
  date: 'date',
  option: 'option',
}

export const formaters = {
  date: (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A'),
  option: (key, options, t) => (t(options[key])),
};

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDisplay: props.columns.length,
    };
    this.onPageChangeFromPagination = this.onPageChangeFromPagination.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  componentWillMount() {
    if (!this.props.search && !this.props.getData) {
      this.props.getData({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
    }
  }
  componentDidMount () {
    // first load
    this._handleWindowResize();
    // register event
    window.addEventListener('resize', this._handleWindowResize.bind(this));
  }
  componentWillUnmount() {
    // remove event
    window.removeEventListener('resize', this._handleWindowResize.bind(this));
  }
  _getDisplayColumnFollowByActualWidth(actualWidth) {
    let columnDisplay = 0;
    if (actualWidth < 320) {
      columnDisplay = 1;
    } else if (actualWidth < 480) {
      columnDisplay = 2;
    } else if (actualWidth < 576) {
      columnDisplay = 3;
    } else if (actualWidth < 768) {
      columnDisplay = 4;
    } else if (actualWidth < 992) {
      columnDisplay = 5;
    } else {
      columnDisplay = this.props.columns.length;
    }
    this.setState({
      columnDisplay,
    })
  }
  _handleWindowResize () {
    if (this.dataTableWrapper) {
      const element = ReactDOM.findDOMNode(this.dataTableWrapper);
      if (element && element.offsetWidth) {
        this._getDisplayColumnFollowByActualWidth(element.offsetWidth)
      }
    }
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
    // Trim value
    _.forIn(search, function(value, key) {
      if (typeof value === 'string') {
        search[key] = value.trim();
      }
    });
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
    const pageDescrition = (fromElement === toElement) ? `${fromElement} ${this.props.t('of')} ${totalElements}` : `${fromElement}-${toElement} ${this.props.t('of')} ${totalElements}`;
    return (<div style={{backgroundColor: '#fff', padding: '7px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>
      <span style={{float: 'left', lineHeight: '50px'}}>{pageDescrition}</span>
      <div style={{float: 'right', display: 'inline-block', lineHeight: '50px'}}>
        <Pagination
          currentPage={(page.number + 1)}
          totalPages={page.totalPages}
          boundaryPagesRange={this.props.boundaryPagesRange}
          siblingPagesRange={this.props.siblingPagesRange}
          hidePreviousAndNextPageLinks={this.props.hidePreviousAndNextPageLinks || this.state.columnDisplay <= 4}
          hideFirstAndLastPageLinks={this.props.hideFirstAndLastPageLinks || this.state.columnDisplay <= 3}
          hideEllipsis={this.props.hideEllipsis}
          onChange={this.onPageChangeFromPagination}
        />
      </div>
      <div style={{clear: 'both'}} />
    </div>);
  }
  renderTable() {
    const tableColumns = _.map(this.props.columns, (column, index) => {
      if (index < this.state.columnDisplay) {
        return (this.props.sort && (this.props.sort.key === column.key)) ? (
            <TableHeaderColumn key={column.key}>
              <FlatButton
                id={index}
                label={this.props.t(column.text)}
                labelPosition="before"
                primary={false}
                icon={<FontIcon className="material-icons">
                  {this.props.sort.type==='ASC'?'keyboard_arrow_down':'keyboard_arrow_up'}
                </FontIcon>}
                onClick={() => {this.handleSortChange(index);}}
              />
            </TableHeaderColumn>
          ) : (
            <TableHeaderColumn key={column.key} id={index}>
              <FlatButton
                id={index}
                label={this.props.t(column.text)}
                labelPosition="before"
                primary={false}
                onClick={() => {this.handleSortChange(index);}}
              />
            </TableHeaderColumn>
          )
      }
      return null;
    });

    const tableRows = this.props.data ? _.map(this.props.dataAccesser(this.props.data), (d) => (
      <TableRow>
        {
          _.map(this.props.columns, (column, index) => {
            if (index < this.state.columnDisplay) {
              return (
                  <TableRowColumn>
                    {column.formater ? column.formater(d, this.props.t) : formaters[column.type] ? formaters[column.type](_.get(d, column.key), column.options, this.props.t) : _.get(d, column.key)}
                  </TableRowColumn>
                );
            }
            return null;
          })
        }
      </TableRow>
    )) : [];

    let wrapperMinusHeight = 0;
    if (this.props.data && this.props.dataAccesser(this.props.data).length) {
      wrapperMinusHeight += 56;
    }
    if (this.props.search) {
      wrapperMinusHeight += 74;
    }
    let wrapperHeight = '100%';
    if (wrapperMinusHeight > 0) {
      wrapperHeight = `calc(100% - ${wrapperMinusHeight}px)`;
    }
    return (
      <Table
          wrapperStyle={{ height: wrapperHeight, backgroundColor: '#ececec'}}
          style={{color: 'rgba(0, 0, 0, 0.87)'}}
          onCellClick={this.props.handleCellClick}
          bodyStyle={{
            overflowX: 'visible',
            overflowY: 'visible'
          }}
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
    );
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

  renderAddButton() {
    if (this.props.addButton) {
      return (
        <RaisedButton
          label={this.props.t(this.props.addButtonText)}
          style={Object.assign({
            margin: '30px',
            marginLeft: '15px',
            position: 'absolute'
          }, this.props.addButtonStyles)}
          backgroundColor="#009688"
          labelColor="#fff"
          onClick={this.props.addButtonClick}
        />
      );
    }
    return null;
  }
  render() {
    console.log(this.state.columnDisplay)
    return (
      <div
        ref={element => this.dataTableWrapper = element}
        style={Object.assign({}, {
            position: 'relative',
          }, this.props.style
        )}
      >
        <div style={{height: '100%'}}>
          {this.renderAddButton()}
          {this.renderSearch()}
          {this.renderTable()}
          {this.renderPagination()}
        </div>
        <AnimationGroup
          loading={this.props.requesting}
          style={{
            backgroundColor: 'transparent'
          }}
        />
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
  addButton: PropsType.bool,
  addButtonClick: PropsType.func,
  addButtonText: PropsType.string,
  addButtonStyles: PropsType.object,
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
  dataAccesser,
  pageAccesser,
  addButton: false,
  addButtonText: 'Add',
  addButtonStyles: {},
};

export default translate('translations')(DataTable);
