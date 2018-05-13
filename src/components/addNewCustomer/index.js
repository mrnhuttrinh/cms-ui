import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import AddNewRoleReducer from './reducers';
import * as actions from './actions';
import { AnimationGroup } from '../commons';
import { toastr } from 'react-redux-toastr';
import AddCustomerForm from './addCustomerForm';

class AddNewRole extends React.Component {
  constructor(props) {
    super(props);
    this.handleCanelButtonClick = this.handleCanelButtonClick.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.actions.cleanCache();
  }
  onHandleSubmit() {
    const {
      values,
    } = this.props;
    this.props.actions.addNewRole(values).then(async () => {
      const {
        newRoleError,
        newRoleData,
      } = this.props;
      if (_.isEmpty(newRoleError) && !_.isEmpty(newRoleData)) {
        this.props.actions.cleanCache();
        this.props.history.push('/customer/a925445c-e62b-4d26-a73b-f7edcb5d7521');
      } else {
        const errorObject = await newRoleError.json();
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
        >
          <AnimationGroup
            loading={this.props.newRoleRequesting}
          />
          <AddCustomerForm />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    addNewRole = {
      values: {},
      syncErrors: {}
    }
  } = state.form;
  const newRole = state.AddNewRoleReducer.get('newRole');
  return {
    values: addNewRole.values,
    syncErrors: addNewRole.syncErrors,
    newRoleRequesting: newRole.get('requesting'),
    newRoleData: newRole.get('data'),
    newRoleError: newRole.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('translations')(AddNewRole));

export const reducers = {
  AddNewRoleReducer,
};
