import React, { Component } from 'react'

export default class AnalysisFragment extends Component {
  render() {
    // eslint-disable-next-line
    let result = 0;

    switch (this.props.type) {
      case "sum":
        this.result = 0;
        this.props.values.forEach(element => {
          this.result += element;
        });
      
      break;
    
      default:
        break;
    }

    return (
      <div>
        <h3 style={{textTransform: "capitalize"}}>
          {this.props.type}
        </h3>
        <p>{this.result}</p>
      </div>
    )
  }
}
