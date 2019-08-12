import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '../assets/GitHubIcon'
import CategoriesModal from './CategoryConfig/CategoriesModal'
import { Consumer } from './DataContext'
import Tooltip from '@material-ui/core/Tooltip'

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

                
                <Tooltip 
                  title={state.data.strings.titles.settings}
                >
                  <IconButton 
                    color="inherit"
                    className="hideonmobile"
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                
                
                
                <Tooltip 
                  title={state.data.strings.titles.info}
                >
                  <IconButton 
                    aria-haspopup="true" 
                    color="inherit"
                    className="hideonmobile"
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                
                
                <Tooltip 
                  title={state.data.strings.titles.github}
                >
                  <IconButton 
                    edge="end" 
                    aria-haspopup="true" 
                    color="inherit"
                    href="https://github.com/PhilSchwerttraeger/SAM"
                    target="_blank"
                    className="hideonmobile"
                  >
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Toolbar>
          </AppBar>
        }
      </Consumer>
    )
  }
}
