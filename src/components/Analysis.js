import React, { Component } from 'react';
import { Consumer } from './DataContext';

export default class Analysis extends Component {
  render() {
    return (
      <Consumer>
        {state => {
          return (
            <h4 style={{fontWeight: 500}}>{state.strings.titles.analysis}</h4>
          )
        }}
      </Consumer>
    )
  }
}