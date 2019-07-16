import React, {Component} from "react";
import ReactDOM from "react-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker} from "@material-ui/pickers";
import deLocale from "date-fns/locale/de";
import format from "date-fns/format";

var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

export default class MaterialDatePicker extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);

    //let dateNow = new Date();

    this.state = {
      date: ""
    }

    try {
      var parts = props.value.match(/(\d+)/g);
      let parsedDate = new Date(parts[2], parts[1]-1, parts[0]);

      this.state.date = parsedDate;
    }
    catch (e) {
      console.log(e);
    }

    //console.log(this.state.date); // correct
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
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
    let parsedDate = this.state.date;
    //console.log(parsedDate); return;
    if(typeof parsedDate.getMonth === 'function'){
      parsedDate = parsedDate.toLocaleDateString('de-DE', options);
    }
    //parsedDate = parsedDate.toLocaleDateString('de-DE', options);
    console.log(parsedDate); //correct
    return parsedDate;
  }

  onDateChange(date) {
    if(date){
      let parsedDate = date.toLocaleDateString('de-DE', options);
      
      //console.log(parsedDate); //correct
      this.setState(
        {
          date: parsedDate
        },
        () => this.props.api.stopEditing()
      ); 
    } else {
      this.setState(
        {
          date: ""
        },
        () => this.props.api.stopEditing()
      ); 
    }
  }

  isCancelBeforeStart = () => {
    return false;
  }

  isCancelAfterEnd = () => {
    return false;
  }

  render() {
    return (
      <div ref="container"
        tabIndex={1} // important - without this the keypresses wont be caught
      >
        <MuiPickersUtilsProvider 
          utils={DateFnsUtils}
        >
          <DatePicker 
            placeholder="Format: 31.10.2018"
            clearable
            format="dd.MM.yyyy"
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