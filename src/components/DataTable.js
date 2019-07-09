import React, { Component } from 'react';
import { Consumer } from './DataContext';
import MaterialTable from 'material-table';
import Spinner from './Spinner';

export default class DataTable extends Component {
  render() {
    /*
    var columns = [];
		var data = [];
    
		if(this.props.state.data.fieldConfig){
			columns = this.props.state.data.fieldConfig.map(
        fieldItem => {
          var column = {
            name: fieldItem.name,
            label: fieldItem.title,
            // en/disable sort/filter here is needed
            // filter: true
            // sort: false
            filterList: fieldItem.type
          }
          return column;
        }
      );
      columns.shift();
		}

    if(this.props.state.data.fields){
			data = this.props.state.data.fields.map(
				fieldItem => {
          let item = Object.values(fieldItem);
          item.shift();
          return(item);
        }
			);
    }
    
    */

    return (
      <Consumer>
        {state => {
          if(state.data.fieldConfig === undefined){
            // data not fetched yet, show spinner
            return <Spinner />
          } else {
            //console.log(state);
            return (
              <div>
                <MaterialTable 
                  title = {state.strings.titles.datatable}
                  columns = {
                    state.data.fieldConfig.map(
                      column => {
                        return {
                          title: column.title,
                          field: column.name,
                          type: column.type
                        };
                      }
                    )
                  }
                  data = {state.data.fields}
                  options={{
                    exportButton: true
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
