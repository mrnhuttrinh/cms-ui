import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as actions from '../../components/login/actions';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
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
      this.props.history.push('/login');
    });
  }
  render() {
    return (
      <header>
        <AppBar
          title="CMS"
          iconElementRight={<Logged signOut={this.signOut} />}
          onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AppBarHeader));