import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { translate } from 'react-i18next';
import RefreshButton from './refreshButton';

const containterStyle = {
  height: '100%',
  minHeight: '100%',
};

const appBarStyle = {
  backgroundColor: '#d4d4d4',
  border: 'rgba(0, 0, 0, 0.12) 1px'
  // boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)'
};

const titleStyle = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: 20,
  height: '56px',
  lineHeight: '56px'
}

class ContentWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      children: props.children,
    }
    this.onClickRefreshButton = this.onClickRefreshButton.bind(this);
  }
  onClickRefreshButton() {
    this.context.forceReloadContent();
  }
  render () {
    const {
      title, iconElementRight, children, ...rest
    } = this.props;
    return (
      <div style={containterStyle}>
        <AppBar
          titleStyle={titleStyle}
          iconStyleRight={{
            marginTop: '4px'
          }}
          title={<span>{this.props.t(title)}</span>}
          style={appBarStyle}
          iconElementRight={<RefreshButton onClick={this.onClickRefreshButton} />}
          {...rest}
        />
        {this.props.children}
      </div>
    );
  }
}

ContentWrapper.contextTypes = {
  forceReloadContent: PropTypes.func,
};

export default translate('translations')(ContentWrapper);
