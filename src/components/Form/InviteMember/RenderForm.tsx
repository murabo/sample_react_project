import React from "react";
import { Field } from "redux-form";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "../../Field/TextField";
import { FieldArrayProps } from '../../../model/FormModel';

//component
import Button from '@material-ui/core/Button';

//style
import style from "../form.module.scss";

// img
import IconPlus from "../../../assets/icon_plus.svg";

const RenderForm: React.FC<FieldArrayProps> = ({fields, meta: {error}}) => {

    const classes = useStyles();

    return (<div>
        <ul>
            {fields.map((hobby, index) => (
                <li key={index}>
                    <Field
                        name={hobby}
                        type="text"
                        component={TextField}
                    />
                </li>
            ))}
            {error && <li className={style.error}>{error}</li>}
        </ul>
        <Button variant="outlined" size="large" type="button" onClick={() => fields.push()} className={classes.button}>
            <img src={IconPlus} className={style.iconPlus}/>さらに追加
        </Button>
    </div>)
}

export default RenderForm



const useStyles = makeStyles({
    root: {
        width: "42rem",
        height: "40rem",
        background: '#F3F7F4'
    },
    close: {
        position: "absolute",
        right: "0.5rem",
        top: "0.5rem",
    },
    title: {
        background: "#F3F7F4",
        height: '5rem'
    },
    action: {
        borderTop: "0.1rem solid #E2E9E5",
    },
    radio: {
        padding: "0.5rem",
        textAlign: "center",
    },
    pdf: {
        width: "100%",
        height: "100%",
    },
    button: {
        marginTop: '1rem',
        width: '13rem',
        height: '4rem',
        borderRadius: '3rem'
    },
    textField: {
        fontSize: '1.4rem',
        lineHeight: '1.5',
        borderRadius: '0.5rem'
    }
});
