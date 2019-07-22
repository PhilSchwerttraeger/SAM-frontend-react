import React, { Component } from 'react';
import { numberFormat } from './NumberFormat';

export default class AnalysisFragment extends Component {
  sum(array){
    let result = 0;
    array.forEach(element => {
      result += element;
    });
    if(result){
      return result;
    } else return 0;
  }

  average(array){
    let sum = this.sum(array);
    let numberOfEntries = array.length;
    let result = sum/numberOfEntries;
    if(result){
      return result;
    } else return 0;
  }

  minimum(array){
    if(Math.min.apply(Math, array) === Infinity
      || Math.min.apply(Math, array) === -Infinity){
        return 0;
    }
    return Math.min.apply(Math, array);
  }
  
  maximum(array){
    if(Math.max.apply(Math, array) === Infinity
      || Math.max.apply(Math, array) === -Infinity){
        return 0;
    }
    return Math.max.apply(Math, array);
  }

  render(){
    //console.log(this.props.visibleRows.values);
    switch (this.props.type) {
      case "sum":
        this.result = this.sum(this.props.visibleRows.values);
        break;
        
      case "average":
        this.result = this.average(this.props.visibleRows.values);
        break;

      case "minimum":
          this.result = this.minimum(this.props.visibleRows.values);
          break;

      case "maximum":
          this.result = this.maximum(this.props.visibleRows.values);
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
        <p>{numberFormat(this.result)}</p>
      </div>
    )
  }
}
