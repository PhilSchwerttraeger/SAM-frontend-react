import React, { useState } from "react";
import Button from "@material-ui/core/Button";
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
  var contextState;

  function handleClose() {
    props.toggle();
  }

  function handleInputUpdate(field, isNew) {
    // newly added field (with no id)
    if (isNew) {
      fieldConfig.push(field);
    }

    // no new field: field update with id
    else {
      let alreadyAdded = false;
      fieldConfig = fieldConfig.map(oldField => {
        if (oldField.id === field.id) {
          alreadyAdded = true;
          return field;
        } else {
          return oldField;
        }
      });

      if (!alreadyAdded) {
        fieldConfig.push(field);
      }
    }
    //console.log(fieldConfig);
  }

  function deleteItem(id) {
    fieldConfig = fieldConfig.filter(field => field.id !== id);
    console.log(fieldConfig);
    contextState.deleteFieldConfig(id);
  }

  return (
    <Consumer>
      {state => {
        contextState = state;
        let tableRows;
        if (state && state.data && state.data.fieldConfig) {
          tableRows = state.data.fieldConfig.map(fieldConfig => (
            <Grid item key={fieldConfig.id}>
              <ConfigRow
                value={fieldConfig}
                strings={state.data.strings.fieldConfig}
                isNew={false}
                onChange={handleInputUpdate}
                deleteItem={deleteItem}
              />
            </Grid>
          ));
        }

        return (
          <div>
            <Dialog
              open={props.show}
              onClose={handleClose}
              maxWidth={maxWidth}
              fullScreen={fullScreen}
            >
              <DialogTitle id="form-dialog-title">
                {state.data.strings.fieldConfig.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {state.data.strings.fieldConfig.description}
                </DialogContentText>

                {/* Table Row */}
                <Grid container direction={"column"} spacing={3}>
                  {tableRows}

                  {/* Add New Row */}
                  <Grid item>
                    <Button
                      onClick={() => state.addEmptyFieldConfig()}
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      <AddIcon />
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  {state.data.strings.fieldConfig.cancel}
                </Button>

                <Button
                  onClick={() => {
                    handleClose();

                    let newFieldConfig = fieldConfig.map(field => {
                      // generate names + make first letter lowercase and remove spaces
                      //field.name = field.title.replace(" ", "");
                      //field.name = field.name.charAt(0).toLowerCase() + field.name.slice(1);

                      // copy over values property (if present; cases: type, interval)
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
                    //console.log(newFieldConfig);
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
