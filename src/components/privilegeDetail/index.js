import React from 'react';
import { translate } from 'react-i18next';
import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import {
  CardTitle,
} from 'material-ui/Card';
import {
  Tab,
} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import UserInformation from './userInformation';
import ActiveHistory from './activeHistory';
import { TabTemplate, AnimationGroup } from '../commons';
import * as actions from './actions';

import { ContentWrapper } from '../commons';

import PrivilegeDetailReducer from './reducers';

import ResetPasswordDialog from './resetPassword';

import { ENUM_USER_STATUS } from '../../constants';

import './styles.scss';

import {
  tabStyle,
  indicatorStyle,
  titleStyle,
} from './styles';


class PrivilegeDetail  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openResetPasswordDialog: false,
    };
    this.onClickOpenDialog = this.onClickOpenDialog.bind(this);
    this.onClickCloseDialog = this.onClickCloseDialog.bind(this);
    this.onClickUpdateStatus = this.onClickUpdateStatus.bind(this);
    this.onClickUpdateUserInformation = this.onClickUpdateUserInformation.bind(this);
  }
  componentWillMount() {
    // fetch user detail
    const {
      match: {
        params: {
          userId
        }
      }
    } = this.props;
    this.props.actions.getUser(userId);
    // fetch user active history
    this.props.actions.getUserHistories(userId);
    this.props.actions.getRoleList();
  }
  
  onClickUpdateUserInformation() {
    const {
      form: {
        userInformation
      },
      roleListData,
    } = this.props;

    const values = Object.assign({}, userInformation.values);
    delete values.roles;
    values.enabled = values.status === ENUM_USER_STATUS.ACTIVE ? true : false;

    const roleItem = _.find(roleListData._embedded.roles, role => role.id === values.role);
    values.roles = [ roleItem ];
    delete values.role;
    delete values.status;
    this.props.actions.userUpdateInformation(values);
  }
  
  onClickOpenDialog() {
    this.setState({openResetPasswordDialog: true});
  };

  onClickCloseDialog() {
    this.setState({openResetPasswordDialog: false});
  };
  
  onClickUpdateStatus() {
    const {
      match: {
        params: {
          userId
        }
      },
      userData = {},
    } = this.props;
    const status = userData.enabled ? 'ACTIVE' : 'INACTIVE';
    this.props.actions.userUpdateStatus(userId, status).then(() => {
      this.props.actions.getUser(userId);
      this.props.actions.getUserHistories(userId);
    });
  }
  render () {
    const {
      userData = {},
    } = this.props;
    const labelLockUser = userData.enabled ? 'LOCK USER' : 'UNLOCK USER';
    return (
      <ContentWrapper
        title="User details"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate inkBarStyle={indicatorStyle}>
          <Tab style={tabStyle} label={this.props.t('general information & History')} >
            <Row className="privilege-detail">
              <Col md={5} xs={12} className="left-column">
                <CardTitle style={titleStyle}>
                  {this.props.t('Personal information')}
                </CardTitle>
                <AnimationGroup
                  loading={this.props.userRequesting}
                  errorLoading={this.props.userError ? true : false}
                />
                <UserInformation />
              </Col>
              <Col md={7} xs={12} className="right-column">
                <CardTitle style={titleStyle}>
                  {this.props.t('User Activity history')}
                </CardTitle>
                <AnimationGroup
                  loading={this.props.userHistoriesRequesting}
                  errorLoading={this.props.userHistoriesError ? true : false}
                />
                <ActiveHistory userHistories={this.props.userHistoriesData} />
              </Col>
              <Col md={12} className="group-control">
                <FlatButton
                  className="go-back"
                  backgroundColor="#fff"
                  labelStyle={{
                    textTransform: 'none',
                    color: '#747474'
                  }}
                  onClick={() => this.props.history.push('/permission')}
                  label={this.props.t('Go back')} />
                <FlatButton
                  className="edit-button"
                  backgroundColor="#009688"
                  labelStyle={{color: '#fff'}}
                  label={this.props.t('EDIT')}
                  onClick={this.onClickUpdateUserInformation}
                />
                <FlatButton
                  className="lock-button"
                  backgroundColor="#b93221"
                  labelStyle={{color: '#fff'}}
                  label={this.props.t(labelLockUser)}
                  onClick={this.onClickUpdateStatus}
                />
                <FlatButton
                  className="reset-password-button"
                  backgroundColor="#9F6000"
                  labelStyle={{color: '#fff'}}
                  onClick={this.onClickOpenDialog}
                  label={this.props.t('RESET PASSWORD')}
                />
              </Col>
            </Row>
            {
              this.state.openResetPasswordDialog ? (
                <ResetPasswordDialog
                  onClickCloseDialog={this.onClickCloseDialog}
                  openDialog={this.state.openResetPasswordDialog}
                />
              ) : null
            }
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

PrivilegeDetail.defaultProps = {
  roleListData: {
    _embedded: {
      roles: [],
    },
  },
};

const mapStateToProps = (state) => {
  const userDetail = state.PrivilegeDetailReducer.get('userDetail');
  const userHistories = state.PrivilegeDetailReducer.get('userHistories');
  const roleList = state.PrivilegeDetailReducer.get('roleList');
  return {
    form: state.form,
    userRequesting: userDetail.get('requesting'),
    userData: userDetail.get('data'),
    userError: userDetail.get('error'),
    // user histories
    userHistoriesRequesting: userHistories.get('requesting'),
    userHistoriesData: userHistories.get('data'),
    userHistoriesError: userHistories.get('error'),
    // role list
    roleListRequesting: roleList.get('requesting'),
    roleListData: roleList.get('data'),
    roleListError: roleList.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivilegeDetail));

export const reducers = {
  PrivilegeDetailReducer,
};
