import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { translate } from 'react-i18next';
import RefreshButton from './refreshButton';

import './contentWrapper.scss';

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
  renderChildren() {
    if (this.props.appBarDisabled) {
      return (
        <div className="content-children-not-bar">
          {this.props.children}
        </div>
      );
    }
    return  (
      <div className="content-children">
        {this.props.children}
      </div>
    );
  }
  render () {
    const {
      title, iconElementRight, children, appBarDisabled, ...rest
    } = this.props;
    return (
      <div className="content-wrapper-style">
        { 
          appBarDisabled ? null : (
            <AppBar
              titleStyle={titleStyle}
              iconStyleRight={{
                marginTop: '4px'
              }}
              title={<span>{this.props.t(title)}</span>}
              className="appbar-style"
              iconElementRight={<RefreshButton onClick={this.onClickRefreshButton} />}
              {...rest}
            />
          )
        }
        {this.renderChildren()} 
      </div>
    );
  }
}

ContentWrapper.contextTypes = {
  forceReloadContent: PropTypes.func,
};

export default translate('translations')(ContentWrapper);
