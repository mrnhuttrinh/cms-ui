import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import NotFound from '../notFound';
import DataTable, { dataAccesser, TYPE } from '../commons/table';

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 20,
  paddingBottom: 20,
  position: 'relative',
  height: '100%'
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