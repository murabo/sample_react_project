import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from 'react-router-dom'
import { List, ListItem, ListItemText } from "@material-ui/core";

// style
import style from "./setting.module.scss";

// component
import Avatar from "../../Common/Avatar";
import ProfileImageDialog from '../../Common/ImageDialog'

// state
import {RootState} from "../../../reducers";

// img
import ImageCamera from "../../../assets/icon_camera.svg";

const routerSelector = (state: RootState) => state.router;
const meSelector = (state: RootState) => state.me;


const Info: React.FC = () => {
    const me = useSelector(meSelector);
    const [profile, setProfile] = React.useState(false);

    return (
        <div className={style.root}>
            <div className={style.profile}>
                <div className={style.photo} onClick={() => setProfile(true)}>
                    <Avatar src={me.img} name={me.last_name} size="profile" color={me.color_cd}/>
                    <span className={style.camera}><img src={ImageCamera}/></span>
                </div>
                <p className={style.name}>{me.last_name} {me.first_name}</p>
                <p className={style.email}>{me.email}</p>
            </div>
            <List>
                <NavLink to={`/user/me/`} activeClassName={style.active}>
                    <ListItem button>
                        <ListItemText primary="個人設定"/>
                    </ListItem>
                </NavLink>
                <NavLink to={`/user/password/`} activeClassName={style.active}>
                    <ListItem button>
                        <ListItemText primary="パスワード変更"/>
                    </ListItem>
                </NavLink>
                <NavLink to={`/user/group/`} activeClassName={style.active}>
                    <ListItem button>
                        <ListItemText primary="参加グループ"/>
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
}
export default Info;


