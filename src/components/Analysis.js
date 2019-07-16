import React, { Component } from 'react';
import { Consumer } from './DataContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Analysis extends Component {
  render() {
    return (
      <Consumer>
        {state => {
          return (
            <div>
              <h4 style={{fontWeight: 500}}>{state.strings.titles.analysis}</h4>
              <Button variant="outlined" onClick={() => {this.refs.agGrid.api.deselectAll()}}>Clear Selection</Button>
            </div>
          )
        }}
      </Consumer>
    )
  }
}