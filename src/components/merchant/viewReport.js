import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import NotFound from '../notFound';

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 0,
  marginRight: 0
};

export default class Report extends React.Component {
  render() {
    return (
      <Row style={rowContainer}>
        <Col md={12}>
          <NotFound />
        </Col>
      </Row>
    );
  }
}