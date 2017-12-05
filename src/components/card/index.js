import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'material-ui/Tabs';
import { TabTemplate } from '../commons';
import { ContentWrapper, RefreshButton } from '../commons';
import * as actions from './actions';
import CardDetails from './cardDetails';
import CardDetailReducer from './reducers';
import CardTransaction from './cardTransaction';
import CardCustomer from './cardCustomer';

import CardHistoryReducer from './cardHistory/reducers';
import CardTransactionReducer from './cardTransaction/reducers';


const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)',
  minHeight: 'calc(100% - 64px)',
  position: 'relative',
};

const indicatorStyle = {
  backgroundColor: '#009688'
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
  }
  componentWillMount() {
    this.props.actions.getCard(this.props.match.params.cardId);
  }
  refreshData() {
    this.props.actions.getCard(this.props.match.params.cardId);
  }
  render() {
    return (
      <ContentWrapper
        title="Chi Tiết Khách Hàng"
        iconStyleLeft={{display: 'none'}}
        iconElementRight={<RefreshButton onClick={this.refreshData} />}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label="THÔNG TIN CHUNG & LỊCH SỬ HOẠT ĐỘNG" >
            <CardDetails card={this.props.card} cardId={this.props.match.params.cardId} />
          </Tab>
          <Tab style={tabStyle} label="KHÁCH HÀNG" >
            <CardCustomer customer={this.props.card ? this.props.card.customer : null} />
          </Tab>
          <Tab style={tabStyle} label="GIAO DỊCH" >
            <CardTransaction cardId={this.props.match.params.cardId} />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}


const mapStateToProps = (state) => ({
  card: state.CardDetailReducer.get('card'),
  requesting: state.CardDetailReducer.get('requesting'),
  error: state.CardDetailReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);


export const reducers = {
  CardDetailReducer,
  CardHistoryReducer,
  CardTransactionReducer,
};
