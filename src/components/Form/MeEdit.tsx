import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import Button from '@material-ui/core/Button';
import TextField from "../Field/TextField";
import HiddenField from "../Field/HiddenField";
import {required} from "../../util/validation";
import {Values, Errors} from "../../model/FormModel";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { IconButton } from '@material-ui/core';

import * as MeActionCreators from "../../actions/Me/ActionCreator";

//style
import style from "./form.module.scss";

//component
import SettingTitle from "../Common/SettingTitle";
import Avatar from "../Common/Avatar";
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
        'email'
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
            <SettingTitle text="基本情報"/>
            <form onSubmit={handleSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <ul className={style.item}>
                    <li>
                        <label>プロフィール写真</label>
                        <div className={style.form}>
                            <div className={style.img} onClick={() => setImageDialog(true)}>
                                {me.img ?
                                    <Avatar src={me.img} name={me.last_name} size="profile" color={me.color_cd}/>
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
                    <li>
                        <label>氏名</label>
                        <ul className={style.form}>
                            <li><Field name="last_name" type="text" component={TextField} label={"ハーベスト"}/></li>
                            <li><Field name="first_name" type="text" component={TextField} label={"太郎"}/></li>
                        </ul>
                    </li>
                    <li>
                        <label>かな</label>
                        <ul className={style.form}>
                            <li><Field name="last_name_kana" type="text" component={TextField} label={"はーべすと"}/></li>
                            <li><Field name="first_name_kana" type="tel" component={TextField} label={"たろう"}/></li>
                        </ul>
                    </li>
                    <li>
                        <label>部署</label>
                        <div className={style.form}>
                            <Field name="department" type="tel" component={TextField} label={"広報部"}/>
                        </div>
                    </li>
                    <li>
                        <label>メールアドレス</label>
                        <div className={style.form}><Field name="email" type="text" component={TextField} label={"info@harvet.site"}/></div>
                    </li>
                    {/*<li>*/}
                    {/*    <label>電話番号</label>*/}
                    {/*    <div className={style.form}><Field name="tel" type="tel" component={TextField} label={"0343608752"}/></div>*/}
                    {/*</li>*/}
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
