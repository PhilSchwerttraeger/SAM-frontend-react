import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Consumer } from './DataContext';

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    props.close();
  }
  
  return (
    <Consumer>
      {state => {
        return (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={<span>{props.message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        )}}
    </Consumer>
  )
}
