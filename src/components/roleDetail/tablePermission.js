import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'react-i18next';
import * as actions from './actions';
import DataTable, { dataAccesser } from '../commons/table';
import AddPermissionDialog from './addPermissionDialog';

import {
  groupControl,
  tablePermission,
} from './styles';

class TablePermission extends React.Component {
  columns = [
    {
      key: 'displayName',
      text: 'Permission Name',
      sort: 'ASC',
    },
    {
      key: 'name',
      text: 'Group',
    },
    {
      key: 'delete_action',
      text: 'DELETE',
      formater: (data, t) => {
        return (<FlatButton
          style={{
            boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
          }}
          backgroundColor="#b93221"
          labelStyle={{color: '#fff'}}
          onClick={() => this.setState({deleting: true})}
          label={t('DELETE')}
        />);
      }
    }
  ]
  constructor(props) {
    super(props);
    this.state = {
      openAddPermissionDialog: false,
      deleting: false,
    };
    this.getData = this.getData.bind(this);
    this.handleAddPermissionDialogClose = this.handleAddPermissionDialogClose.bind(this);
    this.handleAddPermissionDialogOpen = this.handleAddPermissionDialogOpen.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    // TODO
  }
  handleAddPermissionDialogOpen = () => {
    this.setState({openAddPermissionDialog: true});
  };

  handleAddPermissionDialogClose = () => {
    this.setState({openAddPermissionDialog: false});
  };
  getData(pageable, sort, search) {
    const {
      roleId
    } = this.props;
    this.props.actions.getRolePermissionDetail(roleId, pageable, sort, search);
  }
  render() {
    const {
      permissionsData = {
        _embedded: {
          permissions: [],
        },
      },
      roleData = {
        permissions: [],
      },
    } = this.props;
    return (
      <React.Fragment>
        <div style={groupControl}>
          <span style={tablePermission.title}>{this.props.t('Permission table')}</span>
          <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginLeft: 15,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10,
            }}
            backgroundColor="#009688"
            labelStyle={{color: '#fff'}}
            label={this.props.t('ADDED')}
            onClick={this.handleAddPermissionDialogOpen}
          />
          {/* <FlatButton
            style={{
              boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
              float: 'right',
              marginRight: 15,
              marginTop: 10,
              marginBottom: 10,
            }}
            backgroundColor="#b93221"
            labelStyle={{color: '#fff'}}
            onClick={this.onClickOpenDialog}
            label={this.props.t('DELETE')}
          /> */}
        </div>
        <DataTable
          columns={this.columns}
          sort={this.props.sort}
          data={this.props.rolePermissionData}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          style={{
            display: 'block',
          }}
          getData={this.getData}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          requesting={this.state.deleting}
        />
        <AddPermissionDialog
          handleOpen={this.handleAddPermissionDialogOpen}
          handleClose={this.handleAddPermissionDialogClose}
          open={this.state.openAddPermissionDialog}
          permissions={permissionsData._embedded.permissions}
          currentPermissions={roleData.permissions}
        />
      </React.Fragment>
    );
  }
}

TablePermission.defaultProps = {
  sort: {
    key: 'displayName',
    type: 'ASC',
  },
  data: null,
  size: 10,
  search: {
    key: 'displayName',
  },
}

const mapStateToProps = (state) => {
  const rolePermission = state.RoleDetailReducer.get('rolePermission');
  const allPermission = state.RoleDetailReducer.get('allPermission');
  return {
    page: rolePermission.get('page'),
    sort: rolePermission.get('sort'),
    search: rolePermission.get('search'),
    rolePermissionRequesting: rolePermission.get('requesting'),
    rolePermissionData: rolePermission.get('data'),
    rolePermissionError: rolePermission.get('error'),
    permissionsRequesting: allPermission.get('requesting'),
    permissionsData: allPermission.get('data'),
    permissionsError: allPermission.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(TablePermission));
