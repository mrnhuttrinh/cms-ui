import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerListReducer from './reducers';
import * as actions from './actions';
import DataTable from '../commons/table';

const CUSTOMER_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

class ManagePrivilegeList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/customer/${this.props.data._embedded.customers[indexRow].id}`);
  }
  render() {
    return (
      <div>
        <AppBar
          title={<span style={{
              color: 'rgba(0, 0, 0, 0.4)',
            }}>Danh sách khách hàng</span>}
          iconStyleLeft={{display: 'none'}}
          style={{
            backgroundColor: '#e8e8e8',
            border: 'rgba(0, 0, 0, 0.12) 1px'
          }}
          iconElementRight={
            <MenuItem
              style={{
                color: '#009688',
                letterSpacing: '0px'
              }}
              leftIcon={
                <FontIcon
                  style={{
                    color: '#009688',
                  }}
                  className="material-icons"
                >refresh</FontIcon>}>
                REFRESH
            </MenuItem>
          }
        />
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getCustomer}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
        />
      </div>
    );
  }
}

ManagePrivilegeList.defaultProps = {
  columns: [
    {
      key: 'firstName',
      text: 'TÊN',
      sort: 'ASC',
    }, {
      key: 'lastName',
      text: 'HỌ',
    }, {
      key: 'scmsMemberCode',
      text: 'Mã SV/GV',
    }, {
      key: 'title',
      text: 'KHOA | PHÒNG BAN',
    }, {
      key: 'position',
      text: 'CHỨC VỤ',
    }, {
      key: 'dateBecameCustomer',
      text: 'NGÀY KHỞI TẠO',
      formater: (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A'),
    }, {
      key: 'status',
      text: 'TRẠNG THÁI',
      formater: (status) => (CUSTOMER_STATUS[status]),
    }
  ],
  sort: {
    key: 'firstName',
    type: 'ASC',
  },
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.CustomerListReducer.get('page'),
  sort: state.CustomerListReducer.get('sort'),
  data: state.CustomerListReducer.get('data'),
  requesting: state.CustomerListReducer.get('requesting'),
  error: state.CustomerListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManagePrivilegeList);

export const reducers = {
  CustomerListReducer,
}
