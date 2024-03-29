import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SelectIcon from "@material-ui/icons/List";
import TextIcon from "@material-ui/icons/TextRotationNone";
import DateIcon from "@material-ui/icons/DateRange";
import CurrencyIcon from "@material-ui/icons/AttachMoney";

export default class ConfigRow extends Component {
  state = {
    id: "",
    title: "",
    name: "",
    type: "",
    enable: true,
    isDisabled: true,
    values: null
  };

  componentDidMount() {
    this.setState({
      id: this.props.value.id,
      title: this.props.value.title,
      name: this.props.value.name,
      type: this.props.value.type,
      enable: this.props.value.enable,
      isDisabled: this.props.value.isDisabled
    });
    if (this.props.value.values) {
      this.setState({
        values: this.props.value.values
      });
    }
  }

  componentDidUpdate() {
    this.props.onChange(this.state, this.props.isNew);
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    return (
      <Grid container type={{ flexGrow: 1 }} spacing={3}>
        <Grid item xs={5}>
          <TextField
            autoFocus
            id="name"
            label="Column Title"
            type="text"
            value={this.state.title}
            onChange={e => {
              this.setState({
                title: e.target.value
              });
            }}
          />
        </Grid>

        <Grid item xs={5}>
          <FormControl fullWidth={true}>
            <InputLabel>Type</InputLabel>

            <Select
              value={this.toTitleCase(this.state.type)}
              onChange={e => {
                this.setState({
                  type: e.target.value.toLowerCase()
                });
              }}
              disabled={this.state.isDisabled}
            >
              {/* Type: Select */}
              <MenuItem value={this.props.strings.select} disabled={true}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <SelectIcon color="primary" style={{ fontSize: 15 }} />
                  </Grid>
                  <Grid item>{this.props.strings.select}</Grid>
                </Grid>
              </MenuItem>

              {/* Type: Date */}
              <MenuItem value={this.props.strings.date}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <DateIcon color="primary" style={{ fontSize: 15 }} />
                  </Grid>
                  <Grid item>{this.props.strings.date}</Grid>
                </Grid>
              </MenuItem>

              {/* Type: Text */}
              <MenuItem value={this.props.strings.text}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <TextIcon color="primary" style={{ fontSize: 15 }} />
                  </Grid>
                  <Grid item>{this.props.strings.text}</Grid>
                </Grid>
              </MenuItem>

              {/* Type: Currency */}
              <MenuItem value={this.props.strings.currency}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <CurrencyIcon color="primary" style={{ fontSize: 15 }} />
                  </Grid>
                  <Grid item>{this.props.strings.currency}</Grid>
                </Grid>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Delete */}
        <Grid item xs={2}>
          <IconButton
            variant="outlined"
            onClick={() => this.props.deleteItem(this.state.id)}
            color="secondary"
            //disabled={this.state.isDisabled}
            disabled={true}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}
