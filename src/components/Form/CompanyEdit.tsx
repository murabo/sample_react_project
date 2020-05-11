import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import * as CompanyActionCreators from "../../actions/Company/ActionCreator";

// component
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button';
import TextField from "../Field/TextField";
import RadioButtonField from "../Field/RadioButtonField";
import ImageDialog from "../Common/ImageDialog";
import SettingTitle from "../Common/SettingTitle";
import {useDispatch, useSelector} from "react-redux";

// style
import style from "./form.module.scss";

// state
import {RootState} from "../../reducers";
import {IconButton, Typography} from "@material-ui/core";
import {Errors, Values} from "../../model/FormModel";

const companySelector = (state: RootState) => state.company;

const validate = (values: Values) => {
    const errors: Errors = {};
    const requiredFields = [
        'prefix',
        'name',
        'email',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '必須です'
        }
    })
    return errors;
};

const CompanyEditForm: React.FC<InjectedFormProps> = props => {

    const dispatch = useDispatch();
    const company = useSelector(companySelector);
    const [imageDialog, setImageDialog] = React.useState(false);
    const {handleSubmit, submitting, pristine, error} = props

    const handleUpload = (crop) => {
        dispatch(CompanyActionCreators.patchLogo.request({img: crop}))
    };

    return (
        <div className={style.root}>
            <SettingTitle text="企業情報"/>
            <form onSubmit={handleSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <ul className={style.item}>
                    <li>
                        <label>公開用 URL</label>
                        <ul className={style.column}>
                            <li>
                                <Typography display={"block"}
                                            className={style.caption}>https://pr.harvest.site/press_release/</Typography>
                                <Typography display={"block"}
                                            className={style.caption}>https://pr.harvest.site/press_kit/</Typography>
                            </li>
                            <li>
                                <Field name="prefix" type="text" component={TextField}
                                       disabled={company.prefix ? true : false} helperText="※変更不可, 英数字 A-Z,a-z,0-9"/>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <label>公開用webページ</label>
                        <div className={style.form}>
                            <Field name="is_public_page" component={RadioButtonField}>
                                <div>
                                    <FormControlLabel value={"true"} control={<Radio color={"primary"}/>} label="公開する"/>
                                </div>
                                <FormControlLabel value={"false"} control={<Radio color={"primary"}/>} label="公開しない"/>
                            </Field>
                            <div><Button variant={"outlined"} onClick={() => window.open(`https://pr.harvest.site/press_release/mlab`)} color="primary">サンプルページ</Button></div>
                        </div>
                    </li>
                    <li>
                        <label>企業名</label>
                        <div className={style.form}><Field name="name" type="text" component={TextField} label={"株式会社m-Lab"}/></div>
                    </li>
                    <li>
                        <label>郵便番号</label>
                        <div className={style.form}><Field name="postal_code" type="text" component={TextField}/></div>
                    </li>
                    <li>
                        <label>住所</label>
                        <div className={style.form}><Field name="address" type="text" component={TextField}/></div>
                    </li>
                    <li>
                        <label>PR用メールアドレス</label>
                        <div className={style.form}>
                            <Field name="email" type="email" component={TextField} label={"pr@malbs.jp"}/></div>
                    </li>
                    <li>
                        <label>電話番号</label>
                        <div className={style.form}><Field name="tel" type="tel" component={TextField}/></div>
                    </li>
                    <li>
                        <label>FAX</label>
                        <div className={style.form}><Field name="fax" type="tel" component={TextField}/></div>
                    </li>
                    <li>
                        <label>コーポレートサイト</label>
                        <div className={style.form}><Field name="url" type="text" component={TextField}/></div>
                    </li>
                    <li>
                        <label>ロゴ</label>
                        <div className={style.form}>
                            <div className={style.logo} onClick={() => setImageDialog(true)}>
                                {company.img ?
                                    <img src={company.img}/>
                                    :
                                    <div className={style.noImg}></div>
                                }
                                <div className={style.camera}>
                                    <IconButton aria-label="delete">
                                        <CameraAltIcon fontSize={"large"}/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className={style.actions}>
                    <Button variant="contained" size="large" type="submit" color="primary"
                            disabled={pristine || submitting}>
                        更新
                    </Button>
                </div>
            </form>
            <ImageDialog isOpen={imageDialog} closeHandle={() => setImageDialog(false)} handleUpload={handleUpload}/>
        </div>
    );
};

export default reduxForm({
    validate,
    form: 'COMPANY_EDIT',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true
})(CompanyEditForm);
