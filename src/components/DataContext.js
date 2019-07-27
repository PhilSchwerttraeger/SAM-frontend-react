import React, {Component} from 'react';

export const DataContext = React.createContext();

const serverURL = 'http://localhost:3009';

export class DataProvider extends Component {
  constructor(props){
    super(props);
    

    //this.fetchFromRestApi.bind(this);
    this.fetchFieldsDataFromRestApi.bind(this);

    this.state = {
      generalConfig: {},
      fieldConfig: [],
      fields: [],
      strings: [],
      runtime: {
        visibleEntries: []
      }
    }
  }

  componentWillMount(){
    this.fetchFromRestApi();
  }
  
  fetchFromRestApi = () => {
    fetch(serverURL + '/generalConfig')
    .then(res => res.json())
    .then(data => {
      this.setState({
        generalConfig: data
      });
    });
      
    fetch(serverURL + '/fieldConfig')
    .then(res => res.json())
    .then(data => {
      this.setState({
        fieldConfig: data
      });
    });
    
    fetch(serverURL + '/fields')
    .then(res => res.json())
    .then(data => {
      this.setState({
        fields: data
      });
    });

    this.setState({ 
      strings: require('../languages/english.json') 
    });
  }

  fetchFieldsDataFromRestApi = () => {
    fetch(serverURL + '/fields')
    .then(res => res.json())
    .then(res => {
      this.setState({
        fields: res
      });
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
    });
  }

  updateEntry = (id, data) => {
    delete data.tableData;
    return fetch(serverURL + '/fields/' + id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState(oldState => ({
        fields: oldState.fields.map(el => 
          el.id === id ? data : el
        )
      }));
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
    });
  }

  addEntry = (data) => {
    //delete data.tableData;
    return fetch(serverURL + '/fields', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState(oldState => ({
        fields: [...oldState.fields, data]
      }));
      this.fetchFieldsDataFromRestApi();
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    });
  }
  
  deleteEntries = (Ids) => {
    Ids.forEach((id) => {
      return fetch(serverURL + '/fields/' + id, {
        method: 'DELETE',
        //body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res);
        console.log(id + " was deleted from db.");
        this.setState(oldState => {
          // eslint-disable-next-line
          return {
            fields: oldState.fields.filter(item => {
              if(item.id !== id){
                return true;
              } else {
                console.log(id + " was deleted from state.");
                return false;
              }
            })
          };
        });
        this.fetchFieldsDataFromRestApi();
        return res;
      }).catch(err => {
        console.log(err);
      });
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
      deleteEntries: this.deleteEntries,
      setSelectedEntries: this.setSelectedEntries,
      getSelectedEntries: this.getSelectedEntries,
      fetchFromRestApi: this.fetchFromRestApi,
      fetchFieldsDataFromRestApi: this.fetchFieldsDataFromRestApi
    };

    return(
      <DataContext.Provider value={contextValue}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export const Consumer = DataContext.Consumer;