import React from "react";
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router'
import Button from '@material-ui/core/Button';

// component
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader} from "@material-ui/core";

// actions
import * as PressKitActionCreators from "../../../actions/PressKit/ActionCreator";

// style
import style from "../menu.module.scss";

import {RootState} from "../../../reducers";
import ImagePressKit from "../../../assets/menu/press_kit.svg";
import ImageArchive from "../../../assets/menu/archive.svg";
import HomeMenu from "../HomeMenu";
import ImagePublic from "../../../assets/menu/public.svg";
import PressKitCreateDialog from "../../PressKit/Create/CreateDialog";

const groupSelector = (state: RootState) => state.group;
const companySelector = (state: RootState) => state.company;

const PressKitMenu: React.FC = () => {

    const dispatch = useDispatch();
    const group = useSelector(groupSelector);
    const company = useSelector(companySelector);

    const handleOpenCreateDialog = () => {
        dispatch(PressKitActionCreators.setPressKitCreateDialog.request(true));
        //dispatch(push(`/press_kit/${group.selectedId}/create/`));
    };

    return (
        <section className={style.sub}>
            <HomeMenu/>
            <div className={style.subMenuContent}>
                <List>
                    <ListItem>
                        <Button variant="outlined" size="large" color="primary" className={style.button}
                                onClick={handleOpenCreateDialog}>
                            新規作成
                        </Button>
                    </ListItem>
                    <ListItem button>
                        <NavLink exact to={`/press_kit/`} className={style.link} activeClassName={style.active}>
                            <ListItemIcon>
                                <img src={ImagePressKit}/>
                            </ListItemIcon>
                            <ListItemText primary="プレスキット"/>
                        </NavLink>
                    </ListItem>
                    <ListItem button>
                        <NavLink exact to={`/press_kit/${group.selectedId}/archive/`} className={style.link}
                                 activeClassName={style.active}>
                            <ListItemIcon>
                                <img src={ImageArchive}/>
                            </ListItemIcon>
                            <ListItemText primary="アーカイブ"/>
                        </NavLink>
                    </ListItem>
                    <ListItem button onClick={()=> window.open(`https://pr.harvest.site/press_kit/${company.prefix}`, "_blank")}>
                        <div className={style.link}>
                            <ListItemIcon>
                                <img src={ImagePublic}/>
                            </ListItemIcon>
                            <ListItemText primary="公開ページ"/>
                        </div>
                    </ListItem>
                </List>
            </div>
            <PressKitCreateDialog/>
        </section>

    );
}

export default PressKitMenu;
