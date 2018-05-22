import React from 'react';
import {Field } from 'redux-form';
import Subheader from 'material-ui/Subheader';
import { translate } from 'react-i18next';
import FontIcon from 'material-ui/FontIcon';
import _ from 'lodash';
import {
  TextField,
  FieldValidator,
  DatePicker,
  SelectField
} from '../commons';
import MenuItem from 'material-ui/MenuItem';

import { IDENTITY_TYPES } from '../../constants';
import { Row, Col } from 'react-flexbox-grid';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '20px',
  color: '#00897b',
  marginTop: 20,
}

class CustomerIdentity extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addIdentity = this.addIdentity.bind(this);
    this.removeIdentity = this.removeIdentity.bind(this);
  }
  getItemIdentity() {
    const itemsStatus = _.map(IDENTITY_TYPES, (value, key) => (<MenuItem value={key} primaryText={this.props.t(value)} />));
    return itemsStatus;
  }
  getIdentitySymbol() {
    const indetifyCards = this.props.indetifyCards;

    if (
      _.find(indetifyCards, indetify => indetify.identifyDocumentType && indetify.identifyDocumentType.typeCode === 'IDENTIFY_CARD') && 
      _.find(indetifyCards, indetify => indetify.identifyDocumentType && indetify.identifyDocumentType.typeCode === 'PASSPORT_CARD')
    ) {
      return false;
    }
    return true;
  }
  addIdentity() {
    const defaultIdentityCard = {
      identifyDocumentType: {
        typeCode: 'IDENTIFY_CARD'
      },
      status: 'ACTIVE',
    };
    const defaultPassportCard = {
      identifyDocumentType: {
        typeCode: 'PASSPORT_CARD'
      },
      status: 'ACTIVE',
    };
    const { fields, indetifyCards } = this.props;

    if (!_.find(indetifyCards, indetify => indetify.status === 'ACTIVE' && indetify.identifyDocumentType.typeCode === 'IDENTIFY_CARD')) {
      fields.insert(fields.length, Object.assign({}, defaultIdentityCard));
      return;
    }
    if (!_.find(indetifyCards, indetify => indetify.status === 'ACTIVE' && indetify.identifyDocumentType.typeCode === 'PASSPORT_CARD')) {
      fields.insert(fields.length, Object.assign({}, defaultPassportCard));
      return;
    }
  }
  removeIdentity(index) {
    const { fields } = this.props;

    const indetifyCard = Object.assign({}, fields.get(index));
    indetifyCard.status = 'INACTIVE';

    fields.remove(index);
    if (indetifyCard.id) {
      // re-insert
      fields.insert(index, indetifyCard);
    }
  }
  renderPlusSymbol() {
    if (this.getIdentitySymbol()) {
      return (
        <Col md={6} className="identity-block plus-block">
          <div className="plus-symbol" onClick={this.addIdentity}>
            <FontIcon style={{fontSize: '50px'}} className="material-icons">add</FontIcon>
          </div>
        </Col>
      );
    }
    return null;
  }
  removeAddress(index) {
    const { fields } = this.props;
    fields.remove(index);
  }
  render() {
    const { fields } = this.props;
    return (
      <div>
        <Row>
          <Col md={12}>
            <div style={titleStyle} cols={1}>{this.props.t('Indetity card')}</div>
          </Col>
        </Row>
        <Row>
          {
            fields.map((indetifyCard, index) => {
              const indetifyCardData = fields.get(index);
              if (indetifyCardData && indetifyCardData.status === 'ACTIVE') {
                return (
                  <Col md={6} className="identity-block">
                    <FontIcon
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: 5,
                          cursor: 'pointer'
                        }}
                        className="material-icons"
                        onClick={() => this.removeIdentity(index)}
                      >delete</FontIcon>
                    <Row>
                      <Col md={6}>
                        <Field
                          name={`${indetifyCard}.number`}
                          floatingLabelText={this.props.t('Number')}
                          floatingLabelFixed
                          fullWidth
                          component={TextField}
                          label={this.props.t('Number')}
                          validate={[FieldValidator.required, FieldValidator.alphaNumeric]}
                        />
                      </Col>
                      <Col md={6}>
                        <Field
                          name={`${indetifyCard}.identifyDocumentType.typeCode`}
                          floatingLabelText={this.props.t('Type')}
                          floatingLabelFixed
                          fullWidth
                          component={SelectField}
                          children={this.getItemIdentity()}
                          label={this.props.t('Type')}
                          validate={[FieldValidator.required]}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Field
                          name={`${indetifyCard}.dateOfIssue`}
                          floatingLabelText={this.props.t('Date of issue')}
                          floatingLabelFixed
                          fullWidth
                          component={DatePicker}
                          label={this.props.t('Date of issue')}
                          validate={[FieldValidator.required]}
                          autoOk
                        />
                      </Col>
                      <Col md={6}>
                        <Field
                          name={`${indetifyCard}.dateOfExpiry`}
                          floatingLabelText={this.props.t('Date of expiry')}
                          floatingLabelFixed
                          fullWidth
                          component={DatePicker}
                          label={this.props.t('Date of expiry')}
                          autoOk
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Field
                          name={`${indetifyCard}.placeOfIssue`}
                          floatingLabelText={this.props.t('Place of issue')}
                          floatingLabelFixed
                          cols={4}
                          fullWidth
                          component={TextField}
                          label={this.props.t('Place of issue')}
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

export default translate('translations')(CustomerIdentity);