import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import CreateIcon from 'material-ui/svg-icons/av/new-releases';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import {
  Card
} from 'material-ui/Card';
import { translate } from 'react-i18next';
import * as actions from './actions';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '13px',
  color: '#616161',
  margin: '24px',
}

const changes = (object, base) => {
  return _.transform(object, function(result, value, key) {
    if (!_.isEqual(value, base[key])) {
      result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
    }
  });
}

class CustomerHistory  extends React.Component  {
  componentWillMount() {
    this.props.actions.getCardHistory(this.props.cardId);
  }
  parseInformation(data) {

    // Create card
    if (data.type.type === 'CREATED') {
      return [<Col md={1}><CreateIcon /></Col>,<Col md={2}>{this.props.t('CREATED')}</Col>,<Col md={9}>{this.props.t('Card has been created')} {data.createdBy? <span> {this.props.t('by')} <strong>{data.createdBy}</strong></span> : null}</Col>]
    }

    let updateObject;

    try {
      updateObject = JSON.parse(data.details);
    } catch(e) {
      return [null, <div>this.props.t('Don\'t have history information!')</div>];
    }

    // Update information
    if (data.type.type === 'UPDATED') {
      let results = [];
      _.forEach(Object.keys(changes(updateObject.previous, updateObject.next)), (key) => {
        if (key==='status') {
          if (updateObject.next === 'ACTIVE') {
            results = results.concat([
              <Col md={1}><EditIcon /></Col>,
              <Col md={2}>{this.props.t('Unlock')}</Col>,
              <Col md={9}>{this.props.t('The card has been unlocked')} {data.createdBy? <span> {this.props.t('by')} <strong>{data.createdBy}</strong></span> : null}</Col>
            ]);
          } else {
            results = results.concat([
              <Col md={1}><EditIcon /></Col>,
              <Col md={2}>{this.props.t('Lock')}</Col>,
              <Col md={9}>{this.props.t('The card has been locked')} {data.createdBy? <span> {this.props.t('by')} <strong>{data.createdBy}</strong></span> : null}</Col>
            ])
          }
        }
        if (key==='expiryDate') {
          results = results.concat([
            <Col md={1}><AddIcon /></Col>,
            <Col md={2}>{this.props.t('Renew')}</Col>,
            <Col md={9}>{this.props.t('Card has been renewed')} {data.createdBy? <span> {this.props.t('by')} <strong>{data.createdBy}</strong></span> : null}</Col>
          ]);
        }
      });
      return results;
    }
    return null;
  }

  renderCard(r, key) {
    return (<Card key={key} style={{ padding: '9px 9px 0px'}}>
      <Row>
        {this.parseInformation(r)}
      </Row>
    </Card>)
  }
  render () {
    if (!this.props.cardHistory) {
      return null;
    }
    const customerHistories = _.sortBy(this.props.cardHistory._embedded.cardHistories, (e) => (new Date(e.createdAt))).reverse();
    const timeLine = {};
    _.forEach(customerHistories, (e) => {
      const key = moment(e.createdAt).locale(this.props.t('Language')).fromNow();
      timeLine[key] = [this.renderCard(e)].concat(timeLine[key]);
    });
    let historyDetail = [];
    _.forEach(Object.keys(timeLine), (key) => {
      historyDetail.push(<div className="time-title" style={titleStyle}>{key}</div>);
      historyDetail = historyDetail.concat(_.reverse(timeLine[key]));
    });
    return (
      <div>
        {historyDetail.length ? historyDetail : this.props.t('Don\'t have history information!')}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  cardHistory: state.CardHistoryReducer.get('history'),
  requesting: state.CardHistoryReducer.get('requesting'),
  error: state.CardHistoryReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerHistory));
