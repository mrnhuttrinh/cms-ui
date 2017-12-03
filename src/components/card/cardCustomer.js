import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { GENDER, COUNTRY } from './constants';
import { dateFormatter } from '../../utils';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class CustomerDetails  extends React.Component  {
  renderCard() {
    return (
      <div
        style={{padding:'20px 100px 20px 100px'}}
      >
        <Card>
          <CardTitle style={titleStyle}>
            Thông tin khách hàng
          </CardTitle>
          <CardText>
            <GridList
              cols={3}
              padding={5}
              cellHeight={56}
            >
              <TextField
                floatingLabelText="Họ"
                cols={2}
                value={this.props.customer.lastName}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                cols={1}
                floatingLabelText="Tên"
                value={this.props.customer.firstName}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                cols={1}
                floatingLabelText="Ngày sinh"
                value={dateFormatter(this.props.customer.dateOfBirth)}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                cols={1}
                floatingLabelText="Giới tính"
                value={GENDER[this.props.customer.gender]}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                floatingLabelText="Quốc tịch"
                value={this.props.customer.countryCode && COUNTRY[this.props.customer.countryCode] ? COUNTRY[this.props.customer.countryCode] : ''}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText="Nhóm"
                value={this.props.customer.occupation}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText="Khoa | Phòng ban"
                value={this.props.customer.position}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText="Chức vụ"
                value={this.props.customer.title}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText="Email"
                value={this.props.customer.email}
                floatingLabelFixed={true}
                cols={3}
                fullWidth
              />
              <TextField
                floatingLabelText="SDT di động"
                value={this.props.customer.phone1}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText="SDT khác"
                value={this.props.customer.phone2}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              </GridList>
            </CardText>
          <CardActions style={{textAlign: 'right'}}>
            <RaisedButton containerElement={<Link to={`/customer/${this.props.customer.id}`} />} label="Chi tiết"  backgroundColor="#009587" labelColor='#ffffff' />
          </CardActions>
        </Card>
      </div>)
  }
  render () {
    return this.props.customer ? this.renderCard() : null;
  }
}

CustomerDetails.defaultProps = {
  customer: null,
}


export default CustomerDetails;
