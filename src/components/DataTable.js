import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";

export default class DataTable extends Component {
  render() {
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

    const options = {
      filterType: "multiselect",
      // no scrolling behaviour inside table:
      responsive: "stacked", 
      rowsPerPage: 50,
      rowsPerPageOptions: [10, 50, 100, 500],
      textLabels: this.props.state.strings.tableTextLabels,
      
      
    };

    return (
      <div>
        <MUIDataTable
          title={this.props.state.strings.titles.datatable}
          data={data}
          columns={columns}
          options={options}
      	/>
      </div>
    )
  }
}
