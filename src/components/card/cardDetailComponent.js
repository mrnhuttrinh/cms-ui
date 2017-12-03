import React from 'react';
import TextField from 'material-ui/TextField';
import { dateFormatter, dateTimeFormatter } from '../../utils';
import { Row, Col } from 'react-flexbox-grid';

export const STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'KHÔNG HOẠT ĐỘNG',
};

const Card = (props) => (<Row>
  <Col md={6}>
    <TextField
      floatingLabelText="Số thẻ - Card Code"
      value={props.card.cardCode}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText="Loại"
      value={props.card.cardType.description}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText="Ngày hiệu lực"
      value={dateFormatter(props.card.effectiveDate)}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText="Ngày hết hạn"
      value={dateFormatter(props.card.expiryDate)}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText="Trạng thái thẻ"
      value={STATUS[props.card.status]}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
  <Col md={6}>
    <TextField
      floatingLabelText="Thời gian cập nhật gần nhất"
      value={dateTimeFormatter(props.card.updatedAt)}
      floatingLabelFixed={true}
      fullWidth
    />
  </Col>
</Row>);
export default Card;
