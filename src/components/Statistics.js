import React, { Component } from 'react'
import { Consumer } from './DataContext'; 

export default class Statistics extends Component {
    render() {
        return (
            <Consumer>
                {state => 
                    <h4 style={{fontWeight: 500}}>{state.data.strings.titles.statistics}</h4>
                }
            </Consumer>
        )
    }
}
