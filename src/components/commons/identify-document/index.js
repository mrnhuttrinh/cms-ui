import React from 'react';
import EcTextField from '../textField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import "./index.scss";

class Address extends React.Component{
  render() {
    return (
      <Grid className="ecash-common-identify-document">
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <EcTextField className="full-width" meta={{}} label="Mã số"/>
          </Col>
          <Col xs={12} sm={6} md={3} lg={2}>
            <EcTextField className="full-width" meta={{}} label="Ngày cấp"/>
          </Col>
          <Col xs={12} sm={6} md={3} lg={2}>
            <EcTextField className="full-width" meta={{}} label="Ngày hết hạn"/>
          </Col>
          <Col xs={12} sm={12} md={6} lg={5}>
            <EcTextField className="full-width" meta={{}} label="Nơi Cấp"/>
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default Address;
