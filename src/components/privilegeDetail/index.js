import React from 'react';
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
  }
  
  onClickOpenDialog() {
    this.setState({openResetPasswordDialog: true});
  };

  onClickCloseDialog() {
    this.setState({openResetPasswordDialog: false});
  };
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
  render () {
    return (
      <ContentWrapper
        title="Chi Tiết Người Dùng"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label="THÔNG TIN CHUNG & LỊCH SỬ HOẠT ĐỘNG" >
            <Row style={rowContainer}>
              <Col md={5} style={leftColumn}>
                <CardTitle style={titleStyle}>
                  Thông tin cá nhân
                </CardTitle>
                <AnimationGroup
                  loading={this.props.userRequesting}
                  errorLoading={this.props.userError ? true : false}
                />
                <UserInformation userData={this.props.userData} />
              </Col>
              <Col md={7} style={rightColumn}>
                <CardTitle style={titleStyle}>
                  Lịch Sử Hoạt Động
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
                label="Quay lại" />
              <FlatButton
                style={{
                  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                  float: 'right',
                  marginLeft: 15
                }}
                backgroundColor="#009688"
                labelStyle={{color: '#fff'}}
                label="CHỈNH SỬA"
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
                label="KHÓA TÀI KHOẢN"
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
                label="RESET MẬT KHẨU"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivilegeDetail);

export const reducers = {
  PrivilegeDetailReducer,
};
