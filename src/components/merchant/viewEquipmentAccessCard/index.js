import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import Application from './application';
import { dataAccesser } from '../../commons/table';
import { AnimationGroup } from '../../commons';

import * as actions from '../actions';

const rowContainer = {
  backgroundColor: '#fff',
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 20,
  paddingBottom: 20,
  position: 'relative',
  height: '100%'
};

class EquipmentAccessCard extends React.Component {
  componentWillMount() {
    const {
      match: {
        params: {
          merchantId
        }
      }
    } = this.props;
    this.props.actions.getMerchantTerminalByMerchantIdDetail(merchantId);
  }
  renderApplication() {
    const {
      data = {
        _embedded: []
      }
    } = this.props;
    const dataList = dataAccesser(data);
    return (
      <Col md={12}>
        {
          _.map(dataList, dt => {
            return (
              <Row>
                <Col md={12}>
                  <Application application={dt} />
                </Col>
              </Row>
            );
          })
        }
      </Col>
    );
  }
  render() {
    return (
      <Row style={rowContainer}>
        <AnimationGroup
          loading={this.props.requesting}
          errorLoading={this.props.error ? true : false}
        />
        {this.renderApplication()}
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const terminal = state.MerchantDetailReducer.get('terminal');
  return {
    requesting: terminal.get('requesting'),
    data: terminal.get('data'),
    error: terminal.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EquipmentAccessCard));
