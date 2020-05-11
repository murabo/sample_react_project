import React from "react";
import {Field, reduxForm, InjectedFormProps, FieldArray} from "redux-form";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "../../Field/TextField";
import {required} from "../../../util/validation";
import {Values, Errors} from "../../../model/FormModel";

//style
import style from "../form.module.scss";

// img
import IconPlus from "../../../assets/icon_plus.svg";

import RenderForm from './RenderForm'

const validate = (values: Values) => {
    const errors: Errors = {};
    if (!required(values.name)) {
        errors.name = '必須の項目です';
    }
    return errors;
};

const MemberInviteForm: React.FC<InjectedFormProps> = props => {

    const {submitting, error, buttonText} = props

    return (
        <>
        <form>
            {error && <p className={style.error}>{error}</p>}
            <div>
                <FieldArray name='member' component={RenderForm}/>
            </div>
        </form>
        </>
    );
};


export default reduxForm({
    validate,
    form: 'MEMBER_INVITE',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(MemberInviteForm);



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
