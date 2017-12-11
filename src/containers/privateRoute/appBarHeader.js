import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as actionsLogin from '../../components/login/actions';
import * as actions from './actions';
import {
  SUBMIT_LOGIN,
} from '../../components/login/constants';
import { parseStringToObjectJson } from '../../utils';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Ngôn ngữ"
      rightIcon={<ArrowDropRight />}
      menuItems={[
        <MenuItem
          primaryText="Tiếng việt"
          insetChildren={true}
          checked={props.language === 'vn'}
          onClick={() => props.languageSetting('vn')}
        />,
        <MenuItem
          primaryText="Tiếng anh"
          insetChildren={true}
          checked={props.language === 'en'}
          onClick={() => props.languageSetting('en')}
        />,
      ]}
    />
    <Divider />
    <MenuItem primaryText="Sign out" onClick={props.signOut}/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class AppBarHeader extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.languageSetting = this.languageSetting.bind(this);
  }
  languageSetting(language) {
    const {
      userData = {
        user: {}
      }
    } = this.props;
    const data = userData.user || {
      roles: [],
    };
    this.props.actions.languageSetting(data.id, 'language', language).then(() => {
      const { languageSettingData } = this.props;
      this.props.dispatch({
        type: `${SUBMIT_LOGIN}_COMPLETED`,
        data: {
          data: languageSettingData,
        },
      });
    });
  }

  signOut() {
    this.props.actions.signOut().then(() => {
      // redirect if sign out success
      window.location.href = '/login';
    });
  }
  render() {
    const {
      userData = {
        user: {}
      }
    } = this.props;
    const data = userData.user || {
      roles: [],
    };
    const language = (parseStringToObjectJson(data.setting)).language;
    return (
      <header>
        <AppBar
          style={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: '#80cbc4',
            boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)'
          }}
          title={<Link style={{textDecoration: 'none', color: '#fff'}} to="/">CMS</Link>}
          iconElementRight={<Logged language={language} signOut={this.signOut} languageSetting={this.languageSetting} />}
          onLeftIconButtonTouchTap={this.props.actions.toggleLeftMenu}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const languageSetting = state.privateRouteReducers.get('languageSetting');
  return {
    languageSettingRequesting: languageSetting.get('requesting'),
    languageSettingData: languageSetting.get('data'),
    languageSettingError: languageSetting.get('error'),
    userData: state.loginReducer.get('data')
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(Object.assign({}, actions, actionsLogin), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AppBarHeader));