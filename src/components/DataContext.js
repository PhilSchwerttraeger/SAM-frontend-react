import React, { Component } from "react";
import Snackbar from "./Snackbars";

export const DataContext = React.createContext();

let serverURL;
let endPhrase;

//const backend = "JSONSERVER"; // aka self-hosted
const backend = "FIREBASE";
//const backend = "NETLIFY";

if (backend === "FIREBASE") {
  //serverURL = "https://api-dashboard-5chw.firebaseio.com";
  //endPhrase = ".json";
  serverURL = "https://europe-west1-api-dashboard-5chw.cloudfunctions.net/api";
  endPhrase = "";
}
if (backend === "JSONSERVER") {
  serverURL = "http://localhost:3009";
  endPhrase = "";
}

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0MWU3OWQzZjUwOWUyYzdhNjQ1N2ZjOTVmY2U1MGNjOGM3M2VmMDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBpLWRhc2hib2FyZC01Y2h3IiwiYXVkIjoiYXBpLWRhc2hib2FyZC01Y2h3IiwiYXV0aF90aW1lIjoxNTY2MjA5MzU1LCJ1c2VyX2lkIjoidTV1dGlMMVJpc2RVc01WWVFqUWdmVHA5VHRRMiIsInN1YiI6InU1dXRpTDFSaXNkVXNNVllRalFnZlRwOVR0UTIiLCJpYXQiOjE1NjYyMDkzNTUsImV4cCI6MTU2NjIxMjk1NSwiZW1haWwiOiJuZXd1c2VyQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJuZXd1c2VyQGVtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.RbsPyUjaWTEJM2rCs7hFzSb7AlGr8KgXVzmfc9Kno9AITf5sd6-7CY9c8vq_l_yai0EZ_kJN2Ye5Yrm7iqcC6_cDhG9WB35sVKbaQ0qO2qt9EwH90ER36MAQMiVTYgJ-3w7J79xuibP1ijKsUIt7MFA9OgFBKwAKZr05GR-bBBvVgoWzGwKDErac69C2FFNXqUIpFTYvaFFGa3EKRlsGjnHT1MOFTZALGvIg1PWLbmfhGv5RUPiywRoMOgyU0FXXUfSzZz7PfIe17bTjmwWd6BupV8_ANkEtkhSxOh4TmDrm24v-5ciYX1NcVKWHReP2qr8pcW-i2m3qYSbUiUWvfw"
  }
};

const defaultAnalysisConfig = [
  "sum",
  "average",
  "minimum",
  "maximum",
  "totalin",
  "totalout"
];

