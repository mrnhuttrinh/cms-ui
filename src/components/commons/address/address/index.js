import React from 'react';
import EcTextField from '../textField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import "./index.css";

class Address extends React.Component{
  render() {
    return (
      <Grid className="ecash-common-address">
        <Row>
          <Col xs>
            <EcTextField className="full-width" meta={{}} label="Địa chỉ"/>
          </Col>
        </Row>
        <Row>
          <Col xs sm={8} md={9} lg={10}>
            <EcTextField className="full-width" meta={{}} label="Phường (Xã), Quận (Huyện)"/>
          </Col>
          <Col xs sm={4} md={3} lg={2}>
            <EcTextField className="full-width" meta={{}} label="Tỉnh, Thành Phố"/>
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default Address;
