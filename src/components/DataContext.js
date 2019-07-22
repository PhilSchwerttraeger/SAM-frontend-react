import React, {Component} from 'react';

export const DataContext = React.createContext();

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

  componentWillMount(){
    this.fetchFromRestApi();
  }
  
  fetchFromRestApi(){
    fetch('http://localhost:3001/generalConfig')
    .then(res => res.json())
    .then(data => {
      this.setState({
        generalConfig: data
      });
    });
      
    fetch('http://localhost:3001/fieldConfig')
    .then(res => res.json())
    .then(data => {
      this.setState({
        fieldConfig: data
      });
    });
    
    fetch('http://localhost:3001/fields')
    .then(res => res.json())
    .then(data => {
      this.setState({
        fields: data
      });
    });

    this.setState(
      { 
        strings: require('../languages/english.json') 
      }
    );
  }

  updateEntry = (id, data) => {
    delete data.tableData;
    return fetch('http://localhost:3001/fields/' + id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState(oldState => ({
        // eslint-disable-next-line
        fields: oldState.fields.map(el => 
          el.id === id ? data : el
        )
      }));
      console.log(res);
      //console.log(this.state.fields);
      return res;
    }).catch(err => {
      console.log(err);
    });
  }

  addEntry = (data) => {
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

  createEmptyEntry = () => {
    return fetch('http://localhost:3001/fields', {
      method: 'POST',
      body: JSON.stringify(),
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
  
  deleteEntries = (id) => {
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

  setSelectedEntries = (entries) => {
    this.setState({
      runtime: {
        visibleEntries: entries
      }
    });
  }

  getSelectedEntries = () => {
    //console.log(this.state.runtime.visibleEntries);
    return this.state.runtime.visibleEntries;
  }

  render(){
    const contextValue = {
      data: this.state,
      updateEntry: this.updateEntry,
      addEntry: this.addEntry,
      createEmptyEntry: this.createEmptyEntry,
      deleteEntries: this.addEntries,
      setSelectedEntries: this.setSelectedEntries,
      getSelectedEntries: this.getSelectedEntries
    };

    return(
      <DataContext.Provider value={contextValue}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export const Consumer = DataContext.Consumer;