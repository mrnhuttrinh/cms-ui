import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import PlusIcon from 'material-ui/svg-icons/content/add';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { dateTimeFormatter } from '../../../utils';
import { AnimationGroup } from '../../commons';
import * as actions from './actions';

const groupControl = {
  display: 'block',
  padding: '14px 33px 49px',
  backgroundColor: '#e8e8e8',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 4px 4px 0px, rgba(0, 0, 0, 0.12) 0px 0px 4px 0px'
}

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class CardWallet  extends React.Component  {
  constructor() {
    super();
    this.renderCard = this.renderCard.bind(this);
  }
  componentWillMount() {
    this.props.actions.getWalletByCardId(this.props.cardId);
  }
  renderCard(wallet, key) {
    return (<Row>
      <Col md={10}>
        <Row>
          <Col md={3}>
            <TextField
              floatingLabelText={this.props.t('Wallet ID')}
              value={wallet.id}
              floatingLabelFixed={true}
              fullWidth
            />
          </Col>
          <Col md={3}>
            <TextField
              floatingLabelText={this.props.t('Provider')}
              value={wallet.provider}
              floatingLabelFixed={true}
              fullWidth
            />
          </Col>
          <Col md={3}>
            <TextField
              floatingLabelText={this.props.t('Type')}
              value={wallet.type}
              floatingLabelFixed={true}
              fullWidth
            />
          </Col>
          <Col md={3}>
            <TextField
              floatingLabelText={this.props.t('Status')}
              value={wallet.status}
              floatingLabelFixed={true}
              fullWidth
            />
          </Col>
        </Row>
      </Col>
      <Col md={2}>
        <RaisedButton
          id={wallet.id}
          label={this.props.t('Disconnect wallet')}
          labelColor='#b93221'
          style={{border: 'solid 1px #b93221', float: 'right', marginTop: '25px'}}
          labelColor='#b93221'
        />
      </Col>
      <Col md={1}></Col>
    </Row>);
  }
  render () {
    if (this.props.data && this.props.data._embedded) {
      const walletCards = _.map(this.props.data._embedded.wallets, this.renderCard);
      return (
        <div>
          <div style={groupControl}>
            <RaisedButton
              label={this.props.t('create and connect new wallet')}
              labelColor='#009688'
              style={{border: 'solid 1px #009688', float: 'right'}}
              labelColor='#009688'
              icon={<PlusIcon />}
            />
          </div>
          <div style={{padding:'20px 100px 20px 100px'}}>
            <Card>
              <CardTitle style={titleStyle}>
                {this.props.t('Wallet information')}
              </CardTitle>
              <CardText>
              {walletCards}
              </CardText>
            </Card>
          </div>
        </div>);
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
  data: state.CardWalletReducer.get('accounts'),
  requesting: state.CardWalletReducer.get('requesting'),
  error: state.CardWalletReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardWallet));
