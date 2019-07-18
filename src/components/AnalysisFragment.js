import React, { Component } from 'react'

export default class AnalysisFragment extends Component {
  sum(array){
    let result = 0;
    array.forEach(element => {
      result += element;
    });
    if(result) return result;
  }

  average(array){
    let sum = this.sum(array);
    let numberOfEntries = array.length;
    let result = sum/numberOfEntries;
    if(result) return result;
  }

  render(){
    switch (this.props.type) {
      case "sum":
        this.result = this.sum(this.props.values);
        break;
        
      case "average":
        this.result = this.average(this.props.values);
        break;
    
      default:
        this.result = 0;
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
