import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { RefreshButton } from '../commons';

const CUSTOMER_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

class CustomerList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/customer/${dataAccesser(this.props.data)[indexRow].id}`);
  }
  refreshData() {
    this.props.actions.getData({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  render() {
    return (
      <div style={{
        display: 'block',
        height: '100%',
        background: '#fff',
      }}>
        <AppBar
          title={<span style={{
              color: 'rgba(0, 0, 0, 0.4)',
            }}>Danh sách khách hàng</span>}
          iconStyleLeft={{display: 'none'}}
          style={{
            backgroundColor: '#e8e8e8',
            border: 'rgba(0, 0, 0, 0.12) 1px'
          }}
          iconElementRight={<RefreshButton />}
        />
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getCustomer}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          style={{
            height: 'calc(100% - 64px)',
            display: 'block',
          }}
        />
      </div>
    );
  }
}

CustomerList.defaultProps = {
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
      type: TYPE.date,
    }, {
      key: 'status',
      text: 'TRẠNG THÁI',
      type: TYPE.option,
      options: CUSTOMER_STATUS,
    }
  ],
  sort: {
    key: 'firstName',
    type: 'ASC',
  },
  search: {
    key: 'firstName',
  },
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.CustomerListReducer.get('page'),
  sort: state.CustomerListReducer.get('sort'),
  search: state.CustomerListReducer.get('search'),
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
)(CustomerList);

export const reducers = {
  CustomerListReducer,
}
