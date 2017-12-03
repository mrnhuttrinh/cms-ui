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
import * as actions from './actions';
import { STATUS } from './constants';
import { dateFormatter } from '../../../utils';

const historyType = {
  CREATED: {
    icon: CreateIcon,
    title: 'Khởi tạo',
  },
  UPDATED: {
    icon: EditIcon,
    title: 'Cập nhật '
  },
  ADDED: {
    icon: AddIcon,
    title: 'Thêm ',
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
      return ([null, <span>Tài khoản được khởi tạo</span>]);
    }

    let updateObject;

    try {
      updateObject = JSON.parse(data.details);
    } catch(e) {
      return [null, <div>Không có thông tin chi tiết!</div>];
    }

    // Update information
    if (data.type.type === 'UPDATED') {
      const propertiesChanged = [];
      const content = _.map(Object.keys(changes(updateObject.previous, updateObject.next)), (key) => {
        const property = this.props.propertyName[key];
        if (property) {
          propertiesChanged.push(property.name);
          return (<span>
            {property.name} tài khoản được chuyển từ <strong>
              [{property.formatter ? property.formatter(updateObject.previous[key]) : updateObject.previous[key]}]
            </strong> sang <strong>
              [{property.formatter ? property.formatter(updateObject.next[key]) : updateObject.next[key]}]
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
      return [propertiesChanged.join(', '), (<span>tài khoản đã được thêm <strong>{propertiesChanged.join(', ')}</strong> </span>)];
    }

    return null;

  }

  renderCard(r, key) {

    const Informations = this.parseInformation(r);
    const Icon = historyType[r.type.type].icon;
    const Title = historyType[r.type.type].title;
    const icon = (<Icon />);
    const title = (<strong>{Title} {Informations[0]}</strong>);
    const content = (<span>{Informations[1]} {r.createdBy? <span> bởi <strong>{r.createdBy}</strong></span> : null}</span>);
    return (<Card key={key} style={{ padding: '9px 9px 0px'}}>
      <Row>
        <Col md={1}>{icon}</Col>
        <Col md={2}>{title}</Col>
        <Col md={9}>{content}</Col>
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
      const key = moment(e.createdAt).locale('vi').fromNow();
      timeLine[key] = [this.renderCard(e)].concat(timeLine[key]);
    });
    let historyDetail = [];
    _.forEach(Object.keys(timeLine), (key) => {
      historyDetail.push(<div className="time-title" style={titleStyle}>{key}</div>);
      historyDetail = historyDetail.concat(timeLine[key]);
    });
    return (
      <div style={{padding:'20px 100px 20px 100px'}} >
        {historyDetail.length ? historyDetail : 'Không có thông tin lịch sử tài khoản!'}
      </div>);
  }
}

AccountHistory.defaultProps = {
  propertyName: {
    id : {
      name: 'Số tài khoản',
    },
    accountType : {
      name: 'Loại',
    },
    accountName : {
      name: 'Tên tài khoản',
    },
    dateOpened : {
      name: 'Ngày mở',
      formatter: dateFormatter,
    },
    dateClosed : {
      name: 'Ngày đóng',
      formatter: dateFormatter,
    },
    currencyCode : {
      name: 'Loại tiền',
    },
    currentBalance : {
      name: 'Số dư hiện tại',
    },
    status : {
      name: 'Trạng thái ví',
      formatter: (key) => (STATUS[key])
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountHistory);
