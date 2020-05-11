import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router'
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';

// component
import { Tooltip, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CreateMenu from "./CreateMenu";
import UserSettingModalMenu from "./UserSettingModalMenu";
import UserMenu from "./UserMenu";
import SettingMenu from "./SettingMenu";
import MediaMenu from "./MediaMenu";
import MemberMenu from "./MemberMenu";
import Notification from "./Notification";
import Avatar from "../Common/Avatar";

// img
import ImageLogoIcon from "../../assets/menu/logo_icon.svg";
import ImageMedia from "../../assets/menu/media.svg";
import ImageMember from "../../assets/menu/members.svg";
import ImageBell from "../../assets/menu/bell.svg";
import ImageBuilding from "../../assets/menu/building.svg";
import ImageHelp from "../../assets/menu/help.svg";

// style
import style from "./menu.module.scss";

// state
import {RootState} from "../../reducers";
import GroupSelect from "./GroupSelect";
import { NavLink } from "react-router-dom";
import PressReleaseMenu from "./PressReleaseMenu";
import PressKitMenu from "./PressKitMenu";

const routerSelector = (state: RootState) => state.router;
const groupSelector = (state: RootState) => state.group;
const meSelector = (state: RootState) => state.me;

const Menu: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useSelector(routerSelector);
    const group = useSelector(groupSelector);
    const me = useSelector(meSelector);
    const [settingMenu, setSettingMenu] = React.useState<null | HTMLElement>(null);
    const [notification, setNotification] = React.useState<boolean>(false);

    const toggleNotificationDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        setNotification(open)
    };

    const handleSettingMenuOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSettingMenu(event.currentTarget);
    };
    const handleSettingMenuClose = () => {
        setSettingMenu(null);
    };

    const path = router.location.pathname

    const  root = path.split('/');
    const top = ['','create', 'press_release', 'press_kit'];
    const topClass = top.indexOf(root[1]) >= 0 ? style.active: style.mainLink;

    return (
        <section className={style.root}>
            <div className={style.main}>
                <div className={style.top}>
                    <List className={classes.root} component="nav">
                        <NavLink to={`/`} className={topClass}>
                            <Tooltip title="ホーム" arrow>
                                <ListItem button className={classes.list}>
                                    <img src={ImageLogoIcon}/>
                                </ListItem>
                            </Tooltip>
                        </NavLink>
                        {/*<NavLink to={`/create/`} activeClassName={style.active} className={style.mainLink}>*/}
                        {/*    <ListItem button className={classes.list}>*/}
                        {/*        <img src={ImagePlus}/>*/}
                        {/*    </ListItem>*/}
                        {/*</NavLink>*/}
                        <NavLink exact to={`/media/`} activeClassName={style.active} className={style.mainLink}>
                            <Tooltip title="メディア" arrow>
                                <ListItem button className={classes.list}>
                                    <img src={ImageMedia}/>
                                </ListItem>
                            </Tooltip>
                        </NavLink>
                        <NavLink exact to={`/member/`} activeClassName={style.active} className={style.mainLink}>
                            <Tooltip title="メンバー" arrow>
                                <ListItem button className={classes.list}>
                                    <img src={ImageMember}/>
                                </ListItem>
                            </Tooltip>
                        </NavLink>
                    </List>
                </div>
                <div className={style.bottom}>
                    <List className={classes.root} component="nav">
                        <NavLink target="_blank" to={`/help/press_release/`} activeClassName={style.active} className={style.mainLink}>
                            <Tooltip title="ヘルプ" arrow>
                                <ListItem button className={classes.list}>
                                    <img src={ImageHelp}/>
                                </ListItem>
                            </Tooltip>
                        </NavLink>
                        <Tooltip title="お知らせ" arrow>
                            <ListItem button className={classes.list} onClick={toggleNotificationDrawer(true)}>
                                <img src={ImageBell}/>
                            </ListItem>
                        </Tooltip>
                        <NavLink to={`/setting/`} activeClassName={style.active} className={style.mainLink}>
                            <Tooltip title="会社情報" arrow>
                                <ListItem button className={classes.list}>
                                    <img src={ImageBuilding}/>
                                </ListItem>
                            </Tooltip>
                        </NavLink>
                        <Tooltip title="設定" arrow>
                            <div className={!path.indexOf('/user/') ? style.active: ''}>
                                <ListItem button onClick={handleSettingMenuOpen}>
                                    <Avatar src={me.img} name={me.last_name} size="menu" color={me.color_cd}/>
                                </ListItem>
                            </div>
                        </Tooltip>
                    </List>
                </div>
                <Notification isOpen={notification} toggleHandle={toggleNotificationDrawer}/>
                <UserSettingModalMenu isOpen={settingMenu} closeHandle={handleSettingMenuClose}/>
            </div>
            <div className={style.group}>
                <GroupSelect/>
                {renderSubMenu(router.location)}
            </div>
        </section>
    );
}

export default Menu;


const renderSubMenu = (location) => {

    let html:any = ''

    const { pathname } = location
    const  root = pathname.split('/');
    switch (root[1]) {
        case 'press_kit':
            html = <PressKitMenu/>
            break;
        case 'press_release':
            html = <PressReleaseMenu/>
            break;
        case 'setting':
            html = <SettingMenu/>
            break;
        case 'user':
            html = <UserMenu/>
            break;
        case 'media':
            html = <MediaMenu/>
            break;
        case 'member':
            html = <MemberMenu/>
            break;
        case 'create':
        default:
            html = <CreateMenu/>
            break;
    }
    return html
}


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: 0,
        },
        list: {
            width: 58,
            height: 58,
            display: "flex",
            justifyContent: "center"
        }
    }),
);

