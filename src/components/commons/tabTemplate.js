import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

// https://github.com/mui-org/material-ui/issues/2085

class TabTemplate extends React.Component {
  render() {
      if (!this.props.selected) {
          return null;
      }
      return this.props.children;
  }
}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  get styles() {
    return {
        root: {
            flex: '1 1 100%',
            minHeight: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        container: {
            flex: '1 1 100%;',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'visible',
            background: '#fff'
        }
    };
  }

  render() {
    const {
      style,
      contentContainerStyle,
    } = this.props;
    const rootStyle = Object.assign({}, this.styles.root, style);
    const overrideContainerStyle = Object.assign({}, this.styles.container, contentContainerStyle);
    return (
      <Tabs
        style={rootStyle}
        contentContainerStyle={overrideContainerStyle}
        tabTemplate={TabTemplate}
      >
        {this.props.children}
      </Tabs>
    );
  }
}