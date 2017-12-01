import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { TabTemplate } from '../commons';
import GeneralInformation from './viewGeneralInformation';
import EquipmentAccessCard from './viewEquipmentAccessCard';
import Report from './viewReport';
import History from './viewHistory';
import { ContentWrapper, RefreshButton } from '../commons';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const tabStyle = {
  backgroundColor: 'rgb(128, 203, 196)',
  minHeight: 'calc(100% - 64px)',
  position: 'relative',
};
const indicatorStyle = {
  backgroundColor: '#009688'
};
export default class MerchantDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
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
        iconStyleLeft={{display: 'none'}}
        iconElementRight={<RefreshButton />}
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
          <Tab style={tabStyle} label="THÔNG TIN CHUNG" value="a">
            <GeneralInformation />
          </Tab>
          <Tab style={tabStyle} label="ỨNG DỤNG, THIẾT BỊ CHẬP NHẬN THẺ" value="b">
            <EquipmentAccessCard />
          </Tab>
          <Tab style={tabStyle} label="BÁO CÁO" value="c">
            <Report />
          </Tab>
          <Tab style={tabStyle} label="LỊCH SỬ" value="d">
            <History />
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}