import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Consumer } from "../DataContext";
import { Typography } from "@material-ui/core";

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
                {state.data.strings.settings.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ marginBottom: "0" }}>
                  <Typography>{state.data.strings.settings.body}</Typography>
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  {state.data.strings.settings.close}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }}
    </Consumer>
  );
}
