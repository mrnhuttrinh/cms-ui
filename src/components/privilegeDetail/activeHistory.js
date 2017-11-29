import React from 'react';
import {Card, CardHeader } from 'material-ui/Card';
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
  compareDate(today, anotherDay) {
    const duration = moment.duration(today.diff(anotherDay));
    const days = duration.asDays();
    return Math.floor(days);
  }
  createDate(year, month, date) {
    return moment(`${year}/${month + 1}/${date}`);
  }
  renderLifeTimeAnotherYear(histories, currentYear) {
    const result = [];
    let currentMonth = 12;
    // loop for another month in this year
    while (currentMonth > 0) {
      currentMonth--;

      const anotherMonth = this.createDate(currentYear, currentMonth, 1);
      const dayInLastMonth = anotherMonth.daysInMonth();
      let anotherMonthList = _.remove(histories, history => {
        const createdAt = moment(history.createdAt);
        return createdAt >= anotherMonth &&
          createdAt < this.createDate(currentYear, currentMonth, dayInLastMonth);
      });
      if (anotherMonthList && anotherMonthList.length) {
        result.push(this.renderMilestoneHistory(anotherMonthList, `Tháng ${currentMonth + 1} Năm ${currentYear}`));
      }
    }
    return result;
  }
  divideTimeLife(histories) {
    let result = [];

    const today = moment();
    let currentDate = today.date();
    let currentMonth = today.month();
    let currentYear = today.year();
    
    // render for plan after today
    const planList = _.remove(histories, history => {
      const createdAt = moment(history.createdAt);
      return createdAt > today;
    });
    result.push(this.renderMilestoneHistory(planList, 'Kế hoạch'));

    // render list today
    const todayList = _.remove(histories, history => {
      const createdAt = moment(history.createdAt);
      return createdAt <= today && createdAt >= this.createDate(currentYear, currentMonth, currentDate);
    });
    result.push(this.renderMilestoneHistory(todayList, 'Hôm nay'));

    // list yesterday
    if (currentDate > 1) {
      const yesterdayList = _.remove(histories, history => {
        const createdAt = moment(history.createdAt);
        return createdAt >= this.createDate(currentYear, currentMonth, currentDate - 1) &&
          createdAt < this.createDate(currentYear, currentMonth, currentDate);
      });
      result.push(this.renderMilestoneHistory(yesterdayList, 'Hôm qua'));
      currentDate--;
    }

    // list this month
    if (currentDate > 1) {
      const thisMonthList = _.remove(histories, history => {
        const createdAt = moment(history.createdAt);
        return createdAt >= this.createDate(currentYear, currentMonth, 1) &&
          createdAt < this.createDate(currentYear, currentMonth, currentDate - 1);
      });
      result.push(this.renderMilestoneHistory(thisMonthList, 'Tháng này'));
      currentDate--;
    }

    // list last month
    if (currentMonth > 0) {
      currentMonth--;
      const lastMonth = this.createDate(currentYear, currentMonth, 1);
      const dayInLastMonth = lastMonth.daysInMonth();

      const lastMonthList = _.remove(histories, history => {
        const createdAt = moment(history.createdAt);
        return createdAt >= lastMonth &&
          createdAt < this.createDate(currentYear, currentMonth, dayInLastMonth);
      });
      result.push(this.renderMilestoneHistory(lastMonthList, 'Tháng trước'));
    }

    // loop for another month in this year
    while (currentMonth > 0) {
      currentMonth--;

      const anotherMonth = this.createDate(currentYear, currentMonth, 1);
      const dayInLastMonth = anotherMonth.daysInMonth();
      let anotherMonthList = _.remove(histories, history => {
        const createdAt = moment(history.createdAt);
        return createdAt >= anotherMonth &&
          createdAt < this.createDate(currentYear, currentMonth, dayInLastMonth);
      });
      if (anotherMonthList && anotherMonthList.length) {
        result.push(this.renderMilestoneHistory(anotherMonthList, `Tháng ${currentMonth + 1}`));
      }
    }
    
    while (histories.length > 0) {
      currentYear--;
      result = result.concat(this.renderLifeTimeAnotherYear(histories, currentYear));
    }

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
