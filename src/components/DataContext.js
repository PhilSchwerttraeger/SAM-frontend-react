import React, {Component} from 'react'
import Snackbar from './Snackbars'

export const DataContext = React.createContext();

let serverURL;
let endPhrase;

//const backend = "JSONSERVER"; // aka self-hosted
const backend = "FIREBASE";
//const backend = "NETLIFY";

if(backend === "FIREBASE"){
  serverURL = 'https://api-dashboard-5chw.firebaseio.com/';
  endPhrase = '.json';
}
if(backend === "JSONSERVER"){
  serverURL = 'http://localhost:3009';
  endPhrase = '';
}

export class DataProvider extends Component {
  constructor(props){
    super(props);
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
    if(backend === "FIREBASE") {
      // preprocess data if needed
    }
    if(backend === "JSONSERVER") {
      // preprocess data if needed
    }
    fetch(serverURL + '/generalConfig' + endPhrase)
    .then(res => res.json())
    .then(data => {
      this.setState({
        generalConfig: data
      });
    }).catch(err => {
      console.log(err);
    });;
      
    fetch(serverURL + '/fieldConfig' + endPhrase)
    .then(res => res.json())
    .then(data => {
      this.setState({
        fieldConfig: data
      });
    }).catch(err => {
      console.log(err);
    });;
    
    fetch(serverURL + '/fields' + endPhrase)
    .then(res => res.json())
    .then(res => {
      let data = Object.values(res);  
      this.setState({
        fields: data
      });
    }).catch(err => {
      if(!err.ok) console.log(err);
    });;

    this.setState({ 
      strings: require('../languages/english.json') 
    });
  }

  fetchFieldsDataFromRestApi = () => {
    if(backend === "FIREBASE") {
      // preprocess data if needed
    }
    if(backend === "JSONSERVER") {
      // preprocess data if needed
    }

    fetch(serverURL + '/fields' + endPhrase)
    .then(res => res.json())
    .then(res => {
      let data = Object.values(res);
      console.log(data);
      this.setState({
        fields: data
      });
    }).catch(err => {
      console.log(err);
    });
  }

  updateEntry = (id, data) => {
    if(backend === "FIREBASE") {
      // preprocess data if needed
    }
    if(backend === "JSONSERVER") {
      // preprocess data if needed
    }

    delete data.tableData;
    return fetch(serverURL + '/fields/' + id + endPhrase, {
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
      if(res.ok){
        this.callSnackbar(this.state.strings.snackbar.entryupdated);
      } else {
        this.callSnackbar(this.state.strings.snackbar.entryupdatederror);
      }
      return res;
    }).catch(err => {
      console.log(err);
    });
  }

  addEntry = (data) => {
    let preEndPhrase;
    let selectedMethod;

    if(backend === "FIREBASE") {
      preEndPhrase = '/' + data.id;
      selectedMethod = 'PUT';
    }
    if(backend === "JSONSERVER") {
      preEndPhrase = '';
      selectedMethod = 'POST';
    }

    return fetch(serverURL + '/fields' + preEndPhrase + endPhrase, {
      method: selectedMethod,
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
      if(res.ok){
        this.callSnackbar(this.state.strings.snackbar.entryadded);
      } else {
        this.callSnackbar(this.state.strings.snackbar.entryaddederror);
      }
      return res;
      
    }).catch(err => {
      console.log(err);
      return err;
    });
  }
  
  deleteEntries = (Ids) => {
    if(backend === "FIREBASE") {
      // preprocess data if needed
    }
    if(backend === "JSONSERVER") {
      // preprocess data if needed
    }

    Ids.forEach((id) => {
      return fetch(serverURL + '/fields/' + id + endPhrase, {
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
        if(res.ok){
          this.callSnackbar(this.state.strings.snackbar.entrydeleted);
        } else {
          this.callSnackbar(this.state.strings.snackbar.entrydeletederror);
        }
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

  setFieldsConfig = (newConfig) => {
    if(backend === "FIREBASE") {
      // preprocess data if needed
    }
    if(backend === "JSONSERVER") {
      // preprocess data if needed
    }

    return fetch(serverURL + '/fieldConfig' + endPhrase, {
      method: 'PUT',
      body: JSON.stringify(newConfig),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({
        fieldConfig: newConfig
      });
      console.log(newConfig);
      console.log(res);
      if(res.ok){
        this.callSnackbar(this.state.strings.snackbar.newfieldconfigset);
      } else {
        this.callSnackbar(this.state.strings.snackbar.newfieldconfigseterror);
      }
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    });
  }

  addEmptyFieldConfig = () => {
    let emptyFieldConfig = {
      "name": "",
      "title": "",
      "type": "text",
      "enable": "true"
    };

    
    if(backend === "FIREBASE") {
      // preprocess data if needed
    }
    if(backend === "JSONSERVER") {
      // preprocess data if needed
    }

    return fetch(serverURL + '/fieldConfig' + endPhrase, {
      method: 'POST',
      body: JSON.stringify(emptyFieldConfig),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState(oldState => ({
        fieldConfig: [...oldState.fieldConfig, emptyFieldConfig]
      }));
      this.fetchFieldsDataFromRestApi();
      if(res.ok){
        this.callSnackbar(this.state.strings.snackbar.emptyentryadded);
      } else {
        this.callSnackbar(this.state.strings.snackbar.emptyentryaddederror);
      }
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    });
  }
  
  callSnackbar = (message) => {
    this.setState({
      SnackbarClicked: true,
      SnackbarText: message
    });
  }

  handleClose = () => {
    this.setState({
      SnackbarClicked: false,
      SnackbarText: ""
    });
  }

  render(){
    let snackbar = "";
    if(this.state.SnackbarClicked){
      snackbar = <Snackbar close={this.handleClose} message={this.state.SnackbarText}/>;
    }
    
    const contextValue = {
      data: this.state,
      updateEntry: this.updateEntry,
      addEntry: this.addEntry,
      deleteEntries: this.deleteEntries,
      setSelectedEntries: this.setSelectedEntries,
      getSelectedEntries: this.getSelectedEntries,
      fetchFromRestApi: this.fetchFromRestApi,
      fetchFieldsDataFromRestApi: this.fetchFieldsDataFromRestApi,
      setFieldsConfig: this.setFieldsConfig,
      addEmptyFieldConfig: this.addEmptyFieldConfig,
      openSnackbar: this.openSnackbar
    };

    return(
      <DataContext.Provider value={contextValue}>
        {snackbar}
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export const Consumer = DataContext.Consumer;