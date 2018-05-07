import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import * as actions from '../actions';
import GroupPermission from './groupPermission';
import {
  AnimationGroup
} from '../../commons';

import { ROLES } from '../../../constants';

import {
  groupControl,
  tablePermission,
} from './styles';


class TreeViewPermission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listChecked: [],
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {
      roleData = {
        permissions: [],
      },
    } = nextProps;
    if (roleData.permissions) {
      this.setState({
        listChecked: roleData.permissions,
      });
    }
  }
  handleClickUpdate() {
    const {
      roleId
    } = this.props;
    this.props.actions.updateRolePermission(roleId, this.state.listChecked).then(() => {
      this.props.actions.getRoleDetail(roleId);
    });
  }
  groupPermission(disabled) {
    const {
      permissionsData = {
        _embedded: {
          permissions: [],
        },
      },
    } = this.props;
    const listPermissionByGroup = {};
    const listChildChecked = {};
    // group by first name
    const groupPermissions = _.union(_.map(permissionsData._embedded.permissions, per => {
      const firstIndexOfUnderstrike = per.name.indexOf('_');
      if (firstIndexOfUnderstrike > 0) {
        const firstName = per.name.substr(0, firstIndexOfUnderstrike);
        if (!listPermissionByGroup[firstName]) {
          listPermissionByGroup[firstName] = [];
        }
        listPermissionByGroup[firstName].push(per);
        return firstName;
      }
      if (!listPermissionByGroup[per.name]) {
        listPermissionByGroup[per.name] = [];
      }
      listPermissionByGroup[per.name].push(per);
      return per.name;
    }));

    _.each(this.state.listChecked, per => {
      const firstIndexOfUnderstrike = per.name.indexOf('_');
      if (firstIndexOfUnderstrike > 0) {
        const firstName = per.name.substr(0, firstIndexOfUnderstrike);
        if (!listChildChecked[firstName]) {
          listChildChecked[firstName] = [];
        }
        listChildChecked[firstName].push(per);
        return firstName;
      }
      if (!listChildChecked[per.name]) {
        listChildChecked[per.name] = [];
      }
      listChildChecked[per.name].push(per);
      return per.name;
    });

    // group permission
    return _.map(groupPermissions, (gPer, index) => {
      if (listPermissionByGroup[gPer]) {
        return (
          <div key={`div_${index}_${gPer}`}>
            <GroupPermission
              key={`${index}_${gPer}`}
              index={index}
              groupName={gPer}
              nestedItems={listPermissionByGroup[gPer]}
              checkedList={listChildChecked[gPer]}
              handleCheckbox={this.handleCheckbox}
              disabled={disabled}
            />
            <Divider />
          </div>
        );
      }
      return (
        <div key={`div_${index}_${gPer}`}>
          <GroupPermission
            key={`${index}_${gPer}`}
            index={index}
            groupName={gPer}
            handleCheckbox={() => this.handleCheckbox(listChildChecked[gPer], listPermissionByGroup[gPer])}
            disabled={disabled}
          />
          <Divider />
        </div>
      );
    });
  }
  checkboxChecked() {
    const {
      permissionsData = {
        _embedded: {
          permissions: [],
        },
      },
    } = this.props;
    return permissionsData._embedded.permissions.length === this.state.listChecked.length ? true : false;
  }
  handleCheckbox(isInputChecked, updateCheckedList) {
    const cloneCheckList = Object.assign([], this.state.listChecked);
    if (isInputChecked) {
      _.each(updateCheckedList, permission => {
        const itemCheck = _.find(cloneCheckList, checkedPermission => checkedPermission.id === permission.id);
        if (!itemCheck) {
          cloneCheckList.push(permission);
        }
      });
    } else {
      _.each(updateCheckedList, permission => {
        _.remove(cloneCheckList, checkedPermission => checkedPermission.id === permission.id);
      });
    }
    this.setState({
      listChecked: cloneCheckList,
    });
  }
  render() {
    const {
      permissionsData = {
        _embedded: {
          permissions: [],
        },
      },
      roleData,
    } = this.props;
    const disabled = ROLES.ADMIN === roleData.name;
    return (
      <div>
        <AnimationGroup
          loading={this.props.updateRolePermissionRequesting}
          errorLoading={this.props.updateRolePermissionError ? true : false}
        />
        <List style={{ padding: 0, }}>
          <div style={groupControl}>
            <span style={tablePermission.title}>{this.props.t('Basic Permission Setup')}</span>
            <FlatButton
              style={{
                boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                float: 'right',
                marginLeft: 15,
                marginRight: 30,
                marginTop: 10,
                marginBottom: 10,
              }}
              primary
              backgroundColor="#009688"
              labelStyle={{color: '#fff'}}
              label={this.props.t('SAVE')}
              onClick={this.handleClickUpdate}
              disabled={disabled}
            />
          </div>
          <ListItem
            primaryText={this.props.t('Permission table')}
            leftCheckbox={
              <Checkbox
                onCheck={(event, isInputChecked) => this.handleCheckbox(isInputChecked, permissionsData._embedded.permissions)}
                checked={this.checkboxChecked()}
                disabled={disabled}
              />
            }
          />
          <Divider />
          {this.groupPermission(disabled)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const rolePermission = state.RoleDetailReducer.get('rolePermission');
  const allPermission = state.RoleDetailReducer.get('allPermission');
  const updateRolePermission = state.RoleDetailReducer.get('updateRolePermission');
  return {
    rolePermissionRequesting: rolePermission.get('requesting'),
    rolePermissionData: rolePermission.get('data'),
    rolePermissionError: rolePermission.get('error'),
    permissionsRequesting: allPermission.get('requesting'),
    permissionsData: allPermission.get('data'),
    permissionsError: allPermission.get('error'),
    updateRolePermissionRequesting: updateRolePermission.get('requesting'),
    updateRolePermissionData: updateRolePermission.get('data'),
    updateRolePermissionError: updateRolePermission.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(TreeViewPermission));
