import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import UserForm from './userForm';
import AddNewUserReducer from './reducers';
import * as actions from './actions';
import { AnimationGroup } from '../commons';
import { toastr } from 'react-redux-toastr';


class AddNewUser extends React.Component {
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
    this.props.actions.addNewUser(values).then(async () => {
      const {
        newUserError,
        newUserData,
      } = this.props;
      if (_.isEmpty(newUserError) && !_.isEmpty(newUserData)) {
        this.props.actions.cleanCache();
        this.props.history.push('/permission');
      } else {
        const errorObject = await newUserError.json();
        toastr.error(this.props.t('Add new user'), this.props.t(errorObject.status));
      }
    });
  }
  handleCanelButtonClick(indexRow, column, event) {
    this.props.history.push('/permission');
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
        label={this.props.t('Add')}
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
          title={this.props.t('Add New User')}
          actions={actions}
          modal={true}
          open={true}
        >
          <Row>
            <Col md={12} ms={12}>
              <UserForm />
            </Col>
          </Row>
          <AnimationGroup
            loading={this.props.newUserRequesting}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    addNewUser = {
      values: {},
      syncErrors: {}
    }
  } = state.form;
  const newUser = state.AddNewUserReducer.get('newUser');
  return {
    values: addNewUser.values,
    syncErrors: addNewUser.syncErrors,
    newUserRequesting: newUser.get('requesting'),
    newUserData: newUser.get('data'),
    newUserError: newUser.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('translations')(AddNewUser));

export const reducers = {
  AddNewUserReducer,
};
