import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import RoleForm from './roleForm';
import AddNewRoleReducer from './reducers';
import * as actions from './actions';
import { AnimationGroup } from '../commons';
import { toastr } from 'react-redux-toastr';


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
        this.props.history.push('/role');
      } else {
        const errorObject = await newRoleError.json();
        toastr.error(this.props.t('Add new role'), this.props.t(errorObject.status));
      }
    });
  }
  handleCanelButtonClick(indexRow, column, event) {
    this.props.history.push('/role');
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
    return (
      <div>
        <Dialog
          title={this.props.t('Add New Role')}
          actions={actions}
          modal={true}
          open={true}
        >
          <Row>
            <Col md={12} ms={12}>
              <RoleForm />
            </Col>
          </Row>
          <AnimationGroup
            loading={this.props.newRoleRequesting}
          />
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
