import React, { Component } from 'react'
import { Consumer } from '../DataContext';
import { numberFormat } from '../NumberFormat'
import { Grid } from '@material-ui/core'
//import { FaSort, FaSortUp, FaSortDown, FaPlus } from 'react-icons/fa';
import Avatar from '@material-ui/core/Avatar'
import { withTheme  } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InIcon from '@material-ui/icons/SubdirectoryArrowRight'
import OutIcon from '@material-ui/icons/SubdirectoryArrowLeft'

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
  
  totalIn(array){
    let result = 0;
    array.forEach(element => {
      if(element > 0){
        result += element;
      }
    });
    if(result){
      return result;
    } else return 0;
  }
  
  totalOut(array){
    let result = 0;
    array.forEach(element => {
      if(element < 0){
        result += element;
      }
    });
    if(result){
      return result;
    } else return 0;
  }

  getIcon(){
    switch(this.icon) {
      case "sum": return "+"
      case "average": return "~"
      case "minimum": return "⭳"
      case "maximum": return "⭱"
      case "totalin": return <InIcon />
      case "totalout": return <OutIcon />
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

      case "totalin":
        this.result = this.totalIn(this.props.visibleRows.values);
        this.icon = "totalin"
        break;

      case "totalout":
        this.result = this.totalOut(this.props.visibleRows.values);
        this.icon = "totalout"
        break;
    
      default:
        this.result = 0;
        break;
    }

    return (
      <Consumer>
        {state => {
          return (
            <Card>
              <CardHeader
                avatar={
                  <Avatar 
                    className="AnalysisIcons"
                    style={{
                      color: this.props.theme.palette.primary.contrastText,
                      backgroundColor: this.props.theme.palette.primary.main
                    }}
                  >
                      {this.getIcon()}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <h3>
                    {state.data.strings.analysis[this.props.type]}
                  </h3>
                }
                subheader={
                  <span className="stat_value">
                    {numberFormat(this.result)}
                  </span>
                }
              />
            </Card>
          )
        }}
      </Consumer>
    )
  }
}

export default withTheme(AnalysisFragment);