import React, {Component} from "react";
import ReactDOM from "react-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import deLocale from "date-fns/locale/de";
import {DatePicker} from "@material-ui/pickers";

var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

export default class MoodEditor extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);

    let dateNow = new Date (Date.now());
    dateNow.toLocaleDateString('de-DE', options);

    this.state = {
      date: dateNow
    }

    try {
      var parts = props.value.match(/(\d+)/g);
      let parsedDate = new Date(parts[2], parts[1]-1, parts[0]);

      this.state.date = parsedDate;
    }
    catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  focus() {
    window.setTimeout(() => {
      let container = ReactDOM.findDOMNode(this.refs.container);
      if (container) {
        container.focus();
      }
    })
  }

  getValue() {
    return this.state.date;
  }

  onDateChange(date) {
    if(date){
      let parsedDate = date.toLocaleDateString('de-DE', options);
      
      this.setState(
        {
          date: parsedDate
        },
        () => this.props.api.stopEditing()
      ); 
    } else {
      this.setState(
        {
          date: "30.05.1990"
        },
        () => this.props.api.stopEditing()
      ); 
    }
    
  }

  render() {
    return (
      <div ref="container"
        tabIndex={1} // important - without this the keypresses wont be caught
      >
        <MuiPickersUtilsProvider 
          utils={DateFnsUtils}
          locale = {deLocale}
        >
          <DatePicker 
            placeholder="Format: 31.10.2018"
            format="dd.MM.yyyy"
            clearable
            autoOk
            views={["year", "month", "date"]}
            value={this.state.date} 
            onChange={this.onDateChange}
            //invalidDateMessage={this.state.strings.test}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}