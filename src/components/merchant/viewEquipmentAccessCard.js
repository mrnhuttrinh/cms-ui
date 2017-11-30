import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 10,
  paddingBottom: 10,
};

const cardStyle = {
  padding: 10,
};

const titleStyle = {
  fontSize: '16px',
  color: '#00897b',
  paddingLeft: 0,
}


export default class EquipmentAccessCard extends React.Component {
  render() {
    return (
      <Row style={rowContainer}>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <Card style={cardStyle}>
                <Row>
                  <Col md={12}>
                    <CardTitle style={titleStyle}>
                      Ứng dụng - SCanteen - Khu A
                    </CardTitle>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <TextField
                      floatingLabelText="Mã số"
                      floatingLabelFixed
                      fullWidth
                      value="288816b1-369d-4d3f-8396-111111111111"
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Loại"
                      floatingLabelFixed
                      fullWidth
                      value="Mặc định"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <TextField
                      floatingLabelText="Khóa bảo mật"
                      floatingLabelFixed
                      fullWidth
                      value="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhjJlFINzSEjSUuqmdT9o0mN7GkePuASaFSJr7PbuXhu1NdTT8PeNBrh9kSrTFL9XkeLJbcD/t71DHm4YYGwb5z6n8fnuFt3nm6McaP0DOI/MmMMqTETlidbo1gZC0Sxnh0XqkrHBlwZ/2LMthiJWNMe41XNmLvc0yCOsSy7hXZTwvY2Tdh8hn97zAkglSQOrgZrBOgcJddqaokRP7BOZ6ZPzn44riJgtphmSV2byixMDkiP6XZBSMAoI35m93rdDE3n+DwBEPubKDSLhNQ91Z7LTkp99WKM5DYfyGuF1u/dIEnJpGp4qpBxBp5Z1Ynm2eeX2YyjK2suZk1bgP/TPVQIDAQAB"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Trạng thái"
                      floatingLabelFixed
                      fullWidth
                      value="ĐANG HOẠT ĐỘNG"
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Ngày hết hạn khóa"
                      floatingLabelFixed
                      fullWidth
                      value="5/11/2012"
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Cập nhật lúc"
                      floatingLabelFixed
                      fullWidth
                      value="07:30:55 5/11/2017"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FlatButton
                    style={{
                      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                      float: 'right',
                      border: 'solid 1px #009688'
                    }}
                    backgroundColor="#fff"
                    labelStyle={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      letterSpacing: '0.5px',
                      color: '#009688'
                    }}
                    label="Xem chi tiết" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <Card style={cardStyle}>
                <Row>
                  <Col md={12}>
                    <CardTitle style={titleStyle}>
                      Ứng dụng - SCanteen - Khu B
                    </CardTitle>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <TextField
                      floatingLabelText="Mã số"
                      floatingLabelFixed
                      fullWidth
                      value="288816b1-369d-4d3f-8396-29348a947b81"
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Loại"
                      floatingLabelFixed
                      fullWidth
                      value="Mặc định"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <TextField
                      floatingLabelText="Khóa bảo mật"
                      floatingLabelFixed
                      fullWidth
                      value="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhjJlFINzSEjSUuqmdT9o0mN7GkePuASaFSJr7PbuXhu1NdTT8PeNBrh9kSrTFL9XkeLJbcD/t71DHm4YYGwb5z6n8fnuFt3nm6McaP0DOI/MmMMqTETlidbo1gZC0Sxnh0XqkrHBlwZ/2LMthiJWNMe41XNmLvc0yCOsSy7hXZTwvY2Tdh8hn97zAkglSQOrgZrBOgcJddqaokRP7BOZ6ZPzn44riJgtphmSV2byixMDkiP6XZBSMAoI35m93rdDE3n+DwBEPubKDSLhNQ91Z7LTkp99WKM5DYfyGuF1u/dIEnJpGp4qpBxBp5Z1Ynm2eeX2YyjK2suZk1bgP/TPVQIDAQAB"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Trạng thái"
                      floatingLabelFixed
                      fullWidth
                      value="ĐANG HOẠT ĐỘNG"
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Ngày hết hạn khóa"
                      floatingLabelFixed
                      fullWidth
                      value="5/11/2012"
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      floatingLabelText="Cập nhật lúc"
                      floatingLabelFixed
                      fullWidth
                      value="07:30:55 5/11/2017"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FlatButton
                    style={{
                      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
                      float: 'right',
                      border: 'solid 1px #009688'
                    }}
                    backgroundColor="#fff"
                    labelStyle={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      letterSpacing: '0.5px',
                      color: '#009688'
                    }}
                    label="Xem chi tiết" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}