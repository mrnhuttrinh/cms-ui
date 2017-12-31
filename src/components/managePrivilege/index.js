import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManagePrivilegeListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser } from '../commons/table';
import { ContentWrapper } from '../commons';

class ManagePrivilegeList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/permission/${dataAccesser(this.props.data)[indexRow].id}`);
  }
  refreshData() {
    this.props.actions.getMerchants({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  render() {
    return (
      <ContentWrapper
        title="User list"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getUsers}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          requesting={this.props.requesting}
          style={{
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
        />
      </ContentWrapper>
    );
  }
}

ManagePrivilegeList.defaultProps = {
  columns: [
    {
      key: 'firstName',
      text: 'First name',
      sort: 'ASC',
    }, {
      key: 'lastName',
      text: 'Last name',
    }, {
      key: 'roles',
      text: 'Role',
      formater: (user, t) => {
        const firstRole = user.roles[0] || {};
        return t(firstRole.name);
      },
    }, {
      key: 'email',
      text: 'EMAIL',
    }, {
      key: 'username',
      text: 'User name',
    }, {
      key: 'enabled',
      text: 'Status',
      formater: (enabled, t) => {
        const status = enabled ? 'ACTIVE' : 'INACTIVE';
        return t(status);
      },
    }
  ],
  sort: {
    key: 'firstName',
    type: 'ASC',
  },
  search: {
    key: 'firstName',
  },
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.ManagePrivilegeListReducer.get('page'),
  sort: state.ManagePrivilegeListReducer.get('sort'),
  search: state.ManagePrivilegeListReducer.get('search'),
  data: state.ManagePrivilegeListReducer.get('data'),
  requesting: state.ManagePrivilegeListReducer.get('requesting'),
  error: state.ManagePrivilegeListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManagePrivilegeList);

export const reducers = {
  ManagePrivilegeListReducer,
};
