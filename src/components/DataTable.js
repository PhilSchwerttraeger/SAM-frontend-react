import React, { Component } from 'react'

export default class DataTable extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.state.strings.titles.datatable}</h2>
            </div>
        )
    }
}
