import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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
import { translate } from 'react-i18next';
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
    this.createNewWallet = this.createNewWallet.bind(this);
    this.disconnectWallet = this.disconnectWallet.bind(this);
  }
  componentWillMount() {
    this.props.actions.getWalletByCardId(this.props.cardId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createWalletCompleted || nextProps.disconnectWalletCompleted) {
      this.props.actions.getWalletByCardId(this.props.cardId);
    }
  }
  createNewWallet() {
    this.props.actions.createNewWallet(this.props.cardId);
  }
  disconnectWallet(e) {
    this.props.actions.disconnectWallet(e.target.offsetParent.id);
  }
  renderCard(wallet, key) {
    return (<Row>
      <Col md={10}>
        <Row>
          <Col md={3} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Wallet ID')}
              value={wallet.id}
              floatingLabelFixed
              readOnly
              fullWidth
            />
          </Col>
          <Col md={3} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Provider')}
              value={wallet.provider}
              floatingLabelFixed
              readOnly
              fullWidth
            />
          </Col>
          <Col md={3} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Type')}
              value={this.props.t(wallet.type)}
              floatingLabelFixed
              readOnly
              fullWidth
            />
          </Col>
          <Col md={3} xs={12}>
            <TextField
              floatingLabelText={this.props.t('Status')}
              value={this.props.t(wallet.status)}
              floatingLabelFixed
              readOnly
              fullWidth
            />
          </Col>
        </Row>
      </Col>
      <Col md={2} xs={12}>
        <RaisedButton
          id={wallet.id}
          label={this.props.t('Disconnect wallet')}
          labelColor='#b93221'
          style={{border: 'solid 1px #b93221', float: 'right', marginTop: '25px'}}
          onClick={this.disconnectWallet}
        />
      </Col>
      <Col md={1} xs={12}></Col>
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
              icon={<PlusIcon />}
              onClick={this.createNewWallet}
            />
          </div>
          <div className="card-wrapper">
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
  data: state.CardWalletReducer.get('wallets'),
  requesting: state.CardWalletReducer.get('requesting'),
  error: state.CardWalletReducer.get('error'),
  createWalletCompleted: state.CardWalletReducer.get('createWalletCompleted'),
  disconnectWalletCompleted: state.CardWalletReducer.get('disconnectWalletCompleted'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default translate('translations')(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardWallet));
