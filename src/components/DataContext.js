import React, {Component} from 'react';

const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    generalConfig: {},
    fieldConfig: [],
    fields: [],
    strings: []
  }

  componentWillMount(){
    fetch('http://localhost:3001/generalConfig')
      .then(res => res.json())
      .then(data => {this.setState({generalConfig: data});});
      
    fetch('http://localhost:3001/fieldConfig')
    .then(res => res.json())
    .then(data => {this.setState({fieldConfig: data});});
    
    fetch('http://localhost:3001/fields')
    .then(res => res.json())
    .then(data => {this.setState({fields: data});});

    this.setState(
      { 
        strings: require('../languages/english.json') 
      }
    );
  }

  render(){
    return(
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export const Consumer = DataContext.Consumer;