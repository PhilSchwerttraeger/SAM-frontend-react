import React, {Component} from "react";
import ReactDOM from "react-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker} from "@material-ui/pickers";

var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

export default class MaterialDatePicker extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      date: ""
    }

    // if passed value is dd.mm.yyyy format -> make date type
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

  // Should return the final value to the grid, the result of the editing
  getValue() {
    let parsedDate = this.state.date;
    //console.log(parsedDate); return;

    // Check whether parsedDate is Date-type (-> has getMonth function), otherwise it's an already parsed string
    // state.date can be Date (when abord editing) or be String (when successfully close widget)
    if(typeof parsedDate.getMonth === 'function'){
      parsedDate = parsedDate.toLocaleDateString('de-DE', options);
    }
    //console.log(parsedDate); //correct
    return parsedDate;
  }

  // Called whenever the widget has a new date to save
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

  // Gets called once before editing starts, to give editor a chance to
  // cancel the editing before it even starts.
  isCancelBeforeStart = () => {
    return false;
  }

  // Gets called once when editing is finished (eg if enter is pressed).
  // If you return true, then the result of the edit will be ignored.
  isCancelAfterEnd = () => {
    return false;
  }

  isPopup = () => {
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