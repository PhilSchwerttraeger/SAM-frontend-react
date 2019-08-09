import React, { Component } from 'react';
import { numberFormat } from './NumberFormat';
import { Grid } from '@material-ui/core';
//import { FaSort, FaSortUp, FaSortDown, FaPlus } from 'react-icons/fa';
import Avatar from '@material-ui/core/Avatar';
import { withTheme  } from '@material-ui/styles';

class AnalysisFragment extends Component {
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

  getIcon(){
    switch(this.icon) {
      case "sum": return "+"
      case "average": return "~"
      case "minimum": return "⭳"
      case "maximum": return "⭱"
      default: return
    }
  }

  render(){
    switch (this.props.type) {
      case "sum":
        this.result = this.sum(this.props.visibleRows.values);
        this.icon = "sum";
        break;
        
      case "average":
        this.result = this.average(this.props.visibleRows.values);
        this.icon = "average";
        break;

      case "minimum":
          this.result = this.minimum(this.props.visibleRows.values);
          this.icon = "minimum";
          break;

      case "maximum":
          this.result = this.maximum(this.props.visibleRows.values);
          this.icon = "maximum";
          break;
    
      default:
        this.result = 0;
        break;
    }

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item style={{paddingRight: "0px"}}>
            <Avatar 
              className="AnalysisIcons"
              style={{
                color: this.props.theme.palette.primary.contrastText,
                backgroundColor: this.props.theme.palette.primary.main
              }}
            >
                {this.getIcon()}
            </Avatar>
          </Grid>
          <Grid item>
            <h3 style={{textTransform: "capitalize"}}>
              {this.props.type}
            </h3>
            <span className="stat_value">
              {numberFormat(this.result)}
            </span>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withTheme(AnalysisFragment);