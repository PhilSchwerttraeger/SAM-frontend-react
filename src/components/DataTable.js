import React, { Component } from 'react';
import { Consumer } from './DataContext';
import MaterialTable from 'material-table';
import Spinner from '../assets/Spinner';

export function updateEntry(id, data) {
  delete data.tableData;
  console.log({id, data});
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

export default class DataTable extends Component {
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
              <div>
                <MaterialTable 
                  title = {state.strings.titles.datatable}
                  columns = {
                    state.fieldConfig.map(
                      column => {
                        return {
                          title: column.title,
                          field: column.name,
                          type: column.type
                        };
                      }
                    )
                  }
                  data = {state.fields}
                  options={{
                    exportButton: true
                  }}
                  editable={{
                    onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                              const fields = state.fields;
                              fields.push(newData);
                              //addEntry(newData);
                              this.setState({ fields }, () => resolve());
                            }
                            resolve();
                        }, 500);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                              const fields = state.fields;
                              const index = fields.indexOf(oldData);
                              //delete newData.tableData;
                              fields[index] = newData;
                              updateEntry(index, newData);
                              this.setState({ fields }, () => resolve());
                            }
                            resolve();
                        }, 500);
                      }),
                    onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          {
                            let fields = state.fields;
                            const index = fields.indexOf(oldData);
                            fields.splice(index, 1);
                            this.setState({ fields }, () => resolve());
                          }
                          resolve();
                        }, 500);
                      })
                  }}
                />
              </div>
            )
          }
        }}
      </Consumer>
    )
  }
}
