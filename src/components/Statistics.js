import React, { Component } from 'react'

export default class Statistics extends Component {
    render() {
        return (
            <div>
                <h4 style={{fontWeight: 500}}>{this.props.state.strings.titles.statistics}</h4>
            </div>
        )
    }
}
