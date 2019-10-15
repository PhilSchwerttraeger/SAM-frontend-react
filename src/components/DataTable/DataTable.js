import React, { Component } from "react";
import { Consumer } from "../DataContext";
import Spinner from "../../assets/Spinner";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AutocompleteSelectCellEditor } from "ag-grid-autocomplete-editor";
import "./autocomplete.css";
import MaterialDatePicker from "./MaterialDatePicker";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
//import { DataContext } from "../DataContext";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import DuplicateIcon from "@material-ui/icons/ControlPointDuplicate";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Tooltip from "@material-ui/core/Tooltip";

function dateComparator(date1, date2) {
  var date1Number = monthToComparableNumber(date1);
  var date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}

function textComparator(a, b) {
  if (a === null && b === null) {
    return 0;
  }
  if (a === null || a.label === null) {
    return -1;
  }
  if (b === null || b.label === null) {
    return 1;
  }
  a = a.label;
  b = b.label;
  let result = a.toLowerCase().localeCompare(b.toLowerCase());
  return result;
}

function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);
  var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  return result;
}

function currencyFormatter(params) {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });

  if (params.value) {
    return formatter.format(params.value);
  } else {
    return;
  }
}

export function getCurrentlyVisibleRows() {
  console.log("row data");
  return "row data";
}

export default class DataTable extends Component {
  constructor(props) {
    super(props);
    this.dataTableRef = React.createRef();
  }

