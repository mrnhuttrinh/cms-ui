import React from 'react';
import { translate } from 'react-i18next';
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

import {
  tabStyle,
  indicatorStyle,
  titleStyle,
  rowContainer,
  leftColumn,
  rightColumn,
  groupControl,
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
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label={this.props.t('general information & History')} >
            <Row style={rowContainer}>
              <Col md={5} style={leftColumn}>
                <CardTitle style={titleStyle}>
                  {this.props.t('Personal information')}
                </CardTitle>
                <AnimationGroup
                  loading={this.props.userRequesting}
                  errorLoading={this.props.userError ? true : false}
                />
                <UserInformation userData={this.props.userData} />
              </Col>
              <Col md={7} style={rightColumn}>
                <CardTitle style={titleStyle}>
                  {this.props.t('User Activity history')}
                </CardTitle>
                <AnimationGroup
                  loading={this.props.userHistoriesRequesting}
                  errorLoading={this.props.userHistoriesError ? true : false}
                />
                <ActiveHistory userHistories={this.props.userHistoriesData} />
              </Col>
            </Row>
            <div style={groupControl}>
              <FlatButton
                style={{
                  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                  float: 'left',
                }}
                backgroundColor="#fff"
                labelStyle={{
                  textTransform: 'none',
                  color: '#747474'
                }}
                onClick={() => this.props.history.push('/permission')}
                label={this.props.t('Go back')} />
              <FlatButton
                style={{
                  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                  float: 'right',
                  marginLeft: 15
                }}
                backgroundColor="#009688"
                labelStyle={{color: '#fff'}}
                label={this.props.t('EDIT')}
              />
              <FlatButton
                style={{
                  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                  float: 'right',
                  marginRight: 15,
                  marginLeft: 15,
                }}
                backgroundColor="#b93221"
                labelStyle={{color: '#fff'}}
                label={this.props.t(labelLockUser)}
                onClick={this.onClickUpdateStatus}
              />
              <FlatButton
                style={{
                  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                  float: 'right',
                  marginRight: 15,
                }}
                backgroundColor="#9F6000"
                labelStyle={{color: '#fff'}}
                onClick={this.onClickOpenDialog}
                label={this.props.t('RESET PASSWORD')}
              />
            </div>
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

const mapStateToProps = (state) => {
  const userDetail = state.PrivilegeDetailReducer.get('userDetail');
  const userHistories = state.PrivilegeDetailReducer.get('userHistories');
  return {
    userRequesting: userDetail.get('requesting'),
    userData: userDetail.get('data'),
    userError: userDetail.get('error'),
    // user histories
    userHistoriesRequesting: userHistories.get('requesting'),
    userHistoriesData: userHistories.get('data'),
    userHistoriesError: userHistories.get('error'),
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
