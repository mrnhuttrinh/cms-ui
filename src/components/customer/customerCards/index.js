import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';
import { dateFormatter, dateTimeFormatter } from '../../../utils';
import { STATUS } from './constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AnimationGroup } from '../../commons';
import { GridList } from 'material-ui/GridList';

import * as actions from './actions';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class CustomersCard  extends React.Component {
  componentWillMount() {
    this.props.actions.getCardsByCustomerId(this.props.customerId);
  }
  renderCard(customerCard, key) {
    return (
      <Col md={6} style={{padding:'10px 46px 10px 46px'}} key={key}>
        <Card>
        <CardTitle style={titleStyle}>
          Thông tin thẻ
        </CardTitle>
        <CardText>
          <GridList
            cols={12}
            padding={10}
            cellHeight={56}
          >
            <TextField
              floatingLabelText="Số thẻ - Card code"
              value={customerCard.cardCode}
              floatingLabelFixed={true}
              cols={9}
              fullWidth
            />
            <TextField
              floatingLabelText="Loại"
              value={_.get(customerCard, 'cardType.description')}
              floatingLabelFixed={true}
              cols={3}
              fullWidth
            />
            <TextField
              floatingLabelText="Ngày hiệu lực"
              value={dateFormatter(customerCard.effectiveDate)}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
            <TextField
              floatingLabelText="Ngày hết hạn"
              value={dateFormatter(customerCard.expiryDate)}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
            <TextField
              floatingLabelText="Trạng thái thẻ"
              value={STATUS[customerCard.status]}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
            <TextField
              floatingLabelText="Thời gian cập nhật gần nhất"
              value={dateTimeFormatter(customerCard.updatedAt)}
              floatingLabelFixed={true}
              cols={6}
              fullWidth
            />
          </GridList>
        </CardText>
        <CardActions style={{textAlign: 'right'}}>
          <RaisedButton containerElement={<Link to={`/card/${customerCard.cardNumber}`} />} label="Chi tiết"  backgroundColor="#009587" labelColor='#ffffff' />
        </CardActions>
      </Card>
    </Col>)
  }
  render () {
    if (this.props.data) {
      const customerCards = _.map(this.props.data._embedded.cards, this.renderCard);
      return (
        <Row style={{padding:'20px 100px 20px 100px'}}>
          {customerCards}
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
  data: state.CustomerCardReducer.get('cards'),
  requesting: state.CustomerCardReducer.get('requesting'),
  error: state.CustomerCardReducer.get('error'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomersCard);
