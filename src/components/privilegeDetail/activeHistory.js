import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import uuid from 'uuid/v1';
import _ from 'lodash';
import moment from 'moment';
import { HISTORY_TYPE } from './constants';

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

class ActiveHistory extends React.Component {
  renderMilestoneDetail(milestone) {
    const {
      type = {}
    } = milestone;
    const historyType = HISTORY_TYPE[type.type] || {
      icon: 'mode_edit',
      textNote: '',
    };
    return (
      <Row key={uuid()} style={milestoneStyle}>
        <Col md={1}>
          <FontIcon style={iconStyle} className="material-icons">
            {historyType.icon}
          </FontIcon>
        </Col>
        <Col md={3}>
          {type.name}
        </Col>
        <Col md={8}>
          {historyType.textNote} <strong>{historyType.createdByText}</strong>
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
  render () {
    const {
      userHistories = {
        _embedded: {
          userHistories: [],
        }
      }
    } = this.props;
    const histories = _.orderBy(userHistories._embedded.userHistories, history => moment(history.createdAt), ['desc']);
    return (
      <Row style={{marginTop: '-20px'}}>
        <Col md={12}>
          {
            this.divideTimeLife(histories)
          }
        </Col>
      </Row>
    );
  }
}

export default ActiveHistory;
