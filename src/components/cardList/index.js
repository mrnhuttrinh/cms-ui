import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CardListReducer from './reducers';
import * as actions from './actions';
import DataTable, { TYPE } from '../commons/table';
import { ContentWrapper } from '../commons';
import { translate } from 'react-i18next';

const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
}

const CARD_TYPE = {
  DEFAULT: 'DEFAULT',
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
      <ContentWrapper
        title="Card list"
        iconStyleLeft={{display: 'none'}}
      >
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
            height: 'calc(100% - 56px)',
            display: 'block',
          }}
        />
      </ContentWrapper>
    );
  }
}

CardList.defaultProps = {
  columns: [
    {
      key: 'cardCode',
      text: 'Card code',
      sort: 'ASC',
    },
    {
      key: 'account.accountName',
      text: 'account',
    },
    {
      key: 'cardType.typeCode',
      text: 'Type',
      type: TYPE.option,
      options: CARD_TYPE,
    },
    {
      key: 'account.customer.lastName',
      text: 'Last name',
    },
    {
      key: 'account.customer.firstName',
      text: 'First name',
    },
    {
      key: 'effectiveDate',
      text: 'Effective date',
      type: TYPE.date,
    },
    {
      key: 'expiryDate',
      text: 'Expiry date',
      type: TYPE.date,
    },
    {
      key: 'status',
      text: 'Status',
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
};

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

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList));

export const reducers = {
  CardListReducer,
}
