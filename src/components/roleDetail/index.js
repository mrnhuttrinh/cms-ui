import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import * as actions from './actions';
import RoleDetailReducer from './reducers';

import { Row, Col } from 'react-flexbox-grid';
import {
  Tab,
} from 'material-ui/Tabs';

import {
  TabTemplate,
  AnimationGroup,ContentWrapper
} from '../commons';

import DetailView from './detailView';
import TablePermission from './tablePermission';

import {
  tabStyle,
  indicatorStyle,
  rowContainer,
  leftColumn,
  rightColumn,
} from './styles';

class RoleDetail extends React.Component {
  componentWillMount() {
    // fetch user detail
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;
    this.props.actions.getRoleDetail(id);
    this.props.actions.getAllPermission();
  }
  render() {
    const {
      roleData = {},
      match: {
        params: {
          id
        }
      }
    } = this.props;
    return (
      <ContentWrapper
        title="Role detail"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label={this.props.t('general information')} >
            <AnimationGroup
              loading={this.props.roleRequesting}
              errorLoading={this.props.roleError ? true : false}
            />
            <Row style={rowContainer}>
              <Col md={4} style={leftColumn}>
                <DetailView data={roleData} />
              </Col>
              <Col md={8} style={rightColumn}>
                <TablePermission roleId={id} roleData={roleData} />
              </Col>
            </Row>
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const roleDetail = state.RoleDetailReducer.get('roleDetail');
  return {
    roleRequesting: roleDetail.get('requesting'),
    roleData: roleDetail.get('data'),
    roleError: roleDetail.get('error'),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('translations')(RoleDetail));

export const reducers = {
  RoleDetailReducer,
}