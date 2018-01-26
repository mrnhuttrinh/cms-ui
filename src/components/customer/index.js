import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'material-ui/Tabs';
import { translate } from 'react-i18next';

import { TabTemplate } from '../commons';
import { ContentWrapper, AnimationGroup } from '../commons';
import * as actions from './actions';
import CustomerDetails from './customerDetails';
import CustomerAccount from './customerAccount';
import CustomerHistory from './customerHistory';

import CustomerDetailReducer from './reducers';
import CustomerAccountReducer from './customerAccount/reducers';
import CustomerHistoryReducer from './customerHistory/reducers';

import './styles.scss';


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
        title="Customer details"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate inkBarStyle={indicatorStyle}>
          <Tab style={tabStyle} label={this.props.t('general information')} >
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
          <Tab style={tabStyle} label={this.props.t('accounts')} >
            <CustomerAccount customerId={this.props.match.params.customerId} />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('history')} >
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

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer));


export const reducers = {
  CustomerDetailReducer,
  CustomerAccountReducer,
  CustomerHistoryReducer,
};
