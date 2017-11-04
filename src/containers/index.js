import React from 'react';
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Dashboard from '../components/dashboard';
import About from '../components/about';

const iconStyles = {
  marginRight: 24,
};

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const App = ({history}) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={<span style={styles.title}>E-Cash</span>}
        iconElementLeft={
          <IconButton>
            <FontIcon className="material-icons" style={iconStyles}>home</FontIcon>
          </IconButton>
        }
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <FontIcon className="material-icons" style={iconStyles}>reorder</FontIcon>
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" onClick={() => history.push('/')} />
            <MenuItem primaryText="More Info" onClick={() => history.push('/about')} />
          </IconMenu>
        }
      />
      <div style={{ margin: 20 }}>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/about" component={About} />
      </div>
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu>
            <MenuItem value={1} primaryText="All Broadcasts" />
            <MenuItem value={2} primaryText="All Voice" />
            <MenuItem value={3} primaryText="All Text" />
            <MenuItem value={4} primaryText="Complete Voice" />
            <MenuItem value={5} primaryText="Complete Text" />
            <MenuItem value={6} primaryText="Active Voice" />
            <MenuItem value={7} primaryText="Active Text" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Options" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    </div>
  </MuiThemeProvider>
)

export default App