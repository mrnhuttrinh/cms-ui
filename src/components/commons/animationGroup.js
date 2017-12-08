import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import NotFound from '../notFound';

const inlineStyle = {
  height: '100%',
  width: '100%',
  display: 'block',
  position: 'absolute',
  top: '0px',
  left: '0px',
  zIndex: '9999',
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
  // background: 'transparent'
}

const AnimationGroup = ({ loading, errorLoading, style }) => {
  if (loading) {
    return (
      <div
        style={Object.assign({}, inlineStyle, style)}
      >
        <CircularProgress
          style={{
            position: 'absolute',
            width: '80px',
            margin: 'auto',
            height: '80px',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
          }}
          size={80}
          thickness={5}
        />
      </div>
    );
  }
  if (errorLoading) {
    return (
      <div
        style={Object.assign({}, inlineStyle, style, {background: '#fff'})}
      >
        <NotFound />
      </div>
    );
  }
  return null;
};

export default AnimationGroup;