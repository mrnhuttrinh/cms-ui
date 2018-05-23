import React from 'react';
import {Field } from 'redux-form';
import Subheader from 'material-ui/Subheader';
import { translate } from 'react-i18next';
import _ from 'lodash';
import FontIcon from 'material-ui/FontIcon';

import {
  TextField,
  FieldValidator,
  SelectField
} from '../commons';
import MenuItem from 'material-ui/MenuItem';

import { ADDRESS_TYPES } from '../../constants';
import { Row, Col } from 'react-flexbox-grid';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '20px',
  color: '#00897b',
  marginTop: 20,
}

class CustomerAddress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addAddress = this.addAddress.bind(this);
    this.removeAddress = this.removeAddress.bind(this);
  }
  getItemAddress() {
    const itemsStatus = _.map(ADDRESS_TYPES, (value, key) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return itemsStatus;
  }
  getAddressSymbol() {
    const addresses = this.props.addresses;

    if (
      _.find(addresses, address => address.addressType && address.addressType.typeCode === 'RESIDENT') &&
      _.find(addresses, address => address.addressType && address.addressType.typeCode === 'TEMPORARY')
    ) {
      return false;
    }
    return true;
  }
  addAddress() {
    const defaultAddress = {
      addressType: {
        typeCode: 'RESIDENT'
      },
      status: 'ACTIVE',
    };
    const defaultTemporary = {
      addressType: {
        typeCode: 'TEMPORARY'
      },
      status: 'ACTIVE',
    };

    const { fields, addresses } = this.props;

    if (!_.find(addresses, address => address.status === 'ACTIVE' && address.addressType.typeCode === 'RESIDENT')) {
      fields.insert(fields.length, Object.assign({}, defaultAddress));
      return;
    }
    if (!_.find(addresses, address => address.status === 'ACTIVE' && address.addressType.typeCode === 'TEMPORARY')) {
      fields.insert(fields.length, Object.assign({}, defaultTemporary));
      return;
    }
  }
  removeAddress(index) {
    const { fields } = this.props;

    const address = Object.assign({}, fields.get(index));
    address.status = 'INACTIVE';

    fields.remove(index);
    if (address.id) {
      // re-insert
      fields.insert(index, address);
    }
  }
  renderPlusSymbol() {
    if (this.getAddressSymbol()) {
      return (
        <Col md={6} className="address-block plus-block">
          <div className="plus-symbol" onClick={this.addAddress}>
            <FontIcon style={{fontSize: '50px'}} className="material-icons">add</FontIcon>
          </div>
        </Col>
      );
    }
    return null;
  }
  render() {
    const { fields } = this.props;
    return (
      <div>
        <Row>
          <Col md={12}>
            <div style={titleStyle} cols={1}>{this.props.t('Address')}</div>
          </Col>
        </Row>
        <Row>
          {
            fields.map((address, index) => {
              const addressData = fields.get(index);
              if (addressData && addressData.status === 'ACTIVE') {
                return (
                  <Col md={6} className="address-block">
                    <FontIcon
                      style={{
                        position: 'absolute',
                        right: 5,
                        top: 5,
                        cursor: 'pointer'
                      }}
                      className="material-icons"
                      onClick={() => this.removeAddress(index)}
                    >delete</FontIcon>
                    <Row>
                      <Col md={12}>
                        <Field
                          name={`${address}.line1`}
                          floatingLabelText={this.props.t('Line')}
                          floatingLabelFixed
                          fullWidth
                          component={TextField}
                          label={this.props.t('Line')}
                          validate={[FieldValidator.required]}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Field
                          name={`${address}.stateProvince`}
                          floatingLabelText={this.props.t('State Province')}
                          floatingLabelFixed
                          fullWidth
                          component={TextField}
                          label={this.props.t('State Province')}
                          validate={[FieldValidator.required]}
                        />
                      </Col>
                      <Col md={6}>
                        <Field
                          name={`${address}.city`}
                          floatingLabelText={this.props.t('City')}
                          floatingLabelFixed
                          fullWidth
                          component={TextField}
                          label={this.props.t('City')}
                          validate={[FieldValidator.required]}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Field
                          name={`${address}.addressType.typeCode`}
                          floatingLabelText={this.props.t('Type')}
                          floatingLabelFixed
                          fullWidth
                          component={SelectField}
                          children={this.getItemAddress()}
                          label={this.props.t('Type')}
                          validate={[FieldValidator.required]}
                        />
                      </Col>
                    </Row>
                  </Col>
                )
              }
              return null;
            })
          }
          {this.renderPlusSymbol()}
        </Row>
      </div>
    );
  }
}


export default translate('translations')(CustomerAddress);