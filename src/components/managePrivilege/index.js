import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManagePrivilegeListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser } from '../commons/table';
import { ContentWrapper } from '../commons';

import {
  ENUM_USER_STATUS,
} from '../../constants';

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
        title="Danh sách người dùng"
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
      text: 'TÊN',
      sort: 'ASC',
    }, {
      key: 'lastName',
      text: 'HỌ',
    }, {
      key: 'roles',
      text: 'NHÓM',
      formater: (roles) => {
        const firstRole = roles[0] || {};
        return firstRole.name;
      },
    }, {
      key: 'email',
      text: 'EMAIL',
    }, {
      key: 'username',
      text: 'TÊN ĐĂNG NHẬP',
    }, {
      key: 'enabled',
      text: 'TRẠNG THÁI',
      formater: (enabled) => {
        const status = enabled ? 'ACTIVE' : 'INACTIVE';
        return ENUM_USER_STATUS[status];
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
}
