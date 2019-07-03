import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Analysis from './components/Analysis';
import Statistics from './components/Statistics';
import DataTable from './components/DataTable';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){

    this.setState(
      { 
        strings: require('./languages/english.json') 
      }
    );
  }

  styleRoot = () => {
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

  styleGridItem = () => {
    return {
      //border: "solid 1px"
    }
  }

  render() {
    return (
      
        <div style={this.styleRoot()}>
          <Grid container spacing={3}>
            <Grid item style={this.styleGridItem()} xs={12} sm={6}>
              <Paper style={this.stylePaper()}>
                <Analysis state={this.state}/>
              </Paper>
            </Grid>
            <Grid item style={this.styleGridItem()} xs={12} sm={6}>
              <Paper style={this.stylePaper()}>
                <Statistics state={this.state}/>
              </Paper>
            </Grid>
            <Grid item style={this.styleGridItem()} xs={12} sm={12}>
              <Paper style={this.stylePaper()}>
                <DataTable state={this.state}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
      
    );
  }
}

export default App;