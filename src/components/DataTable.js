import React, { Component } from 'react';
// eslint-disable-next-line
import { Consumer, addEntry, deleteEntry, updateEntry } from './DataContext';
import Spinner from '../assets/Spinner';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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
  
  return formatter.format(params.value);
}

export default class DataTable extends Component {
  createColDef = (state) => {
    return state.fieldConfig.map(
      column => {
        let columnConfig = {
          headerName: column.title,
          field: column.name,
          sortable: true,
          filter: true,
          editable: true,
          resizable: true,
          width: 130
        };

        // enable checkbox if column is first column
        if(column.id === 0){
          columnConfig.checkboxSelection = true;
        }

        if(column.type === "select"){
          columnConfig.cellEditor = "agSelectCellEditor";
          columnConfig.cellEditorParams = {
            values: column.values
          }
        }

        // enable date comparator when field type is 'date'
        if(column.type === "date"){
          columnConfig.comparator = dateComparator;
          columnConfig.filter = "agDateColumnFilter";
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
        }

        // enable currency settings when field type is 'currency'
        if(column.type === "currency"){
          columnConfig.cellStyle = {'text-align': 'right'};
          columnConfig.valueFormatter = currencyFormatter
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

  // cell in table modified -> update backend (DataContext)
  onCellChanged = (e) => {updateEntry(e.data.id, e.data)}

  onFirstDataRendered = e => {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  render() {
    return (
      <Consumer>
        {state => {
          if(state === undefined 
            || state.fieldConfig === undefined){
            // data not fetched yet, show spinner
            return <Spinner />
          } else {
            return (
              <div 
                className="ag-theme-material"
                style={{ 
                  height: '500px'
                  //height: '100%; width: 100%'
                }} 
              >
                <button onClick={this.onButtonClick}>
                  Get selected rows
                  </button>
                <AgGridReact
                  forwardRef="agGrid" // "React's id"
                  columnDefs={this.createColDef(state)}
                  rowData={state.fields}
                  rowSelection="multiple"
                  onGridReady={ 
                    params => {
                      this.gridApi = params.api;
                      this.gridColumnApi = params.columnApi;
                      params.api.sizeColumnsToFit.bind(this);
                    }
                  }
                  onCellValueChanged = {
                    this.onCellChanged.bind(this)
                  }
                  onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                >
                </AgGridReact>
              </div>
            )
          }
        }}
      </Consumer>
    )
  }
}