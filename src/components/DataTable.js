import React, { Component } from 'react';
import { Consumer } from './DataContext';
import Spinner from '../assets/Spinner';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export function updateEntry(id, data) {
  delete data.tableData;
  return fetch('http://localhost:3001/fields/' + id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res => {
      return res;
  }).catch(err => err);
}

export function addEntry(data) {
  delete data.tableData;
  return fetch('http://localhost:3001/fields', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res => {
      return res;
  }).catch(err => err);
}

export function deleteEntry(id) {
  return fetch('http://localhost:3001/fields/' + id, {
      method: 'DELETE',
      //body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res => {
      return res;
  }).catch(err => err);
}

export default class DataTable extends Component {
  mapColumns = (state) => {
    return state.fieldConfig.map(
      column => {
        return {
          headerName: column.title,
          field: column.name
          //type: column.type
        };
      }
    )
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
            //console.log(state);
            return (
              <div 
                className="ag-theme-material"
                style={{ 
                height: '500px'}} 
              >
                <AgGridReact
                  columnDefs={this.mapColumns(state)}
                  rowData={state.fields}>
                </AgGridReact>
              </div>
            )
          }
        }}
      </Consumer>
    )
  }
}
