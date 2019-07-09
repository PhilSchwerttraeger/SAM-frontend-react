import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export default class CategoriesModal extends Component {
  state = {
    open: false
  }
  
  handleOpen = () => {
    this.setState ({open: true});
  };

  handleClose = () => {
    this.setState ({open: false});
  };

  styleModal = () => {
    return {
      backgroundColor: "#FFF",
      margin: 32,
      padding: 16
    }
  }

  render() {
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={this.styleModal()}>
            <h2 id="modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            
            <div>
              <Button color="primary">Save</Button>
              <Button>Cancel</Button>
            </div>

          </div>
        </Modal>
      </div>
    )
  }
}
