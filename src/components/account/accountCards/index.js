import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { dateFormatter, dateTimeFormatter } from '../../../utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AnimationGroup } from '../../commons';
import { GridList } from 'material-ui/GridList';

import * as actions from './actions';

const titleStyle = {
  
}

class AccountCard  extends React.Component {
  constructor() {
    super();
    this.renderCard = this.renderCard.bind(this);
  }
  componentWillMount() {
    this.props.actions.getCardsByAccountId(this.props.accountId);
  }
  renderCard(customerCard, key) {
    return (
      <Col md={6} className="account-card" key={key}>
        <Card>
        <CardTitle className="title">
          {this.props.t('Card information')}
        </CardTitle>
        <CardText>
          <GridList
            cols={12}
            padding={10}
            cellHeight={56}
          >
            <TextField
              floatingLabelText={this.props.t('Card code')}
              value={customerCard.cardCode}
              floatingLabelFixed={true}
              cols={9}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Type')}
              value={_.get(customerCard, 'cardType.description')}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Effective date')}
              value={dateFormatter(customerCard.effectiveDate)}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Expiry date')}
              value={dateFormatter(customerCard.expiryDate)}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Status')}
              value={this.props.t(customerCard.status)}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
            <TextField
              floatingLabelText={this.props.t('Updated at')}
              value={dateTimeFormatter(customerCard.updatedAt)}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
          </GridList>
        </CardText>
        <CardActions style={{textAlign: 'right'}}>
          <RaisedButton containerElement={<Link to={`/card/${customerCard.cardNumber}`} />} label={this.props.t('View details')}  backgroundColor="#009587" labelColor='#ffffff' />
        </CardActions>
      </Card>
    </Col>)
  }
  render () {
    if (this.props.data) {
      const customerCards = _.map(this.props.data._embedded.cards, this.renderCard);
      return (
        <Row className="account-card-container">
          {customerCards.length ? customerCards : 'This account does not have any card.'}
        </Row>);
    }
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%'}}>
        <AnimationGroup
          loading={this.props.requesting}
          errorLoading={this.props.error ? true : false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.AccountCardsReducer.get('cards'),
  requesting: state.AccountCardsReducer.get('requesting'),
  error: state.AccountCardsReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountCard));
