import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Analysis from './components/Analysis';
import Statistics from './components/Statistics';
import DataTable from './components/DataTable';
import NavBar from './components/NavBar';
import { DataProvider } from './components/DataContext';

class App extends React.Component {
  styleMain = () => {
    return {
      flexGrow: 1,
      padding: 16
    }
  }
  
  stylePaper = () => {
    return {
      padding: 16
    }
  }

  render() {
    return (
      <DataProvider>
        <NavBar />
        <div style={this.styleMain()}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper style={this.stylePaper()}>
                <Analysis state={this.state}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={this.stylePaper()}>
                <Statistics state={this.state}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <DataTable/>
            </Grid>
          </Grid>
        </div>
      </DataProvider>
    );
  }
}

export default App;