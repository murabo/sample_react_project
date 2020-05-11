import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { List, ListItem, ListItemText } from "@material-ui/core";

// style
import style from "./setting.module.scss";

// component
import ProfileImageDialog from '../ProfileImageDialog'

// state
import {RootState} from "../../../reducers";

// img
import ImageCamera from "../../../assets/icon_camera.svg";

const routerSelector = (state: RootState) => state.router;
const companySelector = (state: RootState) => state.company;


const Info: React.FC = () => {
    const company = useSelector(companySelector);
    const [logo, setLogo] = React.useState(false);

    return (
        <div className={style.root}>
            <div className={style.profile}>
                <div className={style.photo} onClick={() => setLogo(true)}>
                    <img src={company.logo}/>
                    <span className={style.camera}><img src={ImageCamera}/></span>
                </div>
            </div>
            <List>
                <NavLink to={`/setting/company/`} activeClassName={style.active}>
                    <ListItem button>
                        <ListItemText primary="企業情報"/>
                    </ListItem>
                </NavLink>
                <NavLink to={`/setting/group/`} activeClassName={style.active}>
                    <ListItem button>
                        <ListItemText primary="グループ設定"/>
                    </ListItem>
                </NavLink>
                <NavLink to={`/setting/plan/`} activeClassName={style.active}>
                    <ListItem button>
                        <ListItemText primary="プラン設定"/>
                    </ListItem>
                </NavLink>
                <NavLink to={`/setting/payment/`} activeClassName={style.active}>
                    <ListItem button>
                        <ListItemText primary="お支払い"/>
                    </ListItem>
                </NavLink>
            </List>
            <ProfileImageDialog isOpen={logo} closeHandle={()=>setLogo(false)}/>
        </div>
    );
}
export default Info;


