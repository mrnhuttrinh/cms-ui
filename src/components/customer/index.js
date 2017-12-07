import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'material-ui/Tabs';
import { TabTemplate } from '../commons';
import { ContentWrapper, AnimationGroup } from '../commons';
import * as actions from './actions';
import CustomerDetails from './customerDetails';
import CustomerAccount from './customerAccount';
import CustomerHistory from './customerHistory';
import CustomerCards from './customerCards';

import CustomerDetailReducer from './reducers';
import CustomerAccountReducer from './customerAccount/reducers';
import CustomerCardReducer from './customerCards/reducers';
import CustomerHistoryReducer from './customerHistory/reducers';

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)',
  minHeight: 'calc(100% - 56px)',
  position: 'relative',
};

const indicatorStyle = {
  backgroundColor: '#009688'
};

class Customer extends React.Component {
  componentWillMount() {
    this.props.actions.getCustomer(this.props.match.params.customerId);
    this.props.actions.getAddressesByCustomerId(this.props.match.params.customerId);
    this.props.actions.getIdentifyDocsByCustomerId(this.props.match.params.customerId);
  }
  render() {
    return (
      <ContentWrapper
        title="Chi Tiết Khách Hàng"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label="THÔNG TIN CHUNG" >
            <CustomerDetails
              customer={this.props.customer}
              addresses={this.props.addresses}
              identifyDocuments={this.props.identifyDocuments}
            />
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <AnimationGroup
                loading={this.props.requesting}
                errorLoading={this.props.error ? true : false}
              />
            </div>
          </Tab>
          <Tab style={tabStyle} label="TÀI KHOẢN VÍ ĐIỆN TỬ" >
            <CustomerAccount customerId={this.props.match.params.customerId} />
          </Tab>
          <Tab style={tabStyle} label="Thẻ" >
            <CustomerCards customerId={this.props.match.params.customerId} />
          </Tab>
          <Tab style={tabStyle} label="LỊCH SỬ" >
            <CustomerHistory customerId={this.props.match.params.customerId} />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}


const mapStateToProps = (state) => ({
  customer: state.CustomerDetailReducer.get('customer'),
  addresses: state.CustomerDetailReducer.get('addresses'),
  identifyDocuments: state.CustomerDetailReducer.get('identifyDocuments'),
  requesting: state.CustomerDetailReducer.get('requesting'),
  error: state.CustomerDetailReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);


export const reducers = {
  CustomerDetailReducer,
  CustomerAccountReducer,
  CustomerCardReducer,
  CustomerHistoryReducer,
};
