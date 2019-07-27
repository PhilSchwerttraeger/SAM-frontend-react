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

export default function CategoriesModal() {
  const [open, setOpen] = useState(false);
  const [maxWidth] = useState('lg');

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }


  function handleSave() {
    setOpen(false);
  }


  function handleInputUpdate() {
    
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
              <ConfigRow value="preset value" onChange={handleInputUpdate}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
              {state.data.strings.modalFieldConfig.cancel}
              </Button>
              <Button onClick={handleSave} color="primary">
              {state.data.strings.modalFieldConfig.save}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}}
    </Consumer>
  );
}