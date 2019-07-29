import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Consumer } from '../DataContext';
import ConfigRow from './ConfigRow';
import { Grid } from '@material-ui/core';

export default function CategoriesModal() {
  const [open, setOpen] = useState(true);
  const [maxWidth] = useState('lg');
  let fieldConfig = [];

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }


  function handleSave() {
    setOpen(false);
  }


  function handleInputUpdate(field, isNew) {
    // newly added field (with no id)
    if(isNew){
      fieldConfig.push(field);
    } 
    
    // no new field: field update with id
    else {
      let alreadyAdded = false;
      fieldConfig = fieldConfig.map(oldField => {
        if(oldField.id === field.id){
          alreadyAdded = true;
          return field;
        } else {
          return oldField;
        }
      });

      if(!alreadyAdded){
        fieldConfig.push(field);
      }
    }
    //console.log(fieldConfig);
  }

  function deleteItem(){

  }

  return (
    <Consumer>
      {state => { 
      return(
        <div>
          <IconButton color="inherit" onClick={handleClickOpen}>
            <ViewColumnIcon />
          </IconButton>
          <Dialog 
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
          >
            <DialogTitle id="form-dialog-title">{state.data.strings.modalFieldConfig.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{state.data.strings.modalFieldConfig.description}</DialogContentText>

              <Grid container
                direction={'column'}
                spacing={3}
              >
                {state.data.fieldConfig.map(fieldConfig => (
                  <Grid item
                    key={fieldConfig.id}
                  >
                    <ConfigRow 
                      value={fieldConfig} 
                      strings={state.data.strings.modalFieldConfig}
                      isNew={false}

                      onChange={handleInputUpdate}
                      deleteItem={deleteItem}
                    />
                  </Grid>
                ))}

                <Grid item>
                  {/* 
                  Button for adding new field 
                  (add to backend and state 
                  
                  isNew={true}
                  */}
                      
                </Grid>

              </Grid>

            </DialogContent>
            <DialogActions>
              
              <Button 
                onClick={handleClose} 
                color="secondary"
              >
                {state.data.strings.modalFieldConfig.cancel}
              </Button>
              
              <Button 
                onClick={() => {
                  handleSave();
                  state.setFieldsConfig(fieldConfig);
                }}
                color="primary"
              >
                {state.data.strings.modalFieldConfig.save}
              </Button>

            </DialogActions>
          </Dialog>
        </div>
      )}}
    </Consumer>
  );
}