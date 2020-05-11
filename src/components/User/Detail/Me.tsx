import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from "react-router-dom";

// style
import style from "./detail.module.scss";

import SettingTitle from "../../Common/SettingTitle";

// state
import {RootState} from "../../../reducers";

import Button from "@material-ui/core/Button";
import Avatar from "../../Common/Avatar";

const meSelector = (state: RootState) => state.me;

const MeDetail: React.FC = () => {
    const me = useSelector(meSelector);

    return (
        <div >
            <SettingTitle text="基本情報"/>
            <div className={style.action}>
                <NavLink exact to={`/user/me/edit/`}>
                    <Button variant="outlined" size="large" color="primary">
                        基本情報変更
                    </Button>
                </NavLink>
            </div>
            <ul>
                <li className={style.item}>
                    <label>プロフィール写真</label>
                    <div className={style.text}>
                        <Avatar src={me.img} name={me.last_name} size="profile" color={me.color_cd}/>
                    </div>
                </li>
                <li className={style.item}>
                    <label>氏名</label>
                    <div className={style.text}>
                        <p>{me.last_name}</p>
                        <p>{me.first_name}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>かな</label>
                    <div className={style.text}>
                        <p>{me.last_name_kana}</p>
                        <p>{me.first_name_kana}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>所属</label>
                    <div className={style.text}>
                        <p>{me.department}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>メールアドレス</label>
                    <div className={style.text}>
                        <p>{me.email}</p>
                    </div>
                </li>
                {/*<li className={style.item}>*/}
                {/*    <label>電話番号</label>*/}
                {/*    <div className={style.text}>*/}
                {/*        <p>{me.tel}</p>*/}
                {/*    </div>*/}
                {/*</li>*/}
            </ul>
        </div>
    );
}

export default MeDetail;
