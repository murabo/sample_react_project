import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";

// style
import style from "./notification.module.scss";

// img
import IconArrow from "../../../assets/go_back.svg";
import ImageEllipsis from "../../../assets/icon_ellipsis.svg";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

interface MenuProps {
    isOpen: boolean,
    toggleHandle
}

const Notification: React.FC<MenuProps> = ({ isOpen, toggleHandle }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
			<SwipeableDrawer
				open={isOpen}
				onClose={toggleHandle(false)}
				onOpen={toggleHandle(true)}
                SwipeAreaProps={{width: 0}}
			>
                <div className={style.header}>
                    <IconButton onClick={toggleHandle(false)} className={style.iconBack}>
                        <img src={IconArrow}/>
                    </IconButton>

                    <p className={style.title}>お知らせ</p>

                    <div className={style.iconMenu}>
                        <IconButton onClick={handleClick}>
                            <img src={ImageEllipsis}/>
                        </IconButton>
                    </div>

                    <Menu
                        elevation={1}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={style.popupMenu}
                    >
                        <MenuItem>
                            未読のみを表示
                        </MenuItem>
                        <Divider/>
                        <MenuItem>
                            全てを既読
                        </MenuItem>
                    </Menu>

                </div>
                <Divider />
                <section className={style.list}>
                    お知らせはありません。
                    {/*<List>*/}
                    {/*    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    {/*        <ListItem button key={text}>*/}
                    {/*            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                    {/*            <ListItemText primary={text} />*/}
                    {/*        </ListItem>*/}
                    {/*    ))}*/}
                    {/*</List>*/}
                </section>
			</SwipeableDrawer>
    );
}
export default Notification;