export class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.fetchFieldsDataFromRestApi.bind(this);

    /* OLD STATE (1.0)
    this.state = {
      generalConfig: {},
      fieldConfig: [],
      fields: [],
      strings: [],
      runtime: {
        visibleEntries: []
      },
      modals: {
        showInfo: false,
        showSettings: false
      }
    };
    */

    // new state (2.0, with firebase)
    this.state = {
      userId: null,
      email: null,
      createdAt: null,

      settings: {
        accountType: null, // premium, free
        language: null, // english, german
        currency: null, // euro, dollar
        analysisSections: []
        // sum, average, minimum, maximum, totalin, totalout
      },
      fieldConfig: [],
      entries: [],

      strings: [],
      runtime: {
        visibleEntries: []
      },
      modals: {
        showInfo: false,
        showSettings: false
      }
    };
  }

  componentWillMount() {
    this.fetchFromRestApi();
  }

  fetchFromRestApi = () => {
    if (backend === "FIREBASE") {
      // preprocess data if needed
    }
    if (backend === "JSONSERVER") {
      // preprocess data if needed
    }
    fetch(serverURL + "/userdata" + endPhrase, header)
      .then(res => res.json())
      .then(data => {
        this.setState(oldState => {
          return { ...oldState, ...data };
        });
      })
      .catch(err => {
        console.log("userdata: ", err);
      });

    fetch(serverURL + "/fieldConfig" + endPhrase, header)
      .then(res => res.json())
      .then(data => {
        this.setState({
          fieldConfig: data
        });
      })
      .catch(err => {
        console.log("fieldconfig: ", err);
      });

    fetch(serverURL + "/entries" + endPhrase, header)
      .then(res => res.json())
      .then(data => {
        this.setState({
          entries: data
        });
      })
      .catch(err => {
        console.log("entries: ", err);
      });

    this.setState({
      strings: require("../languages/english.json")
    });
  };

  fetchFieldsDataFromRestApi = () => {
    if (backend === "FIREBASE") {
      // preprocess data if needed
    }
    if (backend === "JSONSERVER") {
      // preprocess data if needed
    }

    fetch(serverURL + "/entries" + endPhrase, header)
      .then(res => res.json())
      .then(res => {
        let data = Object.values(res);
        //console.log(data);
        this.setState({
          fields: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateEntry = (id, data) => {
    if (backend === "FIREBASE") {
      // preprocess data if needed
    }
    if (backend === "JSONSERVER") {
      // preprocess data if needed
    }

    delete data.tableData;
    return fetch(serverURL + "/fields/" + id + endPhrase, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState(oldState => ({
          fields: oldState.fields.map(el => (el.id === id ? data : el))
        }));
        //console.log(res);
        if (res.ok) {
          // nothing
        } else {
          this.callSnackbar(this.state.strings.snackbar.entryupdatederror);
        }
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  addEntry = data => {
    let preEndPhrase;
    let selectedMethod;

    if (backend === "FIREBASE") {
      preEndPhrase = "/" + data.id;
      selectedMethod = "PUT";
    }
    if (backend === "JSONSERVER") {
      preEndPhrase = "";
      selectedMethod = "POST";
    }

    return fetch(serverURL + "/fields" + preEndPhrase + endPhrase, {
      method: selectedMethod,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState(oldState => ({
          fields: [...oldState.fields, data]
        }));
        this.fetchFieldsDataFromRestApi();
        //console.log(res);
        if (res.ok) {
          // nothing
        } else {
          this.callSnackbar(this.state.strings.snackbar.entryaddederror);
        }
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };

  deleteEntries = Ids => {
    if (backend === "FIREBASE") {
      // preprocess data if needed
    }
    if (backend === "JSONSERVER") {
      // preprocess data if needed
    }

    Ids.forEach(id => {
      return fetch(serverURL + "/fields/" + id + endPhrase, {
        method: "DELETE",
        //body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          //console.log(res);
          //console.log(id + " was deleted from db.");
          this.setState(oldState => {
            // eslint-disable-next-line
            return {
              fields: oldState.fields.filter(item => {
                if (item.id !== id) {
                  return true;
                } else {
                  //console.log(id + " was deleted from state.");
                  return false;
                }
              })
            };
          });
          this.fetchFieldsDataFromRestApi();
          if (res.ok) {
            // nothing
          } else {
            this.callSnackbar(this.state.strings.snackbar.entrydeletederror);
          }
          return res;
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  setSelectedEntries = entries => {
    this.setState({
      runtime: {
        visibleEntries: entries
      }
    });
  };

  getSelectedEntries = () => {
    //console.log(this.state.runtime.visibleEntries);
    return this.state.runtime.visibleEntries;
  };

  setFieldsConfig = newConfig => {
    if (backend === "FIREBASE") {
      // preprocess data if needed
    }
    if (backend === "JSONSERVER") {
      // preprocess data if needed
    }

    return fetch(serverURL + "/fieldConfig" + endPhrase, {
      method: "PUT",
      body: JSON.stringify(newConfig),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({
          fieldConfig: newConfig
        });
        //console.log(newConfig);
        //console.log(res);
        if (res.ok) {
          this.callSnackbar(this.state.strings.snackbar.newfieldconfigset);
        } else {
          this.callSnackbar(this.state.strings.snackbar.newfieldconfigseterror);
        }
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };

  addEmptyFieldConfig = () => {
    let emptyFieldConfig = {
      title: "",
      type: "text",
      enable: "true"
    };

    // id generation, time-based / time-sortable
    const kuuid = require("kuuid");
    emptyFieldConfig.id = kuuid.id();
    emptyFieldConfig.name = "field_";
    emptyFieldConfig.name += kuuid.id().substring(0, 7);

    if (backend === "FIREBASE") {
      // preprocess data if needed
    }
    if (backend === "JSONSERVER") {
      // preprocess data if needed
    }

    return fetch(serverURL + "/fieldConfig" + endPhrase, {
      method: "POST",
      body: JSON.stringify(emptyFieldConfig),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState(oldState => ({
          fieldConfig: [...oldState.fieldConfig, emptyFieldConfig]
        }));
        this.fetchFieldsDataFromRestApi();
        if (res.ok) {
          // nothing
        } else {
          this.callSnackbar(this.state.strings.snackbar.emptyentryaddederror);
        }
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };

  deleteFieldConfig = id => {
    if (backend === "FIREBASE") {
      // preprocess data if needed
    }
    if (backend === "JSONSERVER") {
      // preprocess data if needed
    }

    return fetch(serverURL + "/fieldConfig/" + id + endPhrase, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        //console.log(id + " was deleted from db.");
        this.setState(oldState => {
          // eslint-disable-next-line
          return {
            fields: oldState.fieldConfig.filter(item => {
              if (item.id !== id) {
                return true;
              } else {
                //console.log(id + " was deleted from state.");
                return false;
              }
            })
          };
        });
        this.fetchFromRestApi();
        if (res.ok) {
          // nothing
        } else {
          this.callSnackbar(this.state.strings.snackbar.entrydeletederror);
        }
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  setAnalysisSections = () => {
    return fetch(serverURL + "/generalConfig/analysisSections" + endPhrase, {
      method: "PUT",
      body: JSON.stringify(this.state.generalConfig.analysisSections),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        //console.log(res);
        if (res.ok) {
          // nothing
        } else {
          this.callSnackbar(
            this.state.strings.snackbar.newanalysissectionserror
          );
        }
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };

  callSnackbar = message => {
    this.setState({
      SnackbarClicked: true,
      SnackbarText: message
    });
  };

  removeAnalysisFragment = fragmentToRemove => {
    let newState = this.state.generalConfig;
    newState.analysisSections = newState.analysisSections.filter(
      fragment => fragment !== fragmentToRemove
    );
    this.setState({
      generalConfig: newState
    });
    this.setAnalysisSections();
  };

  restoreAnalysisFragment = () => {
    let newState = this.state.generalConfig;
    newState.analysisSections = defaultAnalysisConfig;
    this.setState({
      generalConfig: newState
    });
    this.setAnalysisSections();
    //console.log(this.state);
  };

  handleClose = () => {
    this.setState({
      SnackbarClicked: false,
      SnackbarText: ""
    });
  };

  toggleInfoModal = () => {
    let newModals = this.state.modals;
    newModals.showInfo = !newModals.showInfo;
    this.setState({
      modals: newModals
    });
  };

  toggleSettingsModal = () => {
    let newModals = this.state.modals;
    newModals.showSettings = !newModals.showSettings;
    this.setState({
      modals: newModals
    });
  };

  render() {
    let snackbar = "";
    if (this.state.SnackbarClicked) {
      snackbar = (
        <Snackbar close={this.handleClose} message={this.state.SnackbarText} />
      );
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
      deleteFieldConfig: this.deleteFieldConfig,

      openSnackbar: this.openSnackbar,

      removeAnalysisFragment: this.removeAnalysisFragment,
      restoreAnalysisFragment: this.restoreAnalysisFragment,

      toggleInfoModal: this.toggleInfoModal,
      toggleSettingsModal: this.toggleSettingsModal
    };

    return (
      <DataContext.Provider value={contextValue}>
        {snackbar}
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export const Consumer = DataContext.Consumer;
