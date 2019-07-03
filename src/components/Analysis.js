import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Analysis extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.state.strings.titles.analysis}</h2>
      </div>
    )
  }
}

Analysis.propTypes = {
  state: PropTypes.object.isRequired
}