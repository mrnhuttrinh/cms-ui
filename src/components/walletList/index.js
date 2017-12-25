import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import WalletListReducer from './reducers';
import * as actions from './actions';
import DataTable from '../commons/table';
import { ContentWrapper } from '../commons';
import { translate } from 'react-i18next';

class CardList extends React.Component {
  render() {
    return (
      <ContentWrapper
        title="Wallet list"
        iconStyleLeft={{display: 'none'}}
      >
        <DataTable
          columns={this.props.columns}
          sort={this.props.sort}
          data={this.props.data}
          getData={this.props.actions.getCardList}
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
      key: 'id',
      text: 'Wallet ID',
      sort: 'ASC',
    },
    {
      key: 'provider',
      text: 'Provider',
    },
    {
      key: 'type',
      text: 'Type',
    },
    {
      key: 'card.cardCode',
      text: 'Card',
    },
  ],
  sort: {
    key: 'id',
    type: 'ASC',
  },
  data: null,
  size: 10,
  search: {
    key: 'id',
  },
  dataAccesser: (data) => (data.content),
  pageAccesser: (data) => (data),
}

const mapStateToProps = (state) => ({
  page: state.WalletListReducer.get('page'),
  sort: state.WalletListReducer.get('sort'),
  search: state.WalletListReducer.get('search'),
  data: state.WalletListReducer.get('data'),
  requesting: state.WalletListReducer.get('requesting'),
  error: state.WalletListReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList));

export const reducers = {
  WalletListReducer,
}
