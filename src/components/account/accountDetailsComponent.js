import React from 'react';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import { Row, Col } from 'react-flexbox-grid';
import { dateFormatter, dateTimeFormatter } from '../../utils';

const STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'KHÔNG HOẠT ĐỘNG',
};


const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

const AccoutDetailsComponent = (props) => (
  <Row>
    <Col md={6}>
      <span style={titleStyle}>
        Thông tin tài khoản
      </span>
      <GridList
        cols={12}
        padding={5}
        cellHeight={56}
      >
        <TextField
          floatingLabelText="Số tài khoản"
          value={props.account.id}
          floatingLabelFixed={true}
          cols={8}
          fullWidth
        />
        <TextField
          floatingLabelText="Loại"
          value={props.account.accountType.description}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText="Tên Tài Khoản"
          value={props.account.accountName}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText="Ngày mở"
          value={dateFormatter(props.account.dateOpened)}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText="Ngày đóng"
          value={dateFormatter(props.account.dateClosed)}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText="Loại tiền"
          value={props.account.currencyCode.text}
          floatingLabelFixed={true}
          cols={4}
          fullWidth
        />
        <TextField
          floatingLabelText="Trạng thái ví"
          value={STATUS[props.account.status]}
          floatingLabelFixed={true}
          cols={8}
          fullWidth
        />
        <TextField
          floatingLabelText="Số dư hiện tại"
          value={props.account.currentBalance}
          floatingLabelFixed={true}
          cols={6}
          fullWidth
        />
        <TextField
          floatingLabelText="Thời gian cập nhật gần nhất"
          value={dateTimeFormatter(props.account.updatedAt)}
          floatingLabelFixed={true}
          cols={6}
          fullWidth
        />
      </GridList>
    </Col>
    <Col md={6}>
      <span style={titleStyle}>Hạng ví</span>
      <GridList
        padding={5}
        cellHeight={56}
        cols={1}
      >
        <TextField
          floatingLabelText="Tên"
          value={props.account.plan.planType.description}
          floatingLabelFixed={true}
          cols={1}
          fullWidth
        />
        <TextField
          floatingLabelText="Chi tiết"
          value={props.account.plan.id}
          floatingLabelFixed={true}
          cols={1}
          fullWidth
        />
      </GridList>
    </Col>
  </Row>);

export default AccoutDetailsComponent;
