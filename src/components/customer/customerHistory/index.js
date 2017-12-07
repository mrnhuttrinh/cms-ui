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
import { AnimationGroup } from '../../commons';
import * as actions from './actions';
import { STATUS } from './constants';
import { genderFormatter, dateFormatter } from '../../../utils';

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

class CustomerHistory  extends React.Component  {
  componentWillMount() {
    this.props.actions.getCustomerHistory(this.props.customerId);
  }
  parseInformation(data) {

    // Create Customer
    if (data.type.type === 'CREATED') {
      return ([null, <span>Khách hàng được khởi tạo</span>]);
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
            {property.name} khách hàng được chuyển từ <strong>
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
      return [propertiesChanged.join(', '), (<span>Khách hàng đã được thêm <strong>{propertiesChanged.join(', ')}</strong> </span>)];
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
        <Col md={3}>{title}</Col>
        <Col md={8}>{content}</Col>
      </Row>
    </Card>)
  }
  render () {
    if (!this.props.customerHistory) {
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%'}} >
          <AnimationGroup
            loading={this.props.requesting}
            errorLoading={this.props.error ? true : false}
          />
        </div>
      );
    }
    const customerHistories = _.sortBy(this.props.customerHistory._embedded.customerHistories, (e) => (new Date(e.createdAt))).reverse();
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
      <div style={{padding:'20px 100px 20px 100px', position: 'relative'}} >
        {historyDetail.length ? historyDetail : 'Không có thông tin lịch sử khách hàng!'}
      </div>);
  }
}

CustomerHistory.defaultProps = {
  propertyName: {
    firstName : {
      name: 'Tên',
    },
    lastName : {
      name: 'Họ',
    },
    phone1 : {
      name: 'SDT',
    },
    phone2 : {
      name: 'SDT',
    },
    email : {
      name: 'Email',
    },
    dateOfBirth : {
      name: 'Ngày sinh',
      formatter: dateFormatter,
    },
    gender : {
      name: 'Giới tính',
      formatter: genderFormatter,
    },
    status : {
      name: 'Trạng thái',
      formatter: (key) => (STATUS[key])
    },
    countryCode : {
      name: 'Quốc gia',
    },
    occupation : {
      name: 'Nhóm',
    },
    title : {
      name: 'Chức vụ',
    },
    position : {
      name: 'Khoa | Phòng ban',
    },
    addresses : {
      name: 'Địa chỉ',
    },
    identifyDocuments : {
      name: 'Giấy tờ tùy thân',
    },
  }
}

const mapStateToProps = (state) => ({
  customerHistory: state.CustomerHistoryReducer.get('history'),
  requesting: state.CustomerHistoryReducer.get('requesting'),
  error: state.CustomerHistoryReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerHistory);
