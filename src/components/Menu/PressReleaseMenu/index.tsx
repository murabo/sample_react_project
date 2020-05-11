import React from "react";
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';

// component
import {Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader} from "@material-ui/core";

// img
import ImagePublic from "../../../assets/menu/public.svg";
import ImageDone from "../../../assets/menu/done.svg";
import ImageEdit from "../../../assets/menu/edit.svg";
import ImageArchive from "../../../assets/menu/archive.svg";

// actions
import * as PressReleaseActionCreators from "../../../actions/PressRelease/ActionCreator";

// style
import style from "../menu.module.scss";

import {RootState} from "../../../reducers";
import ImagePressRelease from "../../../assets/menu/press_release.svg";
import ImagePressKit from "../../../assets/menu/press_kit.svg";
import HomeMenu from "../HomeMenu";
import CreateDialog from "../../PressRelease/Common/CreateDialog";

const groupSelector = (state: RootState) => state.group;
const companySelector = (state: RootState) => state.company;

const PressReleaseMenu: React.FC = () => {

    const dispatch = useDispatch();
    const group = useSelector(groupSelector);
    const company = useSelector(companySelector);

    const handleOpenCreateDialog = () => {
        dispatch(PressReleaseActionCreators.setPressReleaseCreateDialog.request(true));
    }

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
                    <ListItem>
                        <NavLink exact to={`/press_release/`} className={style.link} activeClassName={style.active}>
                            <ListItemIcon>
                                <img src={ImageEdit}/>
                            </ListItemIcon>
                            <ListItemText primary="作成中"/>
                        </NavLink>
                    </ListItem>
                    {/*<ListItem button>*/}
                    {/*	<NavLink exact to={`/press_release/${group.selectedId}/reserve/`} className={style.link} activeClassName={style.active}>*/}
                    {/*		<ListItemIcon>*/}
                    {/*			<img src={ImagePublic}/>*/}
                    {/*		</ListItemIcon>*/}
                    {/*		<ListItemText primary="公開待ち"/>*/}
                    {/*	</NavLink>*/}
                    {/*</ListItem>*/}
                    <ListItem button>
                        <NavLink exact to={`/press_release/${group.selectedId}/public/`} className={style.link}
                                 activeClassName={style.active}>
                            <ListItemIcon>
                                <img src={ImageDone}/>
                            </ListItemIcon>
                            <ListItemText primary="配信済み"/>
                        </NavLink>
                    </ListItem>
                    <ListItem button>
                        <NavLink exact to={`/press_release/${group.selectedId}/archive/`} className={style.link}
                                 activeClassName={style.active}>
                            <ListItemIcon>
                                <img src={ImageArchive}/>
                            </ListItemIcon>
                            <ListItemText primary="アーカイブ"/>
                        </NavLink>
                    </ListItem>
                    {company.is_public_page ?
                        <ListItem button
                                  onClick={() => window.open(`https://pr.harvest.site/press_release/${company.prefix}`, "_blank")}>
                            <div className={style.link}>
                                <ListItemIcon>
                                    <img src={ImagePublic}/>
                                </ListItemIcon>
                                <ListItemText primary="公開ページ"/>
                            </div>
                        </ListItem>:
                        null
                    }
                </List>
            </div>
            <CreateDialog/>
        </section>
    );
}

export default PressReleaseMenu;
