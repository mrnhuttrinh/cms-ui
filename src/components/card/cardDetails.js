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
    return (<Row style={{padding:'20px 100px 20px 100px', minHeight: '100%'}} >
      <Col md={4} style={{padding:'20px'}}>
        <div  style={titleStyle}>{this.props.t('Card information')}</div>
        {this.renderCard()}
      </Col>
      <Col md={8} style={{borderLeft: '1px solid rgb(224, 224, 224)', padding:'20px'}}>
        <div  style={titleStyle}>{this.props.t('Card history')}</div>
        {this.renderCardHistoy()}
      </Col>
    </Row>)
  }
}

export default translate('translations')(CardDetails);
