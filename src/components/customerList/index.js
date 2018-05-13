import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import CustomerListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';
import { translate } from 'react-i18next';
import FontIcon from 'material-ui/FontIcon';
import DialogDeleteConfirm from './DialogDeleteConfirm';
import DialogEnableConfirm from './DialogEnableConfirm';

import './styles.scss';

const CUSTOMER_STATUS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
}

class CustomerList extends React.Component {
  constructor() {
    super();
    this.state = {
      showDialogs: null,
      selectUser: null,
    };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.onClickActions = this.onClickActions.bind(this);
    this.setDialog = this.setDialog.bind(this);
    this.onDeleteCustomer = this.onDeleteCustomer.bind(this);
  }
  getPrepareColumn() {
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
        formater: (data, t) => {
          const iconName = data.status === CUSTOMER_STATUS.ACTIVE ? 'delete' : 'play_arrow';
          return (
            <div className="group-controls">
              <span>{t(data.status)}</span>
              <div
                className="actions"
                onClick={(event) => this.onClickActions(event, data)}
              ><FontIcon className="material-icons">{iconName}</FontIcon></div>
            </div>
          );
        }
      }
    ];
  }
  getPropsUpdateCustomerStatus() {
    const { updateCustomerStatus } = this.props;
    const { selectUser } = this.state;
    if (selectUser) {
      return updateCustomerStatus.get(selectUser.id) || {};
    }
    return {};
  }
  setDialog(name, selectUser) {
    this.setState({
      showDialogs: name,
      selectUser
    });
  }
  onClickActions(event, data) {
    event.stopPropagation();
    event.preventDefault();
    if (data.status === CUSTOMER_STATUS.ACTIVE) {
      this.setDialog('DialogDeleteConfirm', data);
    } else {
      this.setDialog('DialogEnableConfirm', data);
    }
  }
  onDeleteCustomer() {
    const { selectUser } = this.state;
    this.props.actions.updateCustomerStatus(selectUser).then(() => {
      // if (!this.getPropsUpdateCustomerStatus().get('error')) {
      //   this.refreshData();
      // }
      this.setDialog(null, null);
    });
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/customer/${dataAccesser(this.props.data)[indexRow].id}`);
  }
  refreshData() {
    this.props.actions.getCustomer({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  handleAddButtonClick(indexRow, column, event) {
    this.props.history.push('/customer/new-customer');
  }
  render() {
    return (
      <ContentWrapper
        title="Customer list"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          className="customer-list-table"
          columns={this.getPrepareColumn()}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getCustomer}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          addButton
          addButtonClick={this.handleAddButtonClick}
          style={{
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
          requesting={this.props.requesting}
        />
        <DialogDeleteConfirm
          onClickCloseDialog={this.setDialog}
          openDialog={this.state.showDialogs === 'DialogDeleteConfirm'}
          deleteCustomer={this.onDeleteCustomer}
          requesting={this.getPropsUpdateCustomerStatus().requesting}
        />
        <DialogEnableConfirm
          onClickCloseDialog={this.setDialog}
          openDialog={this.state.showDialogs === 'DialogEnableConfirm'}
          deleteCustomer={this.onDeleteCustomer}
          requesting={this.getPropsUpdateCustomerStatus().requesting}
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
