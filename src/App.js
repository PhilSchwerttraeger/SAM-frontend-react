import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Analysis from './components/Analysis';
import Statistics from './components/Statistics';
import DataTable from './components/DataTable';
import NavBar from './components/NavBar';

class App extends React.Component {
  // eslint-disable-next-line
  constructor(props){
    super(props);
    this.state = {
      data: [],
      strings: []
    }
  }

  componentWillMount(){
    fetch('http://localhost:3001/data')
      .then(
        res => res.json()
      )
      .then(
        data => {
          this.setState({data: data});
        }
      );

    this.setState(
      { 
        strings: require('./languages/english.json') 
      }
    );
  }

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

  styleGridItem = () => {
    return {
      //border: "solid 1px"
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={this.styleMain()}>
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
              <DataTable state={this.state}/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;