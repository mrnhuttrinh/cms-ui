import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import ManagePrivilegeListReducer from './reducers';
import * as actions from './actions';
import DataTable from '../commons/table';

import {
  ENUM_USER_STATUS,
  ENUM_ROLE_TYPE
} from '../../constants';

class ManagePrivilegeList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/permission/${this.props.data._embedded.users[indexRow].id}`);
  }
  render() {
    return (
      <div style={{background: '#fff'}}>
        <AppBar
          title={<span style={{
              color: 'rgba(0, 0, 0, 0.4)',
            }}>Danh sách người dùng</span>}
          iconStyleLeft={{display: 'none'}}
          style={{
            backgroundColor: '#e8e8e8',
            border: 'rgba(0, 0, 0, 0.12) 1px'
          }}
          iconElementRight={
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
          }
        />
        <div style={{ padding: '20px 20px 20px 0px'}}>
          <TextField
            style={{float: 'right'}}
            hintText="Search"
            floatingLabelText="Search"
            floatingLabelFixed={true}
          />
          <div style={{clear: 'both'}} />
        </div>
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getCustomer}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
        />
      </div>
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
        return ENUM_ROLE_TYPE[firstRole.name];
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
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.ManagePrivilegeListReducer.get('page'),
  sort: state.ManagePrivilegeListReducer.get('sort'),
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
