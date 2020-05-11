import React from 'react';
import {FieldProps} from '../../model/FormModel';
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl';

const RadioButtonField: React.FC<FieldProps> = ({input, label, type, meta: {touched, error, warning}, children }) => {
    return (
        <div>
            <FormControl>
                <RadioGroup {...input}>
                    {children}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default RadioButtonField;
