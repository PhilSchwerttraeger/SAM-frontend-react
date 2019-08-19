import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.spreadThis
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      errors: {
        email: false,
        password: false,
        confirmPassword: false,
        general: false
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const header = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const serverURL =
      "http://localhost:5000/api-dashboard-5chw/europe-west1/api";

    fetch(serverURL + "/signup", header)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data); // token or error
        localStorage.setItem("FirebaseIdToken", `Bearer ${data.token}`);
        if (data.token) {
          this.setState({
            loading: false
            // TODO: save token
          });
          this.props.history.push("/");
        } else {
          this.setState({
            errors: data,
            loading: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <div>
        <Grid container className={classes.formcontainer}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h3">Signup</Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="E-Mail"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange}
                helperText={errors.email}
                error={errors.email ? true : false}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password ? true : false}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm password"
                className={classes.textField}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                fullWidth
              />
              {errors.error && (
                <Typography variant="body2" className={classes.customError}>
                  Your Password is too weak.
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Signup
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                Already have an account? Login <Link to="/login">here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
