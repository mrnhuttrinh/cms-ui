import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import HotTub from 'material-ui/svg-icons/places/hot-tub';
import History from 'material-ui/svg-icons/action/history';

const styles = {
  container: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
  },
  containerMobile: {
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '-3em',
  },
  icon: {
      width: '9em',
      height: '9em',
  },
  message: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      opacity: 0.5,
      margin: '0 1em',
  },
  toolbar: {
      textAlign: 'center',
      marginTop: '2em',
  },
};

const goBack = () => {
  window.history.go(-1);
}

const NotFound = () => {
  return (
    <div>
      <div style={styles.message}>
          <HotTub style={styles.icon} />
          <h1>Not Found</h1>
          <div>Either you typed a wrong URL, or you followed a bad link.</div>
      </div>
      <div style={styles.toolbar}>
          <RaisedButton
              label="Quay lại"
              icon={<History />}
              onClick={goBack}
          />
      </div>
    </div>
  );
};

export default NotFound;
