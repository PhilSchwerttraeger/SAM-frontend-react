import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '../assets/GitHubIcon';
//import SimpleDialogDemo from './FieldConfigDialog';
import CategoriesModal from './CategoryConfig/CategoriesModal';
import { Consumer } from './DataContext';

export default class NavBar extends Component {
  render() {
    return (
      <Consumer>
        {state => 
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit">
                <MenuIcon />
              </IconButton>
              <Typography>
                {state.data.strings.title}
              </Typography>
              <div style={{flexGrow: 1}}/>
              <div style={{display: 'flex'}}>
                <CategoriesModal />
                <IconButton color="inherit">
                  <SettingsIcon />
                </IconButton>
                <IconButton 
                  aria-haspopup="true" 
                  color="inherit"
                >
                  <InfoIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-haspopup="true" 
                  color="inherit"
                  href="https://github.com/PhilSchwerttraeger/SAM"
                  target="_blank" 
                >
                  <GitHubIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        }
      </Consumer>
    )
  }
}
