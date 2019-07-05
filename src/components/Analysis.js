import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Analysis extends Component {
  render() {
    return (
      <div>
        <h4 style={{fontWeight: 500}}>{this.props.state.strings.titles.analysis}</h4>
      </div>
    )
  }
}

Analysis.propTypes = {
  state: PropTypes.object.isRequired
}