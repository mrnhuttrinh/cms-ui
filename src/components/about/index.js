import React, {Component} from 'react';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardActions, CardTitle} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';

import { DataTables } from '../commons';

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    sortable: true,
    style: {
      width: 250,
    }
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
    alignRight: true,
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
  },
];

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Eclair',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Cupcake',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Gingerbread',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Jelly bean',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Lollipop',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Donut',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'KitKat',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Eclair',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Cupcake',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Gingerbread',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Jelly bean',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Lollipop',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Donut',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'KitKat',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Eclair',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Cupcake',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Gingerbread',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Jelly bean',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Lollipop',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Donut',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'KitKat',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];

const TABLE_DATA_NEXT = [
  {
    name: 'Marshmallow',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];


class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePersonAddClick = this.handlePersonAddClick.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.onPageChangeFromPagination = this.onPageChangeFromPagination.bind(this);

    this.state = {
      data: Object.assign([], TABLE_DATA),
      page: 1,
    };
  }

  handleSortOrderChange(key, order) {
    this.setState({
      data: _.orderBy(this.state.data, d => d[key], [order])
    });
  }
  
  handleFilterValueChange(value) {
    console.log('filter value: ' + value);
    if (_.isEmpty(value)) {
      this.setState({
        data: TABLE_DATA,
      });
    } else {
      const data = _.filter(this.state.data, d => {
        return d.name.toLowerCase().search(value.toLowerCase()) >= 0 ||
          d.calories.toLowerCase().search(value.toLowerCase()) >= 0;
      });
      this.setState({
        data,
      });
    }
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick');
    this.setState({
      data: TABLE_DATA,
      page: 1,
    });
  }

  handleNextPageClick() {
    console.log('handleNextPageClick');
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    });
  }

  handlePersonAddClick() {
    console.log('handlePersonAddClick');
  }

  handleInfoClick() {
    console.log('handleInfoClick');
  }
  
  onPageChangeFromPagination(page) {
    console.log(page)
    this.setState({
      page,
    })
  }


  render() {
    return (
      <div>
        <Card
          style={{
            margin: 12,
            textAlign: 'left',
            backgroundColor: '#e8e8e8',
            border: 'rgba(0, 0, 0, 0.12) 1px'
          }}
        >
          <CardHeader
            style={{
              color: 'rgba(0, 0, 0, 0.4)',
            }}
            title='Danh sách khách hàng'
            titleStyle={{fontSize: 20}}
          >
            <CardActions style={{position: 'absolute', right: '0px', top: '-5px'}}>
              <MenuItem
                style={{
                  color: '#009688',
                  letterSpacing: '0px'
                }}
                leftIcon={
                  <FontIcon
                    style={{
                      color: '#009688',
                    }}
                    className="material-icons"
                  >refresh</FontIcon>}>
                  REFRESH
              </MenuItem>
            </CardActions>
          </CardHeader>
          <DataTables
            title={'Nutrition'}
            height={'auto'}
            selectable={false}
            showRowHover={true}
            columns={TABLE_COLUMNS_SORT_STYLE}
            data={this.state.data}
            page={this.state.page}
            showCheckboxes={false}
            showHeaderToolbar={true}
            onCellClick={this.handleCellClick}
            onCellDoubleClick={this.handleCellDoubleClick}
            onFilterValueChange={this.handleFilterValueChange}
            onSortOrderChange={this.handleSortOrderChange}
            onNextPageClick={this.handleNextPageClick}
            onPreviousPageClick={this.handlePreviousPageClick}
            count={this.state.data.length}
            onPageChangeFromPagination={this.onPageChangeFromPagination}
            rowSize={10}
          />
        </Card>
      </div>
    );
  }
}

export default Main;