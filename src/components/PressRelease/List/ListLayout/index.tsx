import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from 'connected-react-router'
import {
    Tooltip,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    ListItemSecondaryAction,
    IconButton,
    makeStyles,
    Fab,
    Box
} from "@material-ui/core";

//model
import { PressReleaseListModel} from "../../../../model/PressReleaseModel";

// component
import Status from "../../Common/Status";
import DateTime from "../../../Common/DateTime";
import DeadLine from "../../Common/DeadLine";
import ListMenu from "../ListMenu";

// img
import IconMail from '../../../../assets/icon_mail.svg'
import ImageEllipsis from "../../../../assets/icon_ellipsis.svg";

//style
import style from "./list_layout.module.scss";

// state
import { RootState } from "../../../../reducers";
const pressGroupSelector = (state: RootState) => state.group;

interface ListLayoutProps {
    list: PressReleaseListModel[],
    handleDeleteDialogOpen,
    handleClone,
    handleArchive,
    handleOpenMailDialog
}

const ListLayout: React.FC<ListLayoutProps> = ({ list, handleDeleteDialogOpen, handleClone, handleArchive, handleOpenMailDialog }) => {

    return (
        <List component="div">
            {list.map( (item, index) => (
                <ListLayoutItem
                    item={item}
                    key={index}
                    handleDeleteDialogOpen={handleDeleteDialogOpen}
                    handleClone={handleClone}
                    handleArchive={handleArchive}
                    handleOpenMailDialog={handleOpenMailDialog}/>
            ))}
        </List>
    );
}
export default ListLayout;


interface ListLayoutItemProps {
    item: PressReleaseListModel,
    handleDeleteDialogOpen,
    handleClone,
    handleArchive,
    handleOpenMailDialog
}

const ListLayoutItem: React.FC<ListLayoutItemProps> = ({ item, handleDeleteDialogOpen, handleClone, handleArchive, handleOpenMailDialog }) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const group = useSelector(pressGroupSelector);

    return (
        <>
        <ListItem button className={classes.text}>
                <ListItemText
                    className={classes.name}
                    onClick={()=>dispatch(push(`/press_release/${group.selectedId}/detail/${item.press_id}/`))}
                    primary={
                        <React.Fragment>
                            <Box className={classes.primary}>
                                <Status type="label" review={item.review} status={Number(item.status)}/>
                                {/*{item.status ? <DeadLine review={item.review} status={item.status} min={true}/>}*/}
                            </Box>
                        </React.Fragment>
                    }
                    secondary={
                        <Typography variant={'body2'} className={classes.name}>{item.name}</Typography>
                    }
                />
                <ListItemSecondaryAction>
                    {item.status ?
                        item.status >=  7 &&
                        <Tooltip title="開封確認" placement="top" arrow>
                            <IconButton onClick={()=>handleOpenMailDialog(item.press_id)} className={style.iconMail}>
                                <img src={IconMail}/>
                            </IconButton>
                        </Tooltip>
                        : null}
                        <Tooltip title="メニュー" placement="top" arrow>
                            <IconButton edge="end" aria-label="delete" onClick={handleClick}>
                                <img src={ImageEllipsis}/>
                            </IconButton>
                        </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                item={item}
                handleDeleteDialogOpen={handleDeleteDialogOpen}
                handleClone={handleClone}
                handleArchive={handleArchive}/>
        </>
    );
}


const useStyles = makeStyles({
    text: {
        paddingRight: 80
    },
    item: {
        width: '100%',
        padding: '0 8px'
    },
    primary: {
        display: 'flex'
    },
    name: {
        marginTop: 8
    }
});
