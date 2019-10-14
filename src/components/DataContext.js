import React, { Component } from "react";
import Snackbar from "./Snackbars";

export const DataContext = React.createContext();

const serverURL =
  //"https://europe-west1-api-dashboard-5chw.cloudfunctions.net/api";
  "http://localhost:5000/api-dashboard-5chw/europe-west1/api";

const header = {
  headers: new Headers({
    "Content-Type": "application/json",
    "Authorization":
      `${localStorage.FirebaseIdToken}`
  })
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
    this.state = {
      userId: null,
      email: null,
      createdAt: null,

      settings: {
        accountType: null, // premium, free
        language: null, // english, german
        currency: null, // euro, dollar
        analysisSections: [] // sum, average, minimum, maximum, totalin, totalout
      },
      fieldConfig: [],
      entries: [],

      strings: [],
      runtime: {
        visibleEntries: [],
        modals: {
          showInfo: false,
          showSettings: false
        }
      },
      isFetching: true
    };
  }

  componentWillMount() {
    this.fetchEverything();
  }

  fetchEverything = () => {
    this.fetchUserData();
    this.fetchFieldConfig();
    this.fetchEntries();
    this.setState({ strings: require("../languages/english.json") });
  };

  fetchUserData = () => {
    return;

    fetch(serverURL + "/userdata", header)
      .then(res => res.json())
      .then(data => {
        this.setState(oldState => {
          return {
            ...oldState,
            ...data
          };
        });
      })
      .catch(err => {
        console.log("Error fetching userdata: ", err);
      });
  }

  fetchFieldConfig = () => {
    //return;

    fetch(serverURL + "/fieldConfig", header)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          fieldConfig: data
        });
      })
      .catch(err => {
        console.log("Error fetching fieldconfig: ", err);
      });
  }

  fetchEntries = () => {
    //return;

    fetch(serverURL + "/entries", header)
      .then(res => res.json())
      .then(data => {
        this.setState({
          entries: data
        });
        this.setState({
          isFetching: false
        })
      })
      .catch(err => {
        console.log("Error fetching entries: ", err);
      });
  }

  updateEntry = (id, data) => {
    delete data.tableData;
    this.setState(oldState => ({
      entries: oldState.entries.map(el => (el.id === id ? data : el))
    }));

    return;

    fetch(serverURL + "/entries/" + id, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        //console.log(res);
        if (res.ok) {
          // nothing
        } else {
          this.callSnackbar(this.state.strings.snackbar.entryupdatederror);
        }
        return res;
      })
      .catch(err => {
        console.log("Error while updating entry" + err);
      });
  };

  addEntry = data => {
    this.setState(oldState => {
      console.log("old state: ", oldState.entries);
      let newEntries = oldState.entries;
      newEntries.push(data);
      return {
        entries: newEntries
      };
    });

    return;

    return fetch(serverURL + "/entries/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: header.headers
    })
      .then(res => {
        if (res.ok) {
          // nothing
          // DO TO: save ID
        } else {
          this.callSnackbar(this.state.strings.snackbar.entryaddederror);
        }
        return res;
      })
      .catch(err => {
        console.log("Error while adding entry: " + err);
        return err;
      });
  };

  deleteEntries = Ids => {

    Ids.forEach(id => {
      this.setState(oldState => {
        // eslint-disable-next-line
        return {
          entries: oldState.entries.filter(item => {
            if (item.id !== id) {
              return true;
            } else {
              //console.log(id + " was deleted from state.");
              return false;
            }
          })
        };
      });

      return;

      fetch(serverURL + "/entries/" + id, {
        method: "DELETE",
        //body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          //console.log(res);
          //console.log(id + " was deleted from db.");
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

  // SELECTED ENTRIES

  setSelectedEntries = entries => {
    this.setState(oldState => ({
      runtime: {
        ...oldState.runtime,
        visibleEntries: entries
      }
    }));
  }

  getSelectedEntries = () => {
    return this.state.runtime.visibleEntries;
  };

  setFieldsConfig = newConfig => {
    this.setState({
      fieldConfig: newConfig
    });

    return;

    fetch(serverURL + "/fieldConfig", {
      method: "POST",
      body: JSON.stringify(newConfig),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
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

    this.setState(oldState => ({
      fieldConfig: [...oldState.fieldConfig, emptyFieldConfig]
    }));

    return;

    fetch(serverURL + "/fieldConfig", {
      method: "POST",
      body: JSON.stringify(emptyFieldConfig),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
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
    this.setState(oldState => {
      // eslint-disable-next-line
      return {
        entries: oldState.fieldConfig.filter(item => {
          if (item.id !== id) {
            return true;
          } else {
            //console.log(id + " was deleted from state.");
            return false;
          }
        })
      };
    });

    return;

    fetch(serverURL + "/fieldConfig/" + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        //console.log(id + " was deleted from db.");
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

  setSettings = newSettings => {
    console.log("Setting new settings: ", newSettings);

    this.setState({
      settings: newSettings
    });

    return;

    fetch(serverURL + "/settings", {
      method: "POST",
      body: JSON.stringify(newSettings),
      headers: header.headers
    })
      .then(res => {
        //console.log(res);
        if (res.ok) {
          console.log("Net settings set successfully.");
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
  }

  removeAnalysisFragment = fragmentToRemove => {
    console.log("Remove analysis fragment: ", fragmentToRemove);

    let newSections = this.state.settings.analysisSections;
    newSections = newSections.filter(
      fragment => fragment !== fragmentToRemove
    );
    let newState;
    this.setState(oldState => {
      newState = {
        ...oldState.settings,
        analysisSections: newSections
      };
      this.setSettings(newState); // calls api
      return { settings: newState }
    });
  };

  restoreAnalysisFragment = () => {
    let newState = this.state.settings.analysisSections;
    newState = defaultAnalysisConfig;
    this.setState(oldState => ({
      settings: {
        ...oldState.settings,
        analysisSections: newState
      }
    }));
    this.setSettings(); // calls api
  };

  callSnackbar = message => {
    this.setState({
      SnackbarClicked: true,
      SnackbarText: message
    });
  };

  handleClose = () => {
    this.setState({
      SnackbarClicked: false
    });
  };

  toggleInfoModal = () => {
    let newState = !this.state.runtime.modals.showInfo;
    this.setState({
      runtime: {
        modals: {
          showInfo: newState
        }
      }
    });
  };

  toggleSettingsModal = () => {
    let newModals = this.state.runtime.modals;
    newModals.showSettings = !newModals.showSettings;
    this.setState({
      runtime: {
        modals: newModals
      }
    });
  };

  render() {
    let snackbar = this.state.SnackbarClicked ?
      <Snackbar close={this.handleClose} message={this.state.SnackbarText} />
      : null;

    const contextValue = {
      data: this.state,

      updateEntry: this.updateEntry,
      addEntry: this.addEntry,
      deleteEntries: this.deleteEntries,

      setSelectedEntries: this.setSelectedEntries,
      getSelectedEntries: this.getSelectedEntries,

      fetchEverything: this.fetchEverything,
      fetchEntries: this.fetchEntries,
      fetchFieldConfig: this.fetchFieldConfig,
      fetchSettings: this.fetchSettings,

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
