import React from 'react';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { TabTemplate } from '../commons';
import GeneralInformation from './viewGeneralInformation';
import EquipmentAccessCard from './viewEquipmentAccessCard';
import Report from './viewReport';
import { ContentWrapper } from '../commons';

import './styles.scss';

import MerchantDetailReducer from './reducers';

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)',
  minHeight: 'calc(100% - 56px)',
  position: 'relative',
};
const indicatorStyle = {
  backgroundColor: '#009688'
};
class MerchantDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'generalInfo',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <ContentWrapper
        title="Merchant details"
        iconElementLeft={
          <IconButton
            onClick={() => this.props.history.push('/merchant')}
            style={{ marginTop: '-4px'}}
          >
            <FontIcon
              color="#009688" className="material-icons">arrow_back</FontIcon>
          </IconButton>
        }
      >
        <TabTemplate
          inkBarStyle={indicatorStyle}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab style={tabStyle} label={this.props.t('general information')} value="generalInfo">
            <GeneralInformation />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('APPLICATIONS, MERCHANTS')} value="equipment">
            <EquipmentAccessCard />
          </Tab>
          <Tab style={tabStyle} label={this.props.t('merchant report')} value="report">
            <Report />
          </Tab>
          {/* <Tab style={tabStyle} label={this.props.t('history')} value="history">
            <History />
          </Tab> */}
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

export default withRouter(translate('translations')(MerchantDetail));

export const reducers = {
  MerchantDetailReducer,
};
