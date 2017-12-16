import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
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
            {this.props.t('Customer information')}
          </CardTitle>
          <CardText>
            <GridList
              cols={3}
              padding={5}
              cellHeight={56}
            >
              <TextField
                floatingLabelText={this.props.t('Last name')}
                cols={2}
                value={this.props.account.customer.lastName}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                cols={1}
                floatingLabelText={this.props.t('First name')}
                value={this.props.account.customer.firstName}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                cols={1}
                floatingLabelText={this.props.t('Birthday')}
                value={dateFormatter(this.props.account.customer.dateOfBirth)}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                cols={1}
                floatingLabelText={this.props.t('Gender')}
                value={this.props.t(`GENDER.${this.props.account.customer.gender}`)}
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Country')}
                value={this.props.t(this.props.account.customer.countryCode)}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Occupation')}
                value={this.props.account.customer.occupation}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Position')}
                value={this.props.account.customer.position}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Title')}
                value={this.props.account.customer.title}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Email')}
                value={this.props.account.customer.email}
                floatingLabelFixed={true}
                cols={3}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Phone1')}
                value={this.props.account.customer.phone1}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Phone2')}
                value={this.props.account.customer.phone2}
                floatingLabelFixed={true}
                cols={1}
                fullWidth
              />
              </GridList>
            </CardText>
          <CardActions style={{textAlign: 'right'}}>
            <RaisedButton containerElement={<Link to={`/customer/${this.props.account.customer.id}`} />} label={this.props.t('View details')}  backgroundColor="#009587" labelColor='#ffffff' />
          </CardActions>
        </Card>
      </div>)
  }
  render () {
    return this.props.account ? this.renderCard() : null;
  }
}

const mapStateToProps = (state) => ({
  account: state.AccountDetailReducer.get('account'),
  requesting: state.AccountDetailReducer.get('requesting'),
  error: state.AccountDetailReducer.get('error'),
});

export default translate('translations')(connect(
  mapStateToProps,
  null,
)(CustomerDetails));