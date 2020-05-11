import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import Button from '@material-ui/core/Button';
import TextField from "../Field/TextField";
import SelectField from "../Field/SelectField";
import {required} from "../../util/validation";
import {MEDIA_TYPE_LIST} from "../../config/media_type";
import {Values, Errors} from "../../model/FormModel";

import SettingTitle from "../Common/SettingTitle";

import style from "./form.module.scss";

const validate = (values: Values) => {
    const errors: Errors = {};
    const requiredFields = [
        'name',
        'media_type',
        'publisher',
        'last_name',
        'first_name',
        'email',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '必須です'
        }
    })
    return errors;
};

const MemberCreateForm: React.FC<InjectedFormProps> = props => {

    const {handleSubmit, submitting, error, pristine, buttonText} = props

    return (
        <div className={style.root}>
            <SettingTitle text="メディア情報"/>
            <form onSubmit={handleSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <ul className={style.item}>
                    <li>
                        <label>メディア名</label>
                        <div className={style.form}><Field name="name" type="text" component={TextField}/></div>
                    </li>
                    <li>
                        <label>メディア種別</label>
                        <div className={style.form}>
                            <Field name="media_type"
                                   component={SelectField}>
                                <option value="">選択してください</option>
                                {MEDIA_TYPE_LIST.map((val, index) => (
                                    <option value={index} key={index}>{val}</option>
                                ))}
                            </Field>
                        </div>
                    </li>
                    <li>
                        <label>企業名</label>
                        <div className={style.form}><Field name="publisher" type="text" component={TextField} helperText="※ 配信時の宛名となります"/></div>
                    </li>
                    <li>
                        <label>部署</label>
                        <div className={style.form}><Field name="department" type="text" component={TextField} helperText="※配信時の宛名となります"/>
                        </div>
                    </li>
                    <li>
                        <label>役職</label>
                        <div className={style.form}><Field name="position" type="text" component={TextField}　helperText="※配信時の宛名となります"/></div>
                    </li>
                    <li>
                        <label>かな</label>
                        <ul className={style.form}>
                            <li><Field name="last_name_kana" type="text" component={TextField}/></li>
                            <li><Field name="first_name_kana" type="tel" component={TextField}/></li>
                        </ul>
                    </li>
                    <li>
                        <label>氏名</label>
                        <ul className={style.form}>
                            <li><Field name="last_name" type="text" component={TextField} placeholder="姓" helperText="※配信時の宛名となります"/></li>
                            <li><Field name="first_name" type="text" component={TextField} placeholder="名"/></li>
                        </ul>
                    </li>
                    <li>
                        <label>メールアドレス</label>
                        <div className={style.form}><Field name="email" type="text" component={TextField} helperText="※配信先メールアドレスとして使用されます"/></div>
                    </li>
                    <li>
                        <label>電話番号</label>
                        <div className={style.form}>
                            <Field name="tel" type="tel" component={TextField}/>
                        </div>
                    </li>
                    <li>
                        <label>FAX</label>
                        <div className={style.form}><Field name="fax" type="tel" component={TextField}/></div>
                    </li>
                    <li>
                        <label>備考</label>
                        <div className={style.form}><Field name="memo" type="textarea" component={TextField}/></div>
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
    form: 'MEDIA',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(MemberCreateForm);
