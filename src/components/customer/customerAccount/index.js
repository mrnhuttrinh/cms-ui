import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Card,
  CardActions,
  CardText
} from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import * as actions from './actions';

import AccoutDetailsComponent from '../../account/accountDetailsComponent';

class CustomerAccount  extends React.Component  {
  componentWillMount() {
    this.props.actions.getAccountByCustomerId(this.props.customerId);
  }
  renderCard(account, key) {
    return (
      <Card key={key}>
        <CardText>
          <AccoutDetailsComponent account={account} />
        </CardText>
        <CardActions style={{textAlign: 'right'}}>
          <RaisedButton containerElement={<Link to={`/account/${account.id}`} />} label="Xem chi tiết" style={{border: 'solid 1px #009688'}} labelColor='#009688'/>
        </CardActions>
      </Card>);
  }
  render () {
    if (this.props.data && this.props.data._embedded) {
      const accountsCard = _.map(this.props.data._embedded.accounts, this.renderCard);
      return (
        <div style={{padding:'20px 100px 20px 100px'}}>
          {accountsCard}
        </div>);
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  data: state.CustomerAccountReducer.get('accounts'),
  requesting: state.CustomerAccountReducer.get('requesting'),
  error: state.CustomerAccountReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerAccount);
