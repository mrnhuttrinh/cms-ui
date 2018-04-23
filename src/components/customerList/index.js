import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerListReducer from './reducers';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';
import { translate } from 'react-i18next';

const CUSTOMER_STATUS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
}

class CustomerList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    const user = dataAccesser(this.props.data)[indexRow];
    if (column === 6) {
      // click checkbox
      let status = user.status === CUSTOMER_STATUS.ACTIVE ? CUSTOMER_STATUS.DEACTIVE : CUSTOMER_STATUS.ACTIVE;
      this.props.actions.updateCustomerStatus(user.id, user.status);
    } else {
      this.props.history.push(`/customer/${user.id}`);
    }
  }
  refreshData() {
    this.props.actions.getData({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  columnDefine() {
    return [
      {
        key: 'firstName',
        text: 'first name',
        sort: 'ASC',
      }, {
        key: 'lastName',
        text: 'last name',
      }, {
        key: 'scmsMemberCode',
        text: 'member code',
      }, {
        key: 'title',
        text: 'title',
      }, {
        key: 'position',
        text: 'position',
      }, {
        key: 'dateBecameCustomer',
        text: 'effective date',
        type: TYPE.date,
      }, {
        key: 'status',
        text: 'status',
        type: TYPE.option,
        options: CUSTOMER_STATUS,
        formater: (d, t) => {
          const { updateCustomerStatus } = this.props;
          const userStatus = updateCustomerStatus.get(d.id);
          if (userStatus && userStatus.requesting) {
            return (
              <CircularProgress size={30} thickness={3} />
            );
          }
          let checked = d.status === CUSTOMER_STATUS.ACTIVE ? true : false;
          return (
            <Checkbox checked={checked} />
          );
        },
      }
    ];
  }
  render() {
    return (
      <ContentWrapper
        title="Customer list"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.columnDefine()}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getCustomer}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          style={{
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
          requesting={this.props.requesting}
        />
      </ContentWrapper>
    );
  }
}

CustomerList.defaultProps = {
  sort: {
    key: 'firstName',
    type: 'ASC',
  },
  search: {
    key: 'firstName',
  },
  data: null,
  size: 10,
};

const mapStateToProps = (state) => ({
  page: state.CustomerListReducer.get('page'),
  sort: state.CustomerListReducer.get('sort'),
  search: state.CustomerListReducer.get('search'),
  data: state.CustomerListReducer.get('data'),
  requesting: state.CustomerListReducer.get('requesting'),
  error: state.CustomerListReducer.get('error'),
  updateCustomerStatus: state.CustomerListReducer.get('updateCustomerStatus'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerList));

export const reducers = {
  CustomerListReducer,
};
