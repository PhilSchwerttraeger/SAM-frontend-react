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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {
        email: false,
        password: false,
        general: false
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const serverURL =
      //"https://europe-west1-api-dashboard-5chw.cloudfunctions.net/api";
      "http://localhost:5000/api-dashboard-5chw/europe-west1/api";

    const header = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(serverURL + "/login", header)
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
          window.location.href = "/";
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
            <Typography variant="h3">Login</Typography>
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
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  User not found.
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                Dont have an account? Sign up <Link to="/signup">here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
