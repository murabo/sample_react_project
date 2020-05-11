import React from "react";
import {NavLink} from "react-router-dom";

// component
import {Button, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";

// style
import style from "../menu.module.scss";

// img
import ImageHome from "../../../assets/menu/home.svg";
import ImagePressKit from "../../../assets/menu/press_kit.svg";
import ImagePressRelease from "../../../assets/menu/press_release.svg";

import PressReleaseMenu from "../PressReleaseMenu";
import PressKitMenu from "../PressKitMenu";
import CreateDialog from "../../PressRelease/Common/CreateDialog"
import PressKitCreateDialog from "../../PressKit/Create/CreateDialog"

const useStyles = makeStyles(() => ({
    sub: {
        padding: '10px 0'
    }
}));


const HomeMenu: React.FC = () => {

    const classes = useStyles();


    return (
        <section>
            <List>
                <ListItem button>
                    <NavLink exact to={`/`} className={style.link} activeClassName={style.active}>
                        <ListItemIcon>
                            <img src={ImageHome}/>
                        </ListItemIcon>
                        <ListItemText primary="ホーム"/>
                    </NavLink>
                </ListItem>

                <ListItem button>
                    <NavLink to={`/press_release`} className={style.link} activeClassName={style.active}>
                        <ListItemIcon>
                            <img src={ImagePressRelease}/>
                        </ListItemIcon>
                        <ListItemText primary="プレスリリース"/>
                    </NavLink>
                </ListItem>
                {/*<ListItem className={classes.sub}>*/}
                {/*	<PressReleaseMenu/>*/}
                {/*</ListItem>*/}
                <ListItem button>
                    <NavLink to={`/press_kit`} className={style.link} activeClassName={style.active}>
                        <ListItemIcon>
                            <img src={ImagePressKit}/>
                        </ListItemIcon>
                        <ListItemText primary="プレスキット"/>
                    </NavLink>
                </ListItem>
                {/*<ListItem className={classes.sub}>*/}
                {/*	<PressKitMenu/>*/}
                {/*</ListItem>*/}
            </List>
        </section>
    );
};

export default HomeMenu;
