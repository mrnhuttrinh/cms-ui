import React from 'react';
import { Tabs } from 'material-ui/Tabs';

import './tabTemplate.scss';


const indicatorStyle = {
  backgroundColor: '#009688'
};


// https://github.com/mui-org/material-ui/issues/2085

class TabTemplate extends React.Component {
  render() {
    if (!this.props.selected) {
      return null;
    }
    return this.props.children;
  }
}

export default class TabsExampleControlled extends React.Component {
  render() {
    return (
      <Tabs
        inkBarStyle={indicatorStyle}
        className="tabs-root-styles"
        contentContainerClassName="content-container-className"
        tabTemplate={TabTemplate}
      >
        {this.props.children}
      </Tabs>
    );
  }
}