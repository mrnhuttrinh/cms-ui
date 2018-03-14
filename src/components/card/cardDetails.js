import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import Card from './cardDetailComponent';
import CardHistory from './cardHistory';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class CardDetails extends React.Component {

  renderCard() {
    if (!this.props.card) {
      return null;
    }
    return (<Card card={this.props.card} />);
  }
  renderCardHistoy() {
    return (<CardHistory cardId={this.props.cardId} />);
  }
  render () {
    return (<Row className="card-detail-container" >
      <Col md={4} xs={12} className="card-detail">
        <div style={titleStyle}>{this.props.t('Card information')}</div>
        {this.renderCard()}
      </Col>
      <Col md={8} xs={12} className="card-history">
        <div style={titleStyle}>{this.props.t('Card history')}</div>
        {this.renderCardHistoy()}
      </Col>
    </Row>)
  }
}

export default translate('translations')(CardDetails);
