import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title">
              Simple Account Manager
            </Typography>
          <div style={{flexGrow: 1}}/>
          <div style={{display: 'flex'}}>
            <IconButton aria-label="Show 4 new mails" color="inherit">
                  <MailIcon />
              </IconButton>
              <IconButton aria-label="Show 17 new notifications" color="inherit">
                  <NotificationsIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="Account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
