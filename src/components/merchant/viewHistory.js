import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import uuid from 'uuid/v1';
import _ from 'lodash';
import moment from 'moment';
import { HISTORY_TYPE } from './constants';
import { AnimationGroup } from '../commons';
import * as actions from './actions';

const MERCHANT_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 20,
  paddingBottom: 20,
  position: 'relative',
  height: '100%'
};

const titleStyle = {
  padding: '0 20px',
  color: '#616161',
  fontSize: 13,
  paddingTop: 10,
  paddingBottom: 10,
};

const milestoneStyle = {
  fontSize: 13,
  whiteSpace: 'nowrap',
  paddingLeft: 10,
  lineHeight: '32px',
  height: '32px',
};

const iconStyle = {
  fontSize: 20,
  color: '#757575',
  lineHeight: '32px',
};

const divHistoryDetail = {
  color: 'rgba(0, 0, 0, 0.87)',
  backgroundColor: 'rgb(255, 255, 255)',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  boxSizing: 'border-box',
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  borderRadius: '2px',
  zIndex: '1',
  // padding: '6px'
}

const changes = (object, base) => {
  return _.transform(object, function(result, value, key) {
    if (!_.isEqual(value, base[key])) {
      result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
    }
  });
}

class History extends React.Component {
  componentWillMount() {
    const {
      match: {
        params: {
          merchantId
        }
      }
    } = this.props;
    this.props.actions.getMerchantHistory(merchantId);
  }
  parseInformation(data) {
    // Create Customer
    if (data.type.type === 'CREATED') {
      return (<span>Đại lý được khởi tạo bởi <strong>Quản Trị Viên</strong></span>);
    }

    // ADDED information
    if (data.type.type === 'ADDED') {
      return (<span>Đại lý được đăng ký một <strong>ứng dụng</strong> bởi <strong>Quản Trị Viên</strong></span>);
    }

    let updateObject;

    try {
      updateObject = JSON.parse(data.details);
    } catch(e) {
      return [null, <div>Không có thông tin chi tiết!</div>];
    }

    // Update information
    if (data.type.type === 'UPDATED') {
      const content = _.map(Object.keys(changes(updateObject.previous, updateObject.next)), (key) => {
        const property = this.props.propertyName[key];
        if (property) {
          return (
            <span>
              {property.name} khách hàng được chuyển từ <strong>
                [{property.formatter ? property.formatter(updateObject.previous[key]) : updateObject.previous[key]}]
              </strong> sang <strong>
                [{property.formatter ? property.formatter(updateObject.next[key]) : updateObject.next[key]}]
              </strong> bởi <strong>Quản Trị Viên</strong>
            </span>
          );
        }
        return null;
      });
      return [content];
    }

    return null;

  }
  renderMilestoneDetail(milestone) {
    const {
      type = {}
    } = milestone;
    const historyType = HISTORY_TYPE[type.type] || {
      icon: 'mode_edit',
    };
    return (
      <Row key={uuid()} style={milestoneStyle}>
        <Col md={3}>
          <FontIcon style={iconStyle} className="material-icons">
            {historyType.icon}
          </FontIcon>
          <div style={{
            display: 'inline-block',
            position: 'absolute',
            left: 60
          }}>{historyType.title}</div>
        </Col>
        <Col md={8}>
          {this.parseInformation(milestone)}
        </Col>
      </Row>
    );
  }
  renderMilestoneHistory(milestones, textTime) {
    if (milestones && milestones.length > 0) {
      return (
        <div key={uuid()}>
          <p style={titleStyle}><span>{textTime}</span></p>
          <div style={divHistoryDetail}>
            {
              _.map(milestones, milestone => this.renderMilestoneDetail(milestone))
            }
          </div>
        </div>
      );
    }
    return null;
  }
  renderEmptyHistory() {
    return (
      <div key={uuid()}>
        <p style={titleStyle}><span></span></p>
        <div style={divHistoryDetail}>
          <Row key={uuid()} style={milestoneStyle}>
            <Col md={1}>
              <FontIcon style={iconStyle} className="material-icons">
                new_releases
              </FontIcon>
            </Col>
            <Col md={11}>
              Không có thông tin chi tiết!
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  divideTimeLife(histories) {
    let result = [];
    const timeLines = {};

    _.forEach(histories, (e) => {
      const key = moment(e.createdAt).locale('vi').fromNow();
      if (timeLines[key]) {
        timeLines[key].push(e);
      } else {
        timeLines[key] = [e];
      }
    });
    _.forEach(Object.keys(timeLines), (key) => {
      result = result.concat(this.renderMilestoneHistory(timeLines[key], key));
    });

    return result;
  }
  render() {
    const {
      data = {
        _embedded: {
          merchantHistories: [],
        }
      }
    } = this.props;
    const histories = _.orderBy(data._embedded.merchantHistories, history => moment(history.createdAt), ['desc']);
    return (
      <Row style={rowContainer}>
        <AnimationGroup
          loading={this.props.requesting}
          errorLoading={this.props.error ? true : false}
        />
        <Col md={12}>
          {
            this.divideTimeLife(histories)
          }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const merchantHistories = state.MerchantDetailReducer.get('merchantHistories');
  return {
    requesting: merchantHistories.get('requesting'),
    data: merchantHistories.get('data'),
    error: merchantHistories.get('error'),
  };
};

History.defaultProps = {
  propertyName: {
    name : {
      name: 'Tên',
    },
    phone : {
      name: 'SDT',
    },
    email : {
      name: 'Email',
    },
    status : {
      name: 'Trạng thái',
      formatter: (key) => (MERCHANT_STATUS[key])
    },
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(History));
