import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import Button from '@material-ui/core/Button';
import TextField from "../Field/TextField";
import HiddenField from "../Field/HiddenField";
import {Values, Errors} from "../../model/FormModel";

//style
import style from "./form.module.scss";

// state
import {RootState} from "../../reducers";

const validate = (values: Values) => {
    const errors: Errors = {};
    const requiredFields = [
        'email'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '必須です'
        }
    })
    return errors;
};

const Member: React.FC<InjectedFormProps> = props => {

    const {handleSubmit, submitting, error, pristine} = props

    return (
        <div className={style.root}>
            <form onSubmit={handleSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <ul className={style.panelItem}>
                    <li>
                        <label>メールアドレス</label>
                        <div className={style.form}><Field name="email" type="text" component={TextField} label={"info@harvet.site"}/></div>
                    </li>
                </ul>
                <Field name='color_cd' type="hidden" component={HiddenField}/>
                <div className={style.actions}>
                    <Button variant="contained" size="large" type="submit" color="primary" disabled={pristine || submitting} >
                        送信
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    validate,
    form: 'MEMBER',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(Member);
