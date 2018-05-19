import React from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, formValueSelector } from 'redux-form';
import _ from 'lodash';
import CustomerInformation from './customerInformation';
import CustomerAddress from './customerAddress';
import CustomerIdentity from './customerIdentity';
import CustomerStatus from './customerStatus';
import FlatButton from 'material-ui/FlatButton';

import * as actions from './actions';

class CustomerDetails  extends React.Component  {
  constructor(props) {
    super(props);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  onHandleSubmit() {
    const {
      actions: {
        updateNewCustomer,
        getCustomer,
        getAddressesByCustomerId,
        getIdentifyDocsByCustomerId
      },
      data
    } = this.props;

    updateNewCustomer(data).then(() => {
      getCustomer(data.customer.id);
      getAddressesByCustomerId(data.customer.id);
      getIdentifyDocsByCustomerId(data.customer.id);
    });
  }
  renderInformation() {
    return (
      <CustomerInformation />
    );
  }
  renderAddresses() {
    return (
      <FieldArray
        name="addresses"
        component={CustomerAddress}
        addresses={this.props.data.addresses}
      />
    );
  }
  renderIdentities() {
    return (
      <FieldArray
        name="indetifyCards"
        component={CustomerIdentity}
        indetifyCards={this.props.data.indetifyCards}
      />
    );
  }
  renderStatus() {
    return (
      <CustomerStatus />
    );
  }
  render () {
    const { pristine, submitting, requesting, syncErrors } = this.props;
    return (
      <div className="customer-detail">
        {this.renderInformation()}
        <hr className="separate-line" />
        {this.renderAddresses()}
        <hr className="separate-line" />
        {this.renderIdentities()}
        <hr className="separate-line" />
        {this.renderStatus()}
        <hr className="separate-line" />
        <FlatButton
          label={this.props.t('ADD')}
          primary={true}
          backgroundColor="#009688"
          labelStyle={{color: '#fff'}}
          onClick={this.onHandleSubmit}
          style={{float: 'right'}}
          disabled={pristine || submitting || requesting || !_.isEmpty(syncErrors)}
        />
      </div>
    );
  }
}

const selector = formValueSelector('updateCustomerForm');

const mapStateToProps = (state) => {
  const customerData = state.CustomerDetailReducer.get('customer');
  const addressesData = state.CustomerDetailReducer.get('addresses');
  const indetifyCardsData = state.CustomerDetailReducer.get('identifyDocuments');
  /**
   * Initilize data
   */
  let initialValues = null;
  if (customerData && addressesData && indetifyCardsData) {

    const addresses =_.get(addressesData, '_embedded.addresses', []);
    const indetifyCards = _.get(indetifyCardsData, '_embedded.indetifyCards', []);
    initialValues = {
      customer: Object.assign({}, {
        status: 'ACTIVE',
        countryCode: 'VN',
        customerType: {
          typeCode: 'DEFAULT'
        },
      }, customerData),
      addresses,
      indetifyCards,
    };

    /**
     * Update country code
     */
    initialValues.customer.countryCode = initialValues.customer.countryCode ? initialValues.customer.countryCode.toLocaleUpperCase() : null;

    /**
     * Convert datetime to display datepicker
     */
    initialValues.customer.updatedAt = initialValues.customer.updatedAt ? new Date(initialValues.customer.updatedAt) : null;
    initialValues.customer.dateOfBirth = initialValues.customer.dateOfBirth ? new Date(initialValues.customer.dateOfBirth) : null;
    _.map(initialValues.indetifyCards, indetifyCard => {
      indetifyCard.dateOfIssue = indetifyCard.dateOfIssue ? new Date(indetifyCard.dateOfIssue) : null;
      indetifyCard.dateOfExpiry = indetifyCard.dateOfExpiry ? new Date(indetifyCard.dateOfExpiry) : null;
    })
  }

  const {
    updateCustomerForm = {
      values: {},
      syncErrors: {}
    }
  } = state.form;
  return {
    requesting: state.CustomerDetailReducer.get('updateCustomer').get('requesting'),
    initialValues,
    data: {
      customer: selector(state, 'customer'),
      addresses: selector(state, 'addresses'),
      indetifyCards: selector(state, 'indetifyCards'),
    },
    syncErrors: updateCustomerForm.syncErrors,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'updateCustomerForm',
})(translate('translations')(CustomerDetails)));

