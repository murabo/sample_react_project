import React from 'react';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/styles';
import { FieldProps } from '../../model/FormModel';

//style
import style from "./field.module.scss";
import { Typography } from "@material-ui/core";

const SelectField: React.FC<FieldProps> = ({ input, label, type, meta: { touched, error, warning }, children }) => {
    const getEditorStyle = touched && !input.value ? { borderColor: 'red' } : {};
    const classes = useStyles();

    return (
        <div>
            {label && <label>{label}</label>}
            <Select
                {...input}
                className={style.select}
                native
                variant="outlined"
                style={getEditorStyle}
                inputProps={{
                    name: 'その他',
                    id: '0'
                }}
            >
                {children}
            </Select>
            {touched && (
                <div>
                    {error && <Typography color={"error"} variant={"body1"} className={classes.error}>{error}</Typography>}
                </div>
            )}
        </div>
    );
};

export default SelectField;


const useStyles = makeStyles({
    textField: {
        fontSize: '14px',
        lineHeight: '1.5',
        background: '#F4F4F4',
        borderRadius: '0.5rem'
    },
    textareaFieldWhite: {
        fontSize: '14px',
        lineHeight: '1.5',
        background: '#fff',
        borderRadius: '0.5rem'
    },
    textareaRoot: {
        background: '#F4F4F4',
    },
    textareaField: {
        fontSize: '14px',
        lineHeight: '1.5',
        minHeight: '10rem',
    },
    error: {
        marginTop: 5,
        fontSize: 12
    },
});
