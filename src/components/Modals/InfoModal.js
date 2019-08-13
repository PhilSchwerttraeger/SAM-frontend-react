import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Consumer } from "../DataContext";
import { Grid } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { version } from "../../../package.json";

export default function InfoModal(props) {
  const [open, setOpen] = useState(props.show);
  const [maxWidth] = useState("lg");
  let fullScreen = false;
  window.innerWidth < 600 ? (fullScreen = true) : (fullScreen = false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Consumer>
      {state => {
        return (
          <div>
            <Tooltip title={state.data.strings.modalFieldConfig.title}>
              <IconButton color="inherit" onClick={handleClickOpen}>
                <ViewColumnIcon />
              </IconButton>
            </Tooltip>

            <Dialog
              open={open}
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
                  {state.data.strings.modalFieldConfig.cancel}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }}
    </Consumer>
  );
}
