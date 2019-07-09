import React, { Component } from 'react';
import { Consumer } from './DataContext';

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
          console.log(state);
          return <div>{state.strings.titles.datatable}</div>
        }}
      </Consumer>
    )
  }
}
