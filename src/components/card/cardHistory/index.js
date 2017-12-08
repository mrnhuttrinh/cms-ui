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
      const content = 'Thẻ được khởi tạo';
      return [<Col md={1}><CreateIcon /></Col>,<Col md={2}>Khởi tạo</Col>,<Col md={9}>{content} {data.createdBy? <span> bởi <strong>{data.createdBy}</strong></span> : null}</Col>]
    }

    let updateObject;

    try {
      updateObject = JSON.parse(data.details);
    } catch(e) {
      return [null, <div>Không có thông tin chi tiết!</div>];
    }

    // Update information
    if (data.type.type === 'UPDATED') {
      let results = [];
      _.forEach(Object.keys(changes(updateObject.previous, updateObject.next)), (key) => {
        if (key==='status') {
          if (updateObject.next === 'ACTIVE') {
            results = results.concat([
              <Col md={1}><EditIcon /></Col>,
              <Col md={2}>Mở khóa</Col>,
              <Col md={9}>Thẻ đã được mở khoá {data.createdBy? <span> bởi <strong>{data.createdBy}</strong></span> : null}</Col>
            ]);
          } else {
            results = results.concat([
              <Col md={1}><EditIcon /></Col>,
              <Col md={2}>Khóa</Col>,
              <Col md={9}>Thẻ đã bị khoá {data.createdBy? <span> bởi <strong>{data.createdBy}</strong></span> : null}</Col>
            ])
          }
        }
        if (key==='expiryDate') {
          results = results.concat([
            <Col md={1}><AddIcon /></Col>,
            <Col md={2}>Gia hạn</Col>,
            <Col md={9}>Thẻ đã được gia hạn {data.createdBy? <span> bởi <strong>{data.createdBy}</strong></span> : null}</Col>
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
      const key = moment(e.createdAt).locale('vi').fromNow();
      timeLine[key] = [this.renderCard(e)].concat(timeLine[key]);
    });
    let historyDetail = [];
    _.forEach(Object.keys(timeLine), (key) => {
      historyDetail.push(<div className="time-title" style={titleStyle}>{key}</div>);
      historyDetail = historyDetail.concat(_.reverse(timeLine[key]));
    });
    return (
      <div>
        {historyDetail.length ? historyDetail : 'Không có thông tin lịch sử khách hàng!'}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerHistory);
