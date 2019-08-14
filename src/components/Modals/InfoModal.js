import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Consumer } from "../DataContext";
import { version } from "../../../package.json";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Typography, Grid } from "@material-ui/core";

export default function InfoModal(props) {
  const [maxWidth] = useState("lg");
  let fullScreen = false;
  window.innerWidth < 600 ? (fullScreen = true) : (fullScreen = false);

  function handleClose() {
    props.toggle();
  }

  return (
    <Consumer>
      {state => {
        return (
          <div>
            <Dialog
              open={props.show}
              onClose={handleClose}
              maxWidth={maxWidth}
              fullScreen={fullScreen}
            >
              <DialogTitle id="form-dialog-title">
                {state.data.strings.modalFieldConfig.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {state.data.strings.modalFieldConfig.description}
                </DialogContentText>

                <Grid container direction={"column"} spacing={3}>
                  <Grid item>version: {version}</Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  {state.data.strings.info.close}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }}
    </Consumer>
  );
}
