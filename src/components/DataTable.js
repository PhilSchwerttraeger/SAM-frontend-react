import React, { Component } from 'react';
import { Consumer } from './DataContext';
import MaterialTable from 'material-table';
import Spinner from '../assets/Spinner';

export function updateEntry(id, data) {
  return fetch('http://localhost:3001/fields/' + id, {
      method: 'PUT',
      mode: 'CORS',
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
          if(state.fieldConfig === undefined){
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
                          // eslint-disable-next-line
                            {
                              /* const data = this.state.data;
                              data.push(newData);
                              this.setState({ data }, () => resolve()); */
                            }
                            resolve();
                        }, 2500);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          // eslint-disable-next-line
                            {
                              const fields = state.fields;
                              const index = fields.indexOf(oldData);
                              delete newData.tableData;
                              fields[index] = newData;         
                              this.setState({ fields }, () => resolve());
                              updateEntry(index, newData);
                            }
                            resolve();
                        }, 2500);
                      }),
                    onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                        // eslint-disable-next-line
                          {
                            /* let data = this.state.data;
                            const index = data.indexOf(oldData);
                            data.splice(index, 1);
                            this.setState({ data }, () => resolve()); */
                          }
                          resolve();
                        }, 2500);
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
