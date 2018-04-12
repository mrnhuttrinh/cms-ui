import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import {
  CardTitle,
} from 'material-ui/Card';

import { AnimationGroup } from '../commons';

import * as actions from './actions';

const titleStyle = {
  fontSize: '16px',
  color: '#00897b',
  paddingLeft: 0,
}

const formatDate = (date) => (date ? moment(date).format('h:mm:ss DD/MM/YYYY') : 'N/A');

class GeneralInformation extends React.Component {

  componentWillMount() {
    const {
      match: {
        params: {
          merchantId
        }
      }
    } = this.props;
    this.props.actions.getMerchantDetail(merchantId);
  }
  render() {
    const {
      data = {
        address: {}
      },
    } = this.props;
    const {
      address = {}
    } = data;
    return (
      <Row className="merchant-wrapper">
        <AnimationGroup
          loading={this.props.requesting}
          errorLoading={this.props.error ? true : false}
        />
        <Col md={12} xs={12}>
          <Row>
            <Col md={12} xs={12}>
              <CardTitle style={titleStyle}>
                {this.props.t('Merchant information')}
              </CardTitle>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Name')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={data.name}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Phone')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={data.phone}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Email')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={data.email}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Status')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={this.props.t(data.status)}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Last login')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={formatDate(data.updatedAt)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <CardTitle style={titleStyle}>
              {this.props.t('Addresses')}
              </CardTitle>
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <TextField
                floatingLabelText={this.props.t('Line')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={address.line1}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <TextField
                floatingLabelText={this.props.t('State Province')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={address.line2}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <TextField
                floatingLabelText={this.props.t('City')}
                floatingLabelFixed
                readOnly
                fullWidth
                value={address.city}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const generalInformation = state.MerchantDetailReducer.get('generalInformation');
  return {
    requesting: generalInformation.get('requesting'),
    data: generalInformation.get('data'),
    error: generalInformation.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(GeneralInformation)));
