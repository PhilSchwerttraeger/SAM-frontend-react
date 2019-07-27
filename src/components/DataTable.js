import React, { Component } from 'react';
import { Consumer } from './DataContext';
import Spinner from '../assets/Spinner';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {AutocompleteSelectCellEditor} from 'ag-grid-autocomplete-editor';
import 'ag-grid-autocomplete-editor/main.css';
import MaterialDatePicker from './MaterialDatePicker';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Snackbars from './Snackbars';
import { DataContext } from './DataContext';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  })
  
  if(params.value){
    return formatter.format(params.value);
  } else {
    return
  }
}

export function getCurrentlyVisibleRows(){
  console.log("row data");
  return "row data";
}

export default class DataTable extends Component {
  constructor(props){
    super(props);
    this.dataTableRef = React.createRef();
  }

  static context = DataContext;

  createColDef = (state) => {
    return state.fieldConfig.map(
      column => {
        let columnConfig = {
          headerName: column.title,
          field: column.name,
          sortable: true,
          filter: true,
          editable: true,
          resizable: true
        };

        // enable checkbox if column is first column
        if(column.id === 0){
          //columnConfig.checkboxSelection = true;
        }

        if(column.type === "select"){
          columnConfig.cellEditor = "agSelectCellEditor";
          columnConfig.cellEditorParams = {
            values: column.values
          }
          columnConfig.width = 110
        }

        // enable date comparator when field type is 'date'
        if(column.type === "date"){
          columnConfig.comparator = dateComparator;
          columnConfig.filter = "agDateColumnFilter";
          columnConfig.cellEditor = "datePicker";
          columnConfig.filterParams = {
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              var dateAsString = cellValue;
              if (dateAsString == null) return -1;
              var dateParts = dateAsString.split(".");
              var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
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
          }
          columnConfig.browserDatePicker = true;
          columnConfig.width = 120
        }

        // enable currency settings when field type is 'currency'
        if(column.type === "currency"){
          columnConfig.cellStyle = {'text-align': 'right'};
          columnConfig.valueFormatter = currencyFormatter
          columnConfig.width = 120
        }

        // enable auto-complete (npm package) on pure text-typed fields
        if(column.type === "text"){
          columnConfig.cellEditor = AutocompleteSelectCellEditor;
          columnConfig.cellEditorParams = {
            // eslint-disable-next-line 
            selectData: state.fields.map(field => {
              if(field){
                if(field.description) {
                  if(field.description.label){
                    return ({
                      label: field.description.label,
                      value: field.description.value
                    });
                  } else return ({
                    label: "",
                    value: ""
                  })
                } else return ({
                  label: "",
                  value: ""
                });
              } else console.log(state);
            }),
            
            /*[
                {
                  label: 'Canada', 
                  value: 'CA', 
                  group: 'North America' 
                }
            ]*/
            
            placeholder: state.strings.datatable.autoCompleteSelect,
            autocomplete: {
                strict: false,
                autoselectfirst: false,
                debounceWaitMs: 0,
            }
          };

          // filter duplicate array items from autocomplete list
          // eslint-disable-next-line
          var filtered = columnConfig.cellEditorParams.selectData.filter(el => {
            if(el){
              if (!this[el.label]) {
                this[el.label] = true;
                return true;
              }
              return false;
            }
          }, Object.create(null));

          // comparing two array items with the help of its label property
          var compare = (a, b) => {
            const A = a.label;
            const B = b.label;
          
            let comparison = 0;
            if (A >= B) {
              comparison = 1;
            } else if (A < B) {
              comparison = -1;
            }
            return comparison;
          }
          
          // call sorting with custom comparison function
          filtered.sort(compare);
          //console.log(columnConfig.cellEditorParams.selectData);
          //console.log(filtered);

          // formatting cell: show label of description
          columnConfig.valueFormatter = (params) => {
              if (params.value) {
                  return params.value.label;
              }
              return "";
          };
          //columnConfig.editable = true;

          columnConfig.getQuickFilterText = (params) => {
            if (params.value) {
              return params.value.label;
            }
            return "";
          }
          columnConfig.width = 220
        }

        // return column config
        return columnConfig;
      }
    )
  }
  
  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.id).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }
  
  addNewItem = () => {
    // 1. Create new empty row
    let data = {};
    this.contextState.data.fieldConfig.map(fieldConfig => {
      if(fieldConfig.type === "text"){
        return data[fieldConfig.name] = {label: ""};
      } else{
        return data[fieldConfig.name] = '';
      }
      
    });

    // 2. Add to backend
    this.contextState.addEntry(data);
  }
  
  deleteSelectedItem = () => {
    // 1. Get selected items
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id);
    let deleteMessage = this.contextState.data.strings.datatable.confirmDelete + " " + selectedIds.join(', ') + "?";
    alert(deleteMessage);
    
    this.contextState.deleteEntries(selectedIds);
  }
  
  downloadCSV = () => {
    var params = {
      processCellCallback: cell => {
        console.log(cell);
        if(cell.value.label){
          return cell.value.label;
        } else return cell.value;
      }
    }
    this.gridApi.exportDataAsCsv(params);
  }

  validateValueCell(value){
    if(typeof(value) === 'string'){
      value = Number(value);
      //console.log("TypeCast: " + typeof(data.value));
      //console.log(value);
      if(isNaN(value)) 
        this.setState({
          showError: true
        })
        //alert("Invalid value input. Please insert Numbers with format 1337 or 1337.99 only.");
    }
  }

  // cell in table modified -> update backend (DataContext)
  onCellChanged = (state, e) => {
    this.validateValueCell(e.data.value);
    //console.log("e: ", e, " state: ", state);
    state.updateEntry(e.data.id, e.data);
  }

  autoSizeColumns = () => {
    //alert("autosized");
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  quickSearch = props => {
    //console.log(props.target.value);
    this.gridApi.setQuickFilter(props.target.value);
  }

  componentDidMount(){
    
  }
  
  componentDidUpdate(){

  }

  render() {
    return (
      <Consumer>
        {state => {
          this.contextState = state;
          //console.log(state);
          //console.log(currentlyVisibleRowData);
          //state.setCurrentlyVisibleRowData("jo");
          if(state.data === undefined 
            || state.data.fieldConfig === undefined){
            // data not fetched yet, show spinner
            return <Spinner />
          } else {
            return (
              <div 
                className="ag-theme-material"
                style={{ 
                  height: '550px',
                  //height: '100%',
                  //width: 100%',
                  paddingBottom: '50px'
                }} 
              >
                <Grid
                  container 
                  justify='space-between'
                  direction="row"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container>

                      <Grid item>
                        <IconButton 
                          variant="outlined" 
                          onClick={this.addNewItem}
                          color="primary"  
                        >
                        <AddIcon />
                          
                        </IconButton>
                      </Grid>

                      <Grid item>
                        <IconButton 
                          variant="outlined" 
                          onClick={this.deleteSelectedItem}
                          color="secondary"  
                        >
                          <DeleteIcon />
                          
                        </IconButton>
                      </Grid>

                      <Grid item>
                        <IconButton 
                          variant="outlined" 
                          onClick={this.downloadCSV}
                          color="primary"
                        >
                          <SaveAltIcon />
                          
                        </IconButton>
                      </Grid>

                    </Grid>
                  </Grid>

                  <Grid item></Grid>
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
                  //forwardRef="agGrid" // "React's id"
                  ref={this.dataTableRef}
                  columnDefs={this.createColDef(state.data)}
                  rowData={state.data.fields}
                  rowSelection="multiple"
                  suppressRowClickSelectionprevents 
                  onGridReady={ 
                    params => {
                      this.gridApi = params.api;
                      this.gridColumnApi = params.columnApi;
                      //this.autoSizeColumns.bind(this);
                    }
                  }
                  frameworkComponents={{
                    datePicker: MaterialDatePicker
                  }}
                  onCellValueChanged = {
                    this.onCellChanged.bind(this, state)
                    //this.autoSizeColumns.bind(this);
                    //this.autoSizeColumns();
                  }
                  /*
                  onFirstDataRendered={
                    this.autoSizeColumns.bind(this)
                  }
                  */
                  onModelUpdated={
                    params => {
                      this.gridApi = params.api;
                      this.gridApi.sizeColumnsToFit.bind(this);
                      state.setSelectedEntries(this.gridApi.getModel().rowsToDisplay);
                      //this.autoSizeColumns.bind(this);
                    }
                  }
                  /*
                  onRowDataUpdated={
                    //this.autoSizeColumns.bind(this)
                  }
                  */
                  animateRows={true}
                >
                </AgGridReact>

                <Snackbars />
              </div>
            )
          }
        }}
      </Consumer>
    )
  }
}