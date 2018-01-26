import React from 'react';
import { Tab } from 'material-ui/Tabs';
import './tab.scss';

class TabOverride extends React.Component {
  render() {
    return (
      <Tab
        className="tab-override-style"
        style={Object.assign({}, {backgroundColor: 'rgb(128, 203, 196)'}, this.props.style)}
        {...this.props}
      >
        {this.props.children}
      </Tab>
    );
  }
}

export default TabOverride;