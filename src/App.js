import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Analysis from './components/Analysis/Analysis';
import DataTable from './components/DataTable/DataTable';
import NavBar from './components/NavBar';
import { DataProvider } from './components/DataContext';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  status: {
    danger: 'orange',
  },
});

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
        <ThemeProvider theme={theme}>
          <NavBar />
          <div className="main">
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
        </ThemeProvider>
      </DataProvider>
    );
  }
}

export default App;