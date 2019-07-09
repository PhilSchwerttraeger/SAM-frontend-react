import React, {Component} from 'react';

const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    data: [],
    strings: []
  }

  componentWillMount(){
    fetch('http://localhost:3001/data')
      .then(
        res => res.json()
      )
      .then(
        data => {
          this.setState(
            {
              data: data
            }
          );
        }
      );

    this.setState(
      { 
        strings: require('../languages/english.json') 
      }
    );
  }

  render(){
    return(
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export const Consumer = DataContext.Consumer;