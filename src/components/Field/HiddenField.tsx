import React from 'react';
import {FieldProps} from '../../model/FormModel';

// component
import TextField from '@material-ui/core/TextField';

const HiddenField: React.FC<FieldProps> = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <TextField
            {...input}
            type={type}
        />
    );
};

export default HiddenField;
