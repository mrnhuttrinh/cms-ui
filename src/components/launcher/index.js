import React from 'react';
import { connect } from 'react-redux';
import { UI_ROUTES_LEFT_SIDE_MENU } from '../../constants';

class Launcher extends React.Component{
  componentWillMount() {
    let navigateToURL = '/';
    const keys = Object.keys(UI_ROUTES_LEFT_SIDE_MENU);
    for (let i = 0; i < keys.length; i ++) {
      const ui_route = UI_ROUTES_LEFT_SIDE_MENU[keys[i]];
      if (!ui_route.permission || this.props.data.permissions.indexOf(ui_route.permission) > -1) {
        navigateToURL = ui_route.url;
        break;
      }
    }
    this.props.history.push(navigateToURL);
  }
  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  data: state.loginReducer.get('data'),
});


export default connect(
  mapStateToProps,
  null,
)(Launcher);
