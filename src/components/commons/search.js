import React from 'react';
import PropsType from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import _ from 'lodash';

const style = {
  height: '74px',
  backgroundColor: '#ffffff',
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.columns.indexOf(props.columns.filter((column) => (column.key === props.search.key))[0]),
      value: props.search.value,
    }
    this.changeSearchKey = this.changeSearchKey.bind(this);
    this.changeSearchValue = this.changeSearchValue.bind(this);
  }
  changeSearchKey(e, index) {
    const state = this.state;
    state.index = index;
    if (this.props.onChange) {
      this.props.onChange({
        key: this.props.columns[index].key,
        value: state.value,
      });
    }
    this.setState(state);
  }
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
          key: this.props.columns[this.state.index].key,
          value: this.state.value,
        });
      }
    }, 1500)
  }
  render() {
    if (!this.props.search) {
      return null;
    }
    const searchByOptions = _.map(this.props.columns, (column, index) => (<MenuItem value={index} primaryText={column.text} />));
    return (
      <Toolbar style={style}>
        <ToolbarGroup firstChild={true} />
        <ToolbarGroup>
          <SelectField
            floatingLabelText="Search by"
            value={this.state.index}
            autoWidth={true}
            onChange={this.changeSearchKey}
          >
            {searchByOptions}
            </SelectField>
          <TextField
            floatingLabelText="Search"
            hintText="Search"
            value={this.state.value}
            onChange={this.changeSearchValue}
          />
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
