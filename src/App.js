import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Analysis from './components/Analysis';
import DataTable from './components/DataTable';
import NavBar from './components/NavBar';
import { DataProvider } from './components/DataContext';
import Snackbar from './components/Snackbars';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  state = {
    SnackbarClicked: false
  }

  styleMain = () => {
    return {
      flexGrow: 1,
      padding: 16,
      backgroundColor: '#F8F8F8'
    }
  }
  
  stylePaper = () => {
    return {
      padding: 16
    }
  }

  componentDidMount(){
  }

  handleSnackbarClick = () => {
    this.setState({
      SnackbarClicked: true
    });
  }

  handleClose = () => {
    this.setState({
      SnackbarClicked: false
    });
  }

  render() {
    let snackbar = "";
    if(this.state.SnackbarClicked){
      snackbar = <Snackbar close={this.handleClose} message="Hey!"/>;
    }

    return (
      <DataProvider>
        <NavBar />
        <div style={this.styleMain()}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Analysis />
            </Grid>
            <Grid item xs={12}>
              <Paper style={this.stylePaper()}>
                <DataTable />
              </Paper>
            </Grid>
          </Grid>
          <Button onClick={this.handleSnackbarClick}>Hit Me</Button>
          {snackbar}
        </div>
      </DataProvider>
    );
  }
}

export default App;