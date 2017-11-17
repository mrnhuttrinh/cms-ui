import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import CreateIcon from 'material-ui/svg-icons/action/note-add';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import {
  Card,
  CardText
} from 'material-ui/Card';

import * as actions from './actions';

const style = {
  width: '100%',
  height: '100%',
  display: 'inline-block',
  padding: '14px 24px 24px',
  margin: '0px',
};

const historyType = {
  CREATED: CreateIcon,
  UPDATED: EditIcon,
  DELETED: DeleteIcon,
}

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class CustomerAccountHistory  extends React.Component  {
  renderCard(r, key) {
    const Icon = historyType[r.type.type];
    return (<Card key={key}>
      <CardText>
        <Icon /> {r.type.description} {r.details}
      </CardText>
    </Card>)
  }
  render () {
    const cardsYesterday = _.map(_.filter(this.props.accountHistory, (e) => (true)), this.renderCard);

    const cardsThisMonth = _.map(_.filter(this.props.accountHistory, (e) => (true)), this.renderCard);

    const cardsLastMonth = _.map(_.filter(this.props.accountHistory, (e) => (true)), this.renderCard);

    return (
      <Paper style={style} zDepth={1} rounded={false}>
      {cardsYesterday.length ? <div className="time-title" style={titleStyle}>Hôm qua</div> : null}
      {cardsYesterday}
      <br />
      {cardsThisMonth.length ? <div className="time-title" style={titleStyle}>Tháng này</div> : null}
      {cardsThisMonth}
      <br />
      {cardsLastMonth.length ? <div className="time-title" style={titleStyle}>Tháng trước</div> : null}
      {cardsLastMonth}
    </Paper>);
  }
}

const mapStateToProps = (state) => ({
  accountHistory: state.CustomerHistoryReducer.get('accountHistory'),
  requesting: state.CustomerHistoryReducer.get('requesting'),
  error: state.CustomerHistoryReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerAccountHistory);
