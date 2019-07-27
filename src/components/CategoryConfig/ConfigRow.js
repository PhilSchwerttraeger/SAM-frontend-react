import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

export default function ConfigRow(props) {
  // eslint-disable-next-line
  const [fieldName, setFieldName] = useState('');
  
  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Column Name"
        type="text"
        fullWidth
        value={props.value}
        onChange = {(e) => {
          setFieldName(e.target.value);
          props.onChange(e.target.value);
        }}
      />
    </div>
  )
}
