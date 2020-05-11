import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import Button from '@material-ui/core/Button';
import TextField from "../Field/TextField";
import HiddenField from "../Field/HiddenField";
import {Values, Errors} from "../../model/FormModel";

import * as MeActionCreators from "../../actions/Me/ActionCreator";

//style
import style from "./form.module.scss";

//component
import ImageDialog from "../Common/ImageDialog";
import { useDispatch, useSelector } from "react-redux";

// state
import {RootState} from "../../reducers";

const meSelector = (state: RootState) => state.me;

const validate = (values: Values) => {
    const errors: Errors = {};
    const requiredFields = [
        'last_name',
        'first_name',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '必須です'
        }
    })
    return errors;
};

const MeEditForm: React.FC<InjectedFormProps> = props => {

    const dispatch = useDispatch();
    const {handleSubmit, submitting, error, pristine} = props
    const [imageDialog, setImageDialog] = React.useState(false);
    const me = useSelector(meSelector);

    const handleUpload = (crop) => {
        dispatch(MeActionCreators.patchProfileImage.request({img:crop}))
    };

    return (
        <div className={style.root}>
            <form onSubmit={handleSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <ul className={style.panelItem}>
                    <li>
                        <label>氏名</label>
                        <ul className={style.form}>
                            <li><Field name="last_name" type="text" component={TextField} label={"ハーベスト"}/></li>
                            <li><Field name="first_name" type="text" component={TextField} label={"太郎"}/></li>
                        </ul>
                    </li>
                </ul>
                <Field name='color_cd' type="hidden" component={HiddenField}/>
                <div className={style.actions}>
                    <Button variant="contained" size="large" type="submit" color="primary" disabled={pristine || submitting} >
                        更新
                    </Button>
                </div>
            </form>
            <ImageDialog isOpen={imageDialog} closeHandle={()=>setImageDialog(false)} handleUpload={handleUpload}/>
        </div>
    );
};

export default reduxForm({
    validate,
    form: 'ME_EDIT',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(MeEditForm);
