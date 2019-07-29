import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectIcon from '@material-ui/icons/List';
import TextIcon from '@material-ui/icons/TextRotationNone';
import DateIcon from '@material-ui/icons/DateRange';
import CurrencyIcon from '@material-ui/icons/AttachMoney';

export default class ConfigRow extends Component {
  state = {
    id: "",
    title: "",
    type: ""
  }

  componentDidMount(){
    this.setState({
      id: this.props.value.id,
      title: this.props.value.title,
      type: this.props.value.type,
      enable: this.props.value.enable
    });
  }  

  componentDidUpdate(){
    this.props.onChange(this.state, this.props.isNew);
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  render(){
    return (
      <Grid container 
        type={{flexGrow: 1}} 
        spacing={3}
      >
        <Grid item xs={5}>
          <TextField
            autoFocus
            id="name"
            label="Column Title"
            type="text"
            value={this.state.title}
            onChange = {(e) => {
              this.setState({
                title: e.target.value
              });
            }}
          />
        </Grid>

        <Grid item xs={5}>
          <FormControl fullWidth= {true}>
            <InputLabel>Type</InputLabel>
            <Select
              value={this.toTitleCase(this.state.type)}
              onChange = {(e) => {
                this.setState({
                  type: e.target.value
                });
              }}
            >
              <MenuItem value={this.props.strings.select}>
                <Grid container 
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <SelectIcon 
                      color="primary"
                      style={{ fontSize: 15 }}
                    />
                  </Grid>
                  <Grid item>
                    {this.props.strings.select}
                  </Grid>                
                </Grid>
              </MenuItem>

              
              <MenuItem value={this.props.strings.date}>
                <Grid container 
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <DateIcon 
                      color="primary"
                      style={{ fontSize: 15 }}
                    />
                  </Grid>
                  <Grid item>
                    {this.props.strings.date}
                  </Grid>                
                </Grid>
              </MenuItem>

              <MenuItem value={this.props.strings.text}>
                <Grid container 
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <TextIcon 
                      color="primary"
                      style={{ fontSize: 15 }}
                    />
                  </Grid>
                  <Grid item>
                    {this.props.strings.text}
                  </Grid>                
                </Grid>
              </MenuItem>

              <MenuItem value={this.props.strings.currency}>
                <Grid container 
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <CurrencyIcon 
                      color="primary"
                      style={{ fontSize: 15 }}
                    />
                  </Grid>
                  <Grid item>
                    {this.props.strings.currency}
                  </Grid>                
                </Grid>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        
        <Grid item xs={2}>
          <IconButton 
            variant="outlined" 
            onClick={this.props.deleteItem(this.state.id)}
            color="secondary"  
          >
            <DeleteIcon />
            
          </IconButton>
        </Grid>

      </Grid>
    )
  }
}
