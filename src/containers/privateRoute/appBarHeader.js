import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as actionsLogin from '../../components/login/actions';
import * as actions from './actions';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    {/* <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" /> */}
    <MenuItem primaryText="Sign out" onClick={props.signOut}/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class AppBarHeader extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.actions.signOut().then(() => {
      // redirect if sign out success
      window.location.href = '/login';
    });
  }
  render() {
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
          iconElementRight={<Logged signOut={this.signOut} />}
          onLeftIconButtonTouchTap={this.props.actions.toggleLeftMenu}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions, actionsLogin), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AppBarHeader));