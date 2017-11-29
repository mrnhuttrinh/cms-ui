import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {
  CardTitle,
} from 'material-ui/Card';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import UserInformation from './userInformation';
import ActiveHistory from './activeHistory';
import * as actions from './actions';

import { ContentWrapper } from '../commons';

import PrivilegeDetailReducer from './reducers';

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)',
  minHeight: 'calc(100% - 64px)',
  position: 'relative',
};
const indicatorStyle = {
  backgroundColor: '#009688'
};

const titleStyle = {
  fontSize: '16px',
  color: '#00897b',
  paddingLeft: 0,
}

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 0,
  marginRight: 0
};

const leftColumn = {
  borderRight: '1px solid rgba(232, 232, 232, 0.5)',
  paddingBottom: 15
};

const rightColumn = {
  paddingBottom: 15
};

const groupControl = {
  display: 'block',
  padding: '10px',
  backgroundColor: '#e8e8e8',
  width: '100%',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 4px 4px 0px, rgba(0, 0, 0, 0.12) 0px 0px 4px 0px'
}

class PrivilegeDetail  extends React.Component {
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
      >
        <Tabs inkBarStyle={indicatorStyle}>
          <Tab style={tabStyle} label="THÔNG TIN CHUNG & LỊCH SỬ HOẠT ĐỘNG" >
            <Row style={rowContainer}>
              <Col md={5} style={leftColumn}>
                <CardTitle style={titleStyle}>
                  Thông tin cá nhân
                </CardTitle>
                <UserInformation userData={this.props.userData} />
              </Col>
              <Col md={7} style={rightColumn}>
                <CardTitle style={titleStyle}>
                  Lịch Sử Hoạt Động
                </CardTitle>
                <ActiveHistory userHistories={this.props.userHistoriesData} />
              </Col>
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
                  }}
                  backgroundColor="#b93221"
                  labelStyle={{color: '#fff'}}
                  label="KHÓA TÀI KHOẢN"
                />
              </div>
            </Row>
          </Tab>
        </Tabs>
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
