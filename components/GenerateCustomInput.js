import React from 'react'
import { TextField } from '@material-ui/core';

export const GenerateInputComponent = (props) => {
    return (
        <TextField
            margin="dense"
            InputProps={{ disableUnderline: true }}
            type="number"
            fullWidth
            {...props}
        />
    )
};

export default GenerateInputComponent;