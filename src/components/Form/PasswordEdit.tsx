import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import Button from '@material-ui/core/Button';
import TextField from "../Field/TextField";
import {required} from "../../util/validation";
import {Values, Errors} from "../../model/FormModel";

//style
import style from "./form.module.scss";
import SettingTitle from "../Common/SettingTitle";
import PasswordText from "../Common/PasswordText";

const validate = (values: Values) => {
    const errors: Errors = {};
    const requiredFields = [
        'password',
        'password2'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '必須です'
        }
        if (values["password"]  !== values["password2"] ) {
            errors["password2"] = 'パスワードが一致しません'
        }
    })
    return errors;
};


const PasswordEditForm: React.FC<InjectedFormProps> = props => {

    const {handleSubmit, submitting, pristine, error} = props

    return (
        <div className={style.root}>
            <SettingTitle text="パスワード"/>
            <form onSubmit={handleSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <ul className={style.item}>
                    <li>
                        <label>パスワード</label>
                        <div className={style.form}><Field name="password" type="password" component={TextField}/></div>
                    </li>
                    <li>
                        <label>パスワード確認</label>
                        <div className={style.form}><Field name="password2" type="password" component={TextField}/></div>
                    </li>
                </ul>
                <div className={style.actions}>
                    <Button variant="contained" size="large" type="submit" color="primary"  disabled={pristine || submitting}>
                        更新
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    validate,
    form: 'PASSWORD_EDIT',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(PasswordEditForm);
