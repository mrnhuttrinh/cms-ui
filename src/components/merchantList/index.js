import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MerchantListReducer from './reducers';
import * as actions from './actions';
import DataTable, { dataAccesser, TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';

const MERCHANT_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

class MerchantList extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }
  handleCellClick(indexRow, column, event) {
    this.props.history.push(`/merchant/${dataAccesser(this.props.data)[indexRow].id}`);
  }
  refreshData() {
    this.props.actions.getMerchants({size: this.props.size, page: this.props.page }, this.props.sort, this.props.search);
  }
  render() {
    return (
      <ContentWrapper
        title="Danh sách đại lý"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getMerchants}
          handleCellClick={this.handleCellClick}
          size={this.props.size}
          search={this.props.search}
          dataAccesser={this.props.dataAccesser}
          pageAccesser={this.props.pageAccesser}
          requesting={this.props.requesting}
          style={{
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
        />
      </ContentWrapper>
    );
  }
}

const buildAddress = (address) => {
  return `${address.line1} ${address.line2} ${address.city} ${address.country}`;
};

MerchantList.defaultProps = {
  columns: [
    {
      key: 'name',
      text: 'TÊN',
      sort: 'ASC',
    }, {
      key: 'phone',
      text: 'SĐT',
    }, {
      key: 'email',
      text: 'EMAIL',
    }, {
      key: 'address',
      text: 'ĐỊA CHỈ',
      formater: (data) => (data && data.address ? buildAddress(data.address) : ''),
    }, {
      key: 'status',
      text: 'TRẠNG THÁI',
      type: TYPE.option,
      options: MERCHANT_STATUS,
    }
  ],
  sort: {
    key: 'name',
    type: 'ASC',
  },
  search: {
    key: 'name',
  },
  data: null,
  size: 10,
}

const mapStateToProps = (state) => ({
  page: state.MerchantListReducer.get('page'),
  sort: state.MerchantListReducer.get('sort'),
  search: state.MerchantListReducer.get('search'),
  data: state.MerchantListReducer.get('data'),
  requesting: state.MerchantListReducer.get('requesting'),
  error: state.MerchantListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MerchantList);

export const reducers = {
  MerchantListReducer,
}
