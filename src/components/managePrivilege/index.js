import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManagePrivilegeListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';

const USER_STATUS = {
  true: 'ACTIVE',
  false: 'DEACTIVE',
};

class ManagePrivilegeList extends React.Component {
  
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }
  componentWillMount() {
    this.props.actions.getRoleList();
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/permission/${dataAccesser(this.props.data)[indexRow].id}`);
  }
  refreshData() {
    this.props.actions.getMerchants({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  handleAddButtonClick(indexRow, column, event) {
    this.props.history.push('/permission/new-user');
  }
  prepareColumn() {
    const roleList = this.props.roleListData ? dataAccesser(this.props.roleListData) : [];
    const roleOptions = {};
    _.each(roleList, role => roleOptions[role.id] = role.name);
    return [
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
        type: TYPE.option,
        options: roleOptions,
        formater: (user, t) => {
          const {
            roleListData: {
              _embedded: {
                roles,
              },
            },
          } = this.props;
          const firstRole = user.roles[0];
          if (!_.isEmpty(firstRole)) {
            let roleId = firstRole;
            if (!_.isString(firstRole)) {
              roleId = firstRole.id;
            }
            const item = _.find(roles, role => role.id === roleId);
            if (item) {
              return t(item.name);
            }
          }
          return null;
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
        type: TYPE.option,
        options: USER_STATUS,
      },
    ];
  }
  render() {
    return (
      <ContentWrapper
        title="User list"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.prepareColumn()}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getUsers}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          requesting={this.props.requesting}
          addButton
          addButtonClick={this.handleAddButtonClick}
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
  sort: {
    key: 'firstName',
    type: 'ASC',
  },
  search: {
    key: 'firstName',
  },
  data: null,
  size: 10,
  roleListData: {
    _embedded: {
      roles: [],
    },
  },
}

ManagePrivilegeList.propTypes = {
  roleListData: PropTypes.object,
};

const mapStateToProps = (state) => {
  const roleList = state.ManagePrivilegeListReducer.get('roleList');
  return {
    page: state.ManagePrivilegeListReducer.get('page'),
    sort: state.ManagePrivilegeListReducer.get('sort'),
    search: state.ManagePrivilegeListReducer.get('search'),
    data: state.ManagePrivilegeListReducer.get('data'),
    requesting: state.ManagePrivilegeListReducer.get('requesting'),
    error: state.ManagePrivilegeListReducer.get('error'),
    // role list
    roleListRequesting: roleList.get('requesting'),
    roleListData: roleList.get('data'),
    roleListError: roleList.get('error'),
  };
};

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
