import React from 'react';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import UserForm from './userForm';


class AddNewUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleCanelButtonClick = this.handleCanelButtonClick.bind(this);
  }
  handleCanelButtonClick(indexRow, column, event) {
    this.props.history.push('/permission');
  }
  render() {
    const actions = [
      <FlatButton
        label={this.props.t('CANCEL')}
        primary={true}
        onClick={this.handleCanelButtonClick}
      />,
      <FlatButton
        label={this.props.t('Add')}
        primary={true}
        backgroundColor="#009688"
        labelStyle={{color: '#fff'}}
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
        </Dialog>
      </div>
    );
  }
}

export default translate('translations')(AddNewUser);
