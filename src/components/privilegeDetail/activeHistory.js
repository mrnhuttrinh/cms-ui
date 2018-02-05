import React from 'react';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import uuid from 'uuid/v1';
import _ from 'lodash';
import moment from 'moment';
import { HISTORY_TYPE } from './constants';
import i18n from '../../i18n';


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
      <Row key={uuid()} className="mile-stone">
        <Col md={1} xs={2}>
          <FontIcon className="material-icons">
            {historyType.icon}
          </FontIcon>
        </Col>
        <Col md={3} xs={4}>
          {this.props.t(historyType.title)}
        </Col>
        <Col md={8} xs={6}>
          {this.props.t(historyType.textNote)} <strong>{historyType.createdByText}</strong>
        </Col>
      </Row>
    );
  }
  renderMilestoneHistory(milestones, textTime) {
    if (milestones && milestones.length > 0) {
      return (
        <div key={uuid()}>
          <p className="history-title"><span>{textTime}</span></p>
          <div className="history-detail">
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
        <p className="history-title"><span></span></p>
        <div className="history-detail">
          <Row key={uuid()} className="mile-stone">
            <Col md={1} xs={2}>
              <FontIcon className="material-icons">
                new_releases
              </FontIcon>
            </Col>
            <Col md={11} xs={10}>
              {this.props.t('Don\'t have history information!')}
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
      const key = moment(e.createdAt).locale(i18n.language).fromNow();
      if (timeLines[key]) {
        timeLines[key].push(e);
      } else {
        timeLines[key] = [e];
      }
    });
    _.forEach(Object.keys(timeLines), (key) => {
      result = result.concat(this.renderMilestoneHistory(timeLines[key], key));
    });
    if (result.length === 0) {
      result.push(this.renderEmptyHistory());
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
      <Row className="activity-history">
        <Col md={12} xs={12}>
          {
            this.divideTimeLife(histories)
          }
        </Col>
      </Row>
    );
  }
}

export default translate('translations')(ActiveHistory);
