import React, {Component} from 'react';

export const DataContext = React.createContext();

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
    strings: [],
    runtime: {
      visibleEntries: []
    }
  }

  setDataTableRef = (ref) => {
    this.setState(
      {
        runtime: {
        dataTableRef: ref
        }
      }
    );
  }

  getDataTableRef= () => {
    return this.state.runtime.dataTableRef;
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
    const contextValue = {
      data: this.state,
      setDataTableRef: this.setDataTableRef,
      getDataTableRef: this.getDataTableRef,
      setSelectedEntries: (entries) => {
        this.setState({
          runtime: {
            visibleEntries: entries
          }
        });
      },
      getSelectedEntries: () => {
        //console.log(this.state.runtime.visibleEntries);
        return this.state.runtime.visibleEntries;
      }
      };

    return(
      <DataContext.Provider value={contextValue}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export const Consumer = DataContext.Consumer;