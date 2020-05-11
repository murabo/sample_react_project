import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import * as CompanyActionCreators from "../../actions/Company/ActionCreator";

// component
import Button from '@material-ui/core/Button';
import TextField from "../Field/TextField";
import ImageDialog from "../Common/ImageDialog";
import { useDispatch, useSelector } from "react-redux";

// style
import style from "./form.module.scss";

// state
import {RootState} from "../../reducers";
import { IconButton, Typography } from "@material-ui/core";
import { Errors, Values } from "../../model/FormModel";
const companySelector = (state: RootState) => state.company;

const validate = (values: Values) => {
    const errors: Errors = {};
    const requiredFields = [
        'prefix',
        'name',
        'email'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '必須です'
        }
    })
    return errors;
};

const CompanyInitForm: React.FC<InjectedFormProps> = props => {

    const dispatch = useDispatch();
    const company = useSelector(companySelector);
    const [imageDialog, setImageDialog] = React.useState(false);
    const { handleSubmit, submitting, pristine, error } = props

    const handleUpload = (crop) => {
        dispatch(CompanyActionCreators.patchLogo.request({img:crop}))
    };

    return (
        <div className={style.root}>
            <form onSubmit={handleSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <ul className={style.panelItem}>
                    <li>
                        <label>公開用 URL</label>
                        <ul className={style.column}>
                            <li>
                                <Typography display={"block"} className={style.caption}>https://pr.harvest.site/press_release/</Typography>
                                <Typography display={"block"} className={style.caption}>https://pr.harvest.site/press_kit/</Typography>
                            </li>
                            <li>
                                <Field name="prefix" type="text" component={TextField} disabled={company.prefix? true: false} helperText="※変更不可　半角英数" label={"mlab"}/>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <label>企業名</label>
                        <div className={style.form}><Field name="name" type="text" component={TextField} label={"株式会社m-Lab"}/></div>
                    </li>
                    <li>
                        <label>PR用メールアドレス</label>
                        <div className={style.form}><Field name="email" type="email" component={TextField} label={"pr@malbs.jp"}/></div>
                    </li>
                </ul>
                <div className={style.actions}>
                    <Button variant="contained" size="large" type="submit" color="primary" disabled={pristine || submitting}>
                        更新
                    </Button>
                </div>
            </form>
            <ImageDialog isOpen={imageDialog} closeHandle={()=>setImageDialog(false)}  handleUpload={handleUpload}/>
        </div>
    );
};

export default reduxForm({
    validate,
    form: 'COMPANY_INIT',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(CompanyInitForm);
