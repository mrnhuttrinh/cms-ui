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
  zIndex: '100',
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
  // background: 'transparent'
}

const AnimationGroup = ({ loading, errorLoading, style }) => {
  if (loading) {
    return (
      <div
        style={Object.assign({}, inlineStyle, style, {
          transform: 'rotate(0deg)',
          backgroundColor: 'transparent',
        })}
      >
        <div
          style={Object.assign({}, inlineStyle, style, {
            transform: 'rotate(270deg)',
            backgroundColor: 'transparent',
          })}
        >
          <CircularProgress
            style={{
              position: 'absolute',
              width: '20px',
              margin: 'auto',
              height: '20px',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
            }}
            size={20}
            thickness={2}
          />
        </div>
        <div
          style={Object.assign({}, inlineStyle, style, {
            transform: 'rotate(180deg)',
            backgroundColor: 'transparent',
          })}
        >
          <CircularProgress
            style={{
              position: 'absolute',
              width: '40px',
              margin: 'auto',
              height: '40px',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
            }}
            size={40}
            thickness={3}
          />
        </div>
        <div
          style={Object.assign({}, inlineStyle, style, {
            transform: 'rotate(90deg)',
            backgroundColor: 'transparent',
          })}
        >
          <CircularProgress
            style={{
              position: 'absolute',
              width: '60px',
              margin: 'auto',
              height: '60px',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
            }}
            size={60}
            thickness={4}
          />
        </div>
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