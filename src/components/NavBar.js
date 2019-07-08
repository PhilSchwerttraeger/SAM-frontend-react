import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="title">
              Simple Account Manager
            </Typography>
            <div style={{flexGrow: 1}}/>
            <div style={{display: 'flex'}}>
              <IconButton color="inherit">
                <ViewColumnIcon />
              </IconButton>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
              {/*
              <IconButton
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              */}
              <IconButton 
                edge="end" 
                aria-haspopup="true" 
                color="inherit"
              >
                <InfoIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
