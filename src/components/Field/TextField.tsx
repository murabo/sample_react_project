import React from 'react';
import {FieldProps} from '../../model/FormModel';

// component
import {Typography, TextField } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

//style
import style from "./field.module.scss";


const Text: React.FC<FieldProps> = ({input, label, type, helperText, disabled, meta: {touched, error, warning}}) => {
    const classes = useStyles();
    const getEditorStyle = touched && !input.value ? {borderColor: 'red'} : {};

    return (
        <div className={style.root}>
            {type === 'textarea' ?
                <TextField {...input}
                           disabled={disabled}
                           multiline
                           variant="outlined"
                           placeholder={label}
                           type={type}
                           style={getEditorStyle}
                           InputProps={{
                               classes: {
                                   input: classes.textareaField,
                               },
                           }}
                           helperText={helperText}
                />
                :
                <TextField
                    {...input}
                    disabled={disabled}
                    variant="outlined"
                    placeholder={label}
                    type={type}
                    fullWidth
                    InputProps={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    style={getEditorStyle}
                    helperText={helperText}
                />
            }
            {touched && (
                <div>
                    {error && <Typography color={"error"} variant={"body1"} className={classes.error}>{error}</Typography>}
                </div>
            )}
        </div>
    );
};

Text.defaultProps = {
    type: 'text',
};

const useStyles = makeStyles({
    textField: {
        fontSize: '14px',
        lineHeight: '1.5',
        borderRadius: '0.5rem'
    },
    textareaField: {
        fontSize: '14px',
        lineHeight: '1.5',
        minHeight: '3rem',
    },
    error: {
        marginTop: 5,
        fontSize: 12
    },
});


export default Text;
