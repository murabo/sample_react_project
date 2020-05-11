import React from 'react';
import {FieldProps} from '../../model/FormModel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const CheckBoxField: React.FC<FieldProps> = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <div>
            <Checkbox
                color="primary"
                {...input}
                name={input.name}
                checked={input.checked}
                onChange={input.onChange}
                value={input.id}
            />
            {label}
            {touched && (
                <div style={{color: 'red', fontSize: '80%'}}>
                    <p>{(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}</p>
                </div>
            )}
        </div>
    );
};

export default CheckBoxField;
