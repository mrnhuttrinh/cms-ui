import React from 'react';
import AppBar from 'material-ui/AppBar';

const containterStyle = {
  height: '100%',
  minHeight: '100%',
};

const appBarStyle = {
  backgroundColor: '#e8e8e8',
  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)'
};

const titleStyle = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: 20,
  height: '56px',
  lineHeight: '56px'
}

class ContentWrapper  extends React.Component  {
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
          title={<span>{title}</span>}
          style={appBarStyle}
          iconElementRight={iconElementRight}
          {...rest}
        />
        {children}
      </div>
    );
  }
}

export default ContentWrapper;
