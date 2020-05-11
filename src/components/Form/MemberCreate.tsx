import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import TextField from "../Field/TextField";
import { required } from "../../util/validation";
import { Values, Errors } from "../../model/FormModel";
import style from "./form.module.scss";

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


const MemberCreateForm: React.FC<InjectedFormProps> = props => {

    const { handleSubmit, submitting, pristine, error } = props

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className={style.error}>{error}</p>}
        <div>
            <Field name="email" type="text" component={TextField} label="メールアドレス"/>
            <div className="form-group">
                <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>
                    招待
                </button>
            </div>
        </div>
     </form>
    );
};

export default reduxForm({
    validate,
    form: 'MEMBER_CREATE',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(MemberCreateForm);
