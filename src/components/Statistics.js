import React, { Component } from 'react'

export default class Statistics extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.state.strings.titles.statistics}</h2>
            </div>
        )
    }
}
