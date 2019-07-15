import React, {Component} from 'react';

const DataContext = React.createContext();

export function addEntry(data) {
  delete data.tableData;
  return fetch('http://localhost:3001/fields', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res);
    return res;
  }).catch(err => {
    console.log(err);
  });
}

export function deleteEntry(id) {
  return fetch('http://localhost:3001/fields/' + id, {
    method: 'DELETE',
    //body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
    }).then(res => {
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
    });
}

export function updateEntry(id, data) {
  delete data.tableData;
  return fetch('http://localhost:3001/fields/' + id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res);
    return res;
  }).catch(err => {
    console.log(err);
  });
}

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