import React from 'react';
import PropsType from 'prop-types';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import _ from 'lodash';
import moment from 'moment';
import { dateFormatter } from '../../utils';

const style = {
  height: '74px',
  backgroundColor: '#ffffff',
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.search.key || this.props.columns[0].key,
      value: props.search.value,
    }
    this.changeSearchKey = this.changeSearchKey.bind(this);
    this.changeSearchValue = this.changeSearchValue.bind(this);
    this.changeSearchWithType = this.changeSearchWithType.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
  }
  componentWillMount() {
    this.changeSearchKey(null, null, this.state.key);
  }
  changeSearchKey(e, index, key) {
    const currentColumn = this.props.columns.filter((column) => (column.key === this.state.key))[0];
    const nextColumn = this.props.columns.filter((column) => (column.key === key))[0];
    let value = null;
    // text
    if (!nextColumn.type && !currentColumn.type) {
      value = this.state.value;
    } else if (nextColumn.type === 'option') {
      value = Object.keys(nextColumn.options)[0];
    } else if (nextColumn.type === 'date') {
      value = [moment().subtract('years', 1).format('M/D/YYYY'), moment().format('M/D/YYYY')];
    }
    this.setState({
      key,
      value,
    });
    this.props.onChange({
      key: key,
      value: value,
    });
  }
  /**
  ** Change Search Text Field Type
  **/
  changeSearchValue(e, value) {
    this.setState({
      value,
    });
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange({
          key: this.state.key,
          value: this.state.value,
        });
      }
    }, 1500)
  }
  /**
  ** Change Search other Type
  **/
  changeSearchWithType(e, index, value) {
    this.setState({
      value,
    });
    this.props.onChange({
      key: this.state.key,
      value,
    });
  }
  /**
  ** Change Search Date Type
  **/
  handleChangeDate(value) {
    this.changeSearchWithType(null, null, value);
  }
  /**
  ** Change Start Date
  **/
  handleChangeStartDate(e, date) {
    const value = [moment(date).format('M/D/YYYY'), this.state.value[1]];
    this.handleChangeDate(value);
  }
  /**
  ** Change End Date
  **/
  handleChangeEndDate(e, date) {
    const value = [this.state.value[0], moment(date).format('M/D/YYYY')];
    this.handleChangeDate(value);
  }

  renderSearchField() {
    let searchField;
    const currentColumn = this.props.columns.filter((column) => (column.key === this.state.key))[0];
    switch (currentColumn.type) {
      case 'option':
        searchField = (<SelectField
          floatingLabelText="Search"
          value={this.state.value}
          autoWidth={true}
          onChange={this.changeSearchWithType}
        >
          {_.map(currentColumn.options, (value, key) => (<MenuItem value={key} primaryText={value} />))}
        </SelectField>);
        break;
      case 'date':
        const startDate = moment(this.state.value[0], "M/D/YYYY").toDate();
        const endDate = moment(this.state.value[1], "M/D/YYYY").toDate();
        searchField = [
            (<DatePicker
              floatingLabelText="Từ ngày"
              value={startDate}
              onChange={this.handleChangeStartDate}
              autoOk
              formatDate={dateFormatter}
              maxDate={endDate}
            />),
            (<DatePicker
              floatingLabelText="Đến ngày"
              value={endDate}
              onChange={this.handleChangeEndDate}
              autoOk
              formatDate={dateFormatter}
              minDate={startDate}
              maxDate={new Date()}
            />)
          ];
        break;
      default:
        searchField = (<TextField
          floatingLabelFixed={true}
          floatingLabelText="Tìm kiếm"
          hintText="Tìm kiếm"
          value={this.state.value}
          onChange={this.changeSearchValue}
        />);
    }
    return searchField;
  }
  render() {
    if (!this.props.search) {
      return null;
    }
    const searchByOptions = _.map(this.props.columns, (column) => (<MenuItem value={column.key} primaryText={column.text} />));
    return (
      <Toolbar style={style}>
        <ToolbarGroup firstChild={true} />
        <ToolbarGroup>
          <SelectField
            floatingLabelText="Tìm theo"
            value={this.state.key}
            autoWidth={true}
            onChange={this.changeSearchKey}
          >
            {searchByOptions}
          </SelectField>
          {this.renderSearchField()}
        </ToolbarGroup>
      </Toolbar>);
  }
}

Search.propsType = {
  search: PropsType.shape({
    key: PropsType.string,
    type: PropsType.string,
  }),
  columns: PropsType.arrayOf({}),
}

Search.defaultProps = {
  columns: [],
  search: null,
};

export default Search;
