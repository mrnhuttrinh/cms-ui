import React from 'react';
import { translate } from 'react-i18next';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
import { dateFormatter } from '../../utils';

import {
  detailView
} from './styles';

class DetailView extends React.Component {
  render() {
    const { data = {} } = this.props; 
    return (
      <Row style={detailView.wrapRow}>
        <Col style={detailView.wrapCol} md={12}>
          <TextField
            floatingLabelText={this.props.t('Role Name')}
            floatingLabelFixed
            fullWidth
            value={this.props.t(data.name)}
          />
        </Col>
        <Col style={detailView.wrapCol} md={6}>
          <TextField
            floatingLabelText={this.props.t('Created date')}
            floatingLabelFixed
            fullWidth
            value={dateFormatter(data.createdAt)}
          />
        </Col>
        <Col style={detailView.wrapCol} md={6}>
          <TextField
            floatingLabelText={this.props.t('Updated at')}
            floatingLabelFixed
            fullWidth
            value={dateFormatter(data.updatedAt)}
          />
        </Col>
      </Row>
    );
  }
}

export default translate('translations')(DetailView);
