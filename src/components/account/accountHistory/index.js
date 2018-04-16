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
import { Card } from 'material-ui/Card';
import { translate } from 'react-i18next';

import * as actions from './actions';
import { dateFormatter } from '../../../utils';

const historyType = {
  CREATED: {
    icon: CreateIcon,
    title: 'CREATED',
  },
  UPDATED: {
    icon: EditIcon,
    title: 'UPDATED'
  },
  ADDED: {
    icon: AddIcon,
    title: 'ADDED ',
  },
  LOCKED: {
    icon: EditIcon,
    title: 'UPDATED',
  },
  UNLOCKED: {
    icon: EditIcon,
    title: 'UPDATED',
  },
}

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

class AccountHistory  extends React.Component  {
  componentWillMount() {
    this.props.actions.getAccountHistory(this.props.accountId);
  }
  parseInformation(data) {

    // Create Customer
    if (data.type.type === 'CREATED') {
      return ([null, <span>{this.props.t('Account has been created')}</span>]);
    }

    let updateObject;

    try {
      updateObject = JSON.parse(data.details);
    } catch(e) {
      return [null, <div>{this.props.t('Don\'t have history information!')}</div>];
    }

    // Update information
    if (data.type.type === 'UPDATED' || data.type.type === 'LOCKED' || data.type.type === 'UNLOCKED') {
      const propertiesChanged = [];
      const content = _.map(Object.keys(changes(updateObject.previous, updateObject.next)), (key) => {
        const property = this.props.propertyName[key];
        if (property) {
          propertiesChanged.push(this.props.t(property.name));
          return (<span>
            {this.props.t(property.name)} {this.props.t('of Account has been changed from')} <strong>
              [{property.formatter ? property.formatter(updateObject.previous[key], this.props.t) : updateObject.previous[key]}]
            </strong> {this.props.t('to')} <strong>
              [{property.formatter ? property.formatter(updateObject.next[key], this.props.t) : updateObject.next[key]}]
            </strong>
          </span>);
        }
        return null;
      });
      return [propertiesChanged.join(', '), content];
    }

    // ADDED information
    if (data.type.type === 'ADDED') {
      const propertiesChanged = _.map(Object.keys(changes(updateObject.previous, updateObject.next)), (key) => this.props.propertyName[key].name);
      return [propertiesChanged.join(', '), (<span>{this.props.t('Account has been added')} <strong>{propertiesChanged.join(', ')}</strong> </span>)];
    }

    return null;

  }

  renderCard(r, key) {

    const Informations = this.parseInformation(r);
    const Icon = historyType[r.type.type].icon;
    const Title = this.props.t(historyType[r.type.type].title);
    const icon = (<Icon />);
    const title = (<strong>{Title} {Informations[0]}</strong>);
    const content = (<span>{Informations[1]} {r.createdBy? <span> {this.props.t('by')} <strong>{r.createdBy}</strong></span> : null}</span>);
    return (<Card key={key} style={{ padding: '9px 9px 0px'}}>
      <Row>
        <Col md={1} xs={2}>{icon}</Col>
        <Col md={2} xs={4}>{title}</Col>
        <Col md={9} xs={6}>{content}</Col>
      </Row>
    </Card>)
  }
  render () {
    if (!this.props.accountHistory) {
      return null;
    }
    const customerHistories = _.sortBy(this.props.accountHistory._embedded.accountHistories, (e) => (new Date(e.createdAt))).reverse();
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
      <div className="account-history" >
        {historyDetail.length ? historyDetail : this.props.t('This account does not have any history.')}
      </div>);
  }
}

AccountHistory.defaultProps = {
  propertyName: {
    id : {
      name: 'Account ID',
    },
    accountType : {
      name: 'Type',
    },
    accountName : {
      name: 'Account name',
    },
    dateOpened : {
      name: 'Date opened',
      formatter: dateFormatter,
    },
    dateClosed : {
      name: 'Date closed',
      formatter: dateFormatter,
    },
    currencyCode : {
      name: 'Currency',
    },
    currentBalance : {
      name: 'Current balance',
    },
    status : {
      name: 'Status',
      formatter: (key, t) => (t(key))
    },
  }
}

const mapStateToProps = (state) => ({
  accountHistory: state.AccountHistoryReducer.get('history'),
  requesting: state.AccountHistoryReducer.get('requesting'),
  error: state.AccountHistoryReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountHistory));
