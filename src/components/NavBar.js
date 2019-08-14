import React, { Component } from "react";
import { Consumer } from "./DataContext";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import GitHubIcon from "../assets/GitHubIcon";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoIcon from "@material-ui/icons/Info";
import Dashboard from "@material-ui/icons/Dashboard";
//import AccountCircle from "@material-ui/icons/AccountCircle";

import InfoModal from "./Modals/InfoModal";
import SettingsModal from "./Modals/SettingsModal";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  state = {
    drawerOpened: false
  };

  openDrawer = () => {
    this.setState({
      drawerOpened: true
    });
  };

  closeDrawer = () => {
    this.setState({
      drawerOpened: false
    });
  };

  render() {
    return (
      <Consumer>
        {state => (
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.openDrawer}
              >
                <MenuIcon />
              </IconButton>

              <Typography>{state.data.strings.title}</Typography>

              <div style={{ flexGrow: 1 }} />

              <div style={{ display: "flex" }}>
                <Tooltip title={state.data.strings.titles.settings}>
                  <IconButton
                    color="inherit"
                    className="hideonmobile"
                    onClick={() => state.toggleSettingsModal()}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={state.data.strings.titles.info}>
                  <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className="hideonmobile"
                    onClick={() => state.toggleInfoModal()}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={state.data.strings.titles.github}>
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

                <SwipeableDrawer
                  open={this.state.drawerOpened}
                  onClose={this.closeDrawer}
                  onOpen={this.openDrawer}
                >
                  <div
                    className="drawer"
                    role="presentation"
                    onClick={this.closeDrawer}
                  >
                    <List>
                      <ListItem button>
                        <ListItemIcon>
                          <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                      </ListItem>
                    </List>

                    <Divider />

                    <List>
                      {/* 
                      <ListItem button>
                        <ListItemIcon>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary={"Account"} />
                      </ListItem>
                      */}

                      <ListItem
                        button
                        onClick={() => state.toggleSettingsModal()}
                      >
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} />
                      </ListItem>

                      <ListItem button onClick={() => state.toggleInfoModal()}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Info"} />
                      </ListItem>
                    </List>
                  </div>
                </SwipeableDrawer>
                <InfoModal
                  show={state.data.modals.showInfo}
                  toggle={() => state.toggleInfoModal()}
                />
                <SettingsModal
                  show={state.data.modals.showSettings}
                  toggle={() => state.toggleSettingsModal()}
                />
              </div>
            </Toolbar>
          </AppBar>
        )}
      </Consumer>
    );
  }
}
