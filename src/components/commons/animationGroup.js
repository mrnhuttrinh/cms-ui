import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

const AnimationGroup = ({ contentLoading, children }) => {
  if (!contentLoading) {
    return children;
  }
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'block',
        position: 'relative',
      }}
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
};

export default AnimationGroup;