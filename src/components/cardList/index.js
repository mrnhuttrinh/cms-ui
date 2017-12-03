import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CardListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE } from '../commons/table';
import AppBar from 'material-ui/AppBar';
import { RefreshButton } from '../commons';

const ACCOUNT_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

class CardList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/card/${this.props.dataAccesser(this.props.data)[indexRow].cardNumber}`);
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
            }}>Danh sách thẻ</span>}
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
          getData={this.props.actions.getCardList}
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

CardList.defaultProps = {
  columns: [
    {
      key: 'cardCode',
      text: 'CODE',
      sort: 'ASC',
    },
    {
      key: 'customer',
      text: 'TÀI KHOẢN',
      formater: (data) => _.map(_.get(data, 'customer.accounts'), account => account.accountName).join(', '),
    },
    {
      key: 'cardType.description',
      text: 'LOẠI',
    },
    {
      key: 'customer.lastName',
      text: 'HỌ',
    },
    {
      key: 'customer.firstName',
      text: 'TÊN',
    },
    {
      key: 'effectiveDate',
      text: 'NGÀY HIỆU LỰC',
      type: TYPE.date,
    },
    {
      key: 'expiryDate',
      text: 'NGÀY HẾT HẠN',
      type: TYPE.date,
    },
    {
      key: 'status',
      text: 'TRẠNG THÁI',
      type: TYPE.option,
      options: ACCOUNT_STATUS,
    },
  ],
  sort: {
    key: 'cardCode',
    type: 'ASC',
  },
  data: null,
  size: 10,
  search: {
    key: 'cardCode',
  },
  dataAccesser: (data) => (data.content),
  pageAccesser: (data) => (data),
}

const mapStateToProps = (state) => ({
  page: state.CardListReducer.get('page'),
  sort: state.CardListReducer.get('sort'),
  search: state.CardListReducer.get('search'),
  data: state.CardListReducer.get('data'),
  requesting: state.CardListReducer.get('requesting'),
  error: state.CardListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);

export const reducers = {
  CardListReducer,
}