  createColDef = state => {
    let counter = -1;
    //console.log(state.fieldConfig);
    return (state && state.fieldConfig && state.fieldConfig.length) ? state.fieldConfig.map(column => {
      counter++;
      let columnConfig = {
        headerName: column.name,
        field: column.name,
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
      };

      if (column.type === "select") {
        columnConfig.width = 110;
      }

      // enable checkbox if column is first column
      if (counter === 0) {
        columnConfig.checkboxSelection = true;
        columnConfig.width = 130;
      }

      // enable date comparator when field type is 'date'
      if (column.type === "date") {
        columnConfig.comparator = dateComparator;
        columnConfig.filter = "agDateColumnFilter";
        columnConfig.filterParams = {
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            if (dateAsString == null) return -1;
            var dateParts = dateAsString.split(".");
            var cellDate = new Date(
              Number(dateParts[2]),
              Number(dateParts[1]) - 1,
              Number(dateParts[0])
            );
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
              return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          },
          browserDatePicker: true
        };
        columnConfig.browserDatePicker = true;
        columnConfig.width = 150;
      }

      // enable currency settings when field type is 'currency'
      if (column.type === "currency") {
        columnConfig.cellStyle = { "text-align": "right" };
        columnConfig.valueFormatter = currencyFormatter;
        columnConfig.width = 130;
      }

      // enable auto-complete (npm package) on pure text-typed fields
      if (column.type === "text") {
        columnConfig.comparator = textComparator;

        /*
        // build fields array (with label and value child items)
        let autocompleteData = [];
        if (state.fields) {
          autocompleteData = state.fields.map(field => {
            if (field) {
              if (field.description) {
                if (field.description.label) {
                  return {
                    label: field.description.label,
                    value: field.description.value
                  };
                } else
                  return {
                    label: "",
                    value: ""
                  };
              } else
                return {
                  label: "",
                  value: ""
                };
            } else return null;
          });
        }

        // filter duplicate array items from autocomplete list
        let filtered = autocompleteData.filter(el => {
          if (el) {
            if (el.label) {
              return el.label;
            } else return false;
          } else return false;
        });

        // comparing two array items with the help of its label property
        let compare = (a, b) => {
          const A = a.label;
          const B = b.label;

          let comparison = 0;
          if (A > B) {
            comparison = 1;
          } else if (A < B) {
            comparison = -1;
          }
          return comparison;
        };

        function getUnique(arr, comp) {
          const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e])
            .map(e => arr[e]);
          return unique;
        }

        // call sorting with custom comparison function
        let processedData = filtered.sort(compare);
        let processedDataSet = getUnique(processedData, "label");

        columnConfig.cellEditorParams = {
          // Add autocompleteData to cell editor
          // eslint-disable-next-line
          selectData: processedDataSet,

          placeholder: state.strings.datatable.autoCompleteSelect,
          autocomplete: {
            strict: false,
            autoselectfirst: false,
            debounceWaitMs: 0
          }
        };

        // formatting cell: show label of description
        columnConfig.valueFormatter = params => {
          if (params.value) {
            return params.value.label;
          }
          return "";
        };
        //columnConfig.editable = true;

        */

        columnConfig.getQuickFilterText = params => {
          if (params.value) {
            return params.value.label;
          }
          return "";
        };
        columnConfig.width = 220;
      }

      // return column config
      return columnConfig;
    }) : null;
  };

  addNewItem = (state) => {
    // 1. Create new empty row
    let data = {};
    state.data.fieldConfig.map(fieldConfig => data[fieldConfig.name] = "");

    // id generation, time-based / time-sortable
    const kuuid = require("kuuid");
    data.id = kuuid.id();

    // 2. Add to backend
    //console.log(data);
    state.addEntry(data);
  };

  deleteSelectedItem = (state) => {
    // 1. Get selected items
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id);
    const selectedDescriptions = selectedNodes.map(
      node => node.data.description
    );
    let deleteMessage =
      state.data.strings.datatable.confirmDelete +
      " \n- " +
      selectedDescriptions.join("\n- ");
    let userConfirmation = window.confirm(deleteMessage);

    // Invoke delete action on context component
    if (userConfirmation) {
      state.deleteEntries(selectedIds);
    }
  };

  duplicateSelectedItem = () => {
    // 1. Get selected items
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id);

    // 2. For each selected item...
    selectedIds.forEach(id => {
      this.state.data.fields.forEach(field => {
        // ... check if id matches...
        if (field.id === id) {
          // ... and remove id property ...
          delete field.id;

          // ... and generate a fresh id ...
          const uuid = require("uuid/v1");
          field.id = uuid();

          // ... to then add to backend.
          this.state.addEntry(field);
        }
      });
    });
  };

  downloadCSV = () => {
    var params = {
      processCellCallback: cell => {
        console.log(cell);
        return cell.value;
      }
    };
    this.gridApi.exportDataAsCsv(params);
  };

  quickSearch = props => {
    //console.log(props.target.value);
    this.gridApi.setQuickFilter(props.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <Consumer>
        {state => {
          let entriesBody = (state.data.entries && state.data.entries.length) ? state.data.entries : null;
          entriesBody = entriesBody ? entriesBody.map(entry => entry.body) : null;
          console.log(entriesBody);

          return (
            <div
              className="ag-theme-material"
              style={{
                //height: '550px',
                //height: '100%',
                //width: 100%',
                paddingBottom: "10px"
              }}
            >
              <Grid
                container
                justify="space-between"
                direction="row"
                alignItems="center"
              >
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <Tooltip title={state.data.strings.datatable.add}>
                        <IconButton
                          variant="outlined"
                          onClick={() => this.addNewItem(state)}
                          color="primary"
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    <Grid item>
                      <Tooltip title={state.data.strings.datatable.duplicate}>
                        <IconButton
                          variant="outlined"
                          onClick={this.duplicateSelectedItem}
                          color="primary"
                        >
                          <DuplicateIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    <Grid item>
                      <Tooltip title={state.data.strings.datatable.delete}>
                        <IconButton
                          variant="outlined"
                          onClick={() => this.deleteSelectedItem(state)}
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    <Grid item>
                      <Tooltip title={state.data.strings.datatable.download}>
                        <IconButton
                          variant="outlined"
                          onClick={this.downloadCSV}
                          color="primary"
                        >
                          <SaveAltIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item />
                <Grid item>
                  <Grid container alignItems="flex-end">
                    <TextField
                      id="standard-search"
                      label="Search field"
                      type="search"
                      margin="none"
                      onChange={this.quickSearch.bind(this)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <AgGridReact
                domLayout="autoHeight"
                columnDefs={this.createColDef(state.data)}
                rowData={entriesBody}
                rowSelection="multiple"
                onGridReady={params => {
                  this.gridApi = params.api;
                  this.gridColumnApi = params.columnApi;
                }}
                frameworkComponents={{
                  datePicker: MaterialDatePicker
                }}
                onModelUpdated={params => {
                  this.gridApi = params.api;
                  state.setSelectedEntries(
                    this.gridApi.getModel().rowsToDisplay
                  );
                }}
                animateRows={true}
              />
            </div>
          );
        }}
      </Consumer>
    );
  }
}
