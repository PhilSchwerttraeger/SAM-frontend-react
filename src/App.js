import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Analysis from './components/Analysis';
import DataTable from './components/DataTable';
import NavBar from './components/NavBar';
import { DataProvider } from './components/DataContext';

class App extends React.Component {
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

  render() {
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
        </div>
      </DataProvider>
    );
  }
}

export default App;