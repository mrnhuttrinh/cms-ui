import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { TabTemplate } from '../commons';
import GeneralInformation from './viewGeneralInformation';
import EquipmentAccessCard from './viewEquipmentAccessCard';
import Report from './viewReport';
import History from './viewHistory';
import { ContentWrapper } from '../commons';

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
        title="Chi Tiết Đại Lý"
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
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab style={tabStyle} label="THÔNG TIN CHUNG" value="generalInfo">
            <GeneralInformation />
          </Tab>
          <Tab style={tabStyle} label="ỨNG DỤNG, THIẾT BỊ CHẬP NHẬN THẺ" value="equipment">
            <EquipmentAccessCard />
          </Tab>
          <Tab style={tabStyle} label="BÁO CÁO" value="report">
            <Report />
          </Tab>
          <Tab style={tabStyle} label="LỊCH SỬ" value="history">
            <History />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

export default withRouter(MerchantDetail);

export const reducers = {
  MerchantDetailReducer,
};
