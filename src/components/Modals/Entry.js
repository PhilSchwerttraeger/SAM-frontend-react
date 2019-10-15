import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Consumer } from "../DataContext";
import ConfigRow from "./ConfigRow";
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function SettingsModal(props) {
  const [maxWidth] = useState("lg");
  let fieldConfig = [];
  let fullScreen = null;
  window.innerWidth < 600 ? (fullScreen = true) : (fullScreen = false);

  function handleClose(state) {
    state.toggleEntryModal();
  }

  return (
    <Consumer>
      {state => {
        return (
          <div>
            <Dialog
              open={state.data.runtime.modals.showEntry}
              maxWidth={maxWidth}
              fullScreen={fullScreen}
            >
              <DialogTitle id="form-dialog-title">
                {state.data.strings.datatable.addNew}
              </DialogTitle>
              <DialogContent>

                {/* Table Row */}
                <Grid container direction={"column"} spacing={3}>
                  {state.data.fieldConfig.map(row => {

                    return <TextField
                      autoFocus
                      key={row.name}
                      label={row.name}
                      type="text"
                      value={this.state[row.name].value}
                      onChange={e => {
                        this.setState({
                          title: e.target.value
                        });
                      }}
                    />
                  })}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(state)} color="secondary">
                  {state.data.strings.fieldConfig.cancel}
                </Button>

                <Button
                  onClick={() => {
                    handleClose(state);

                    let newFieldConfig = fieldConfig.map(field => {
                      let config = state.data.fieldConfig.find(fieldConfig => {
                        if (
                          fieldConfig.values &&
                          fieldConfig.name === field.name
                        ) {
                          return fieldConfig.values;
                        }
                        return null;
                      });
                      if (config && config.values) {
                        field.values = config.values;
                      }
                      return field;
                    });
                    state.setFieldsConfig(newFieldConfig);
                  }}
                  color="primary"
                >
                  {state.data.strings.fieldConfig.save}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }}
    </Consumer>
  );
}
