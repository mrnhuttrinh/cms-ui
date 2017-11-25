import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import Paper from 'material-ui/Paper';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import CreateIcon from 'material-ui/svg-icons/action/note-add';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import {
  Card,
  CardText
} from 'material-ui/Card';

import { propertyName } from './constants';

const style = {
  width: '100%',
  height: '100%',
  display: 'inline-block',
  padding: '14px 24px 24px',
  margin: '0px',
};

const historyType = {
  CREATED: {
    icon: CreateIcon,
    title: 'Khởi tạo',
  },
  UPDATED: {
    icon: EditIcon,
    title: 'Cập nhật'
  },
  DELETED: {
    icon: DeleteIcon,
    title: 'Xóa',
  },
  ADDED: {
    icon: AddIcon,
    title: 'Thêm',
  },
}

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
  marginTop: '10px',
}

const cardStyle = {
  padding: '0px',
}

const changes = (object, base) => {
  return _.transform(object, function(result, value, key) {
    if (!_.isEqual(value, base[key])) {
      result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
    }
  });
}

const getUpdatedInformation = (details) => {
  const updateObject = JSON.parse(details);
  return _.map(Object.keys(changes(updateObject.previous, updateObject.next)), (key) =>
  (`${propertyName[key]} được chuyển từ [${updateObject.previous[key]}] sang [${updateObject.next[key]}]`)).join(', ');
}

const getCreatedInformation = () => {
  return 'khách hàng được khởi tạo';
}
const getAddedInformation = (details) => {
  const updateObject = JSON.parse(details);
  return 'Khách hàng đã được thêm '.concat(_.map(Object.keys(changes(updateObject.previous, updateObject.next)), (key) => propertyName[key]).join(', '));
}

const getDelectedInformation = (details) => {
  const updateObject = JSON.parse(details);
  return 'Khách hàng đã được xóa '.concat(_.map(Object.keys(changes(updateObject.previous, updateObject.next)), (key) =>
      propertyName[key]).join(','));
}

class CustomerAccountHistory  extends React.Component  {
  renderCard(r, key) {
    const Icon = historyType[r.type.type].icon;
    const Title = historyType[r.type.type].title;
    let detail;
    if (r.type.type === 'UPDATED') {
      detail = getUpdatedInformation(r.details);
    } else if (r.type.type === 'CREATED') {
      detail = getCreatedInformation();
    } else if (r.type.type === 'ADDED'){
      detail = getAddedInformation(r.details);
    } else {
      detail = getDelectedInformation(r.details);
    }
    if (r.createdBy) {
      detail = detail.concat(` bởi ${r.createdBy}`);
    }
    return (<Card key={key}>
      <CardText style={cardStyle}>
        <Icon style={{marginLeft: '5px', marginTop: '5px'}}/> <strong style={{marginLeft: '5px', marginRight: '20px'}}>{Title}</strong> {detail}
      </CardText>
    </Card>)
  }
  render () {
    if (!this.props.customer) {
      return null;
    }
    const customerHistories = _.sortBy(this.props.customer.customerHistory, (e) => (new Date(e.createdAt))).reverse();
    const timeLine = {};
    _.forEach(customerHistories, (e) => {
      const key = moment(e.createdAt).locale('vi').fromNow();
      timeLine[key] = [this.renderCard(e)].concat(timeLine[key]);
    });
    let historyDetail = [];
    _.forEach(Object.keys(timeLine), (key) => {
      historyDetail.push(<div className="time-title" style={titleStyle}>{key}</div>);
      historyDetail = historyDetail.concat(timeLine[key]);
    });
    return (
      <Paper style={style} zDepth={1} rounded={false} >
        {historyDetail.length ? historyDetail : 'Không có thông tin lịch sử khách hàng!'}
    </Paper>);
  }
}

export default CustomerAccountHistory;
