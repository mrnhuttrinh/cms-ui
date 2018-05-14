import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import AddNewCustomerReducer from './reducers';
import * as actions from './actions';
import { AnimationGroup } from '../commons';
import { toastr } from 'react-redux-toastr';
import AddCustomerForm from './addCustomerForm';

class AddNewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.handleCanelButtonClick = this.handleCanelButtonClick.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.actions.cleanCache();
  }
  componentWillUnmount() {
    this.props.actions.cleanCache();
  }
  onHandleSubmit() {
    const {
      values,
    } = this.props;
    // const customer = Object.assign({}, values);

    // /** parse value */
    // customer.addresses[0] = customer.address;
    // delete customer.address;

    // customer.identifyDocuments[0] = customer.indetifyCard;
    // delete customer.indetifyCard;

    // customer.identifyDocuments[1] = customer.passportCard;
    // delete customer.passportCard;

    this.props.actions.addNewCustomer(values).then(async () => {
      const {
        addCustomerError,
        addCustomerData
      } = this.props;
      if (_.isEmpty(addCustomerError) && !_.isEmpty(addCustomerData)) {
        this.props.actions.cleanCache();
        this.props.history.push(`/customer/${addCustomerData.id}`);
      } else {
        const errorObject = await addCustomerError.json();
        toastr.error(this.props.t('Add new customer'), this.props.t(errorObject.status));
      }
    });
  }
  handleCanelButtonClick(indexRow, column, event) {
    this.props.history.push('/customer');
  }
  render() {
    const {
      syncErrors,
      values,
    } = this.props;
    const actions = [
      <FlatButton
        label={this.props.t('CANCEL')}
        primary={true}
        onClick={this.handleCanelButtonClick}
      />,
      '  ',
      <FlatButton
        label={this.props.t('ADD')}
        primary={true}
        backgroundColor="#009688"
        labelStyle={{color: '#fff'}}
        onClick={this.onHandleSubmit}
        disabled={_.isEmpty(values) || !_.isEmpty(syncErrors)}
      />,
    ];

    const customContentStyle = {
      width: '80%',
      maxWidth: 'none',
    };
    return (
      <div>
        <Dialog
          title={this.props.t('Add new customer')}
          actions={actions}
          modal={true}
          open={true}
          contentStyle={customContentStyle}
          autoScrollBodyContent
        >
          <AnimationGroup
            loading={this.props.addCustomerRequesting}
          />
          <AddCustomerForm />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    addCustomerForm = {
      values: {},
      syncErrors: {}
    }
  } = state.form;
  const addCustomer = state.AddNewCustomerReducer.get('addCustomer');
  return {
    values: addCustomerForm.values,
    syncErrors: addCustomerForm.syncErrors,
    addCustomerRequesting: addCustomer.get('requesting'),
    addCustomerData: addCustomer.get('data'),
    addCustomerError: addCustomer.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('translations')(AddNewCustomer));

export const reducers = {
  AddNewCustomerReducer,
};
