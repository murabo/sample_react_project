import React from "react";
import { useDispatch, useSelector } from "react-redux";
//style
import style from "./history.module.scss";
//component
import Avatar from "../../../../Common/Avatar";
import DateTime from "../../../../Common/DateTime";
import {  IconButton, Menu, MenuItem } from "@material-ui/core";
//img
import ImageEllipsis from "../../../../../assets/icon_ellipsis.svg";
//action
import * as PressReleaseActionCreators from "../../../../../actions/PressRelease/ActionCreator";
// state
import {RootState} from "../../../../../reducers";
import { PressReleaseHistoryListModel } from "../../../../../model/PressReleaseModel";
import PreviewDialog from "../../../../Common/PreviewDialog";

const pressReleaseSelector = (state: RootState) => state.pressRelease;


const History: React.FC = () => {

    const pressRelease = useSelector(pressReleaseSelector);

    return (
        <>
            <ul className={style.list}>
                {pressRelease.history.list.map( (row, index) => (
                   <HistoryItem  key={index} item={row}/>
                ))}
            </ul>

        </>
    );
}


interface HistoryItemProps {
    item: PressReleaseHistoryListModel
}

const HistoryItem: React.FC<HistoryItemProps> = ({item}) => {

    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [previewDialog, setPreviewDialog] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setPreviewDialog(false)
    };

    const handleOpenPreviewDialog = (id) => {
        setAnchorEl(null);
        setPreviewDialog(true)
        dispatch(PressReleaseActionCreators.getPressReleaseHistoryDetails.request({ press_id: pressRelease.detail.press_id, history_id: id}));
    };

    const handleRevert = () => {
        handleClose()
        dispatch(PressReleaseActionCreators.postPressReleaseRevert.request());
    }

    return (
        <li>
            <div className={style.body}>
                <div className={style.bodyImage}>
                    <Avatar src={item.user.img} name={item.user.last_name} active={true} size="small" color={item.user.color_cd}/>
                </div>
                <div className={style.bodyContent}>
                    <p className={style.info}>
                        {item.user.last_name}{item.user.first_name}
                        <span className={style.datetime}><DateTime datetime={item.created_at}/></span></p>
                    <p>保存しました</p>
                </div>
                <div className={style.actions}>
                    <IconButton onClick={handleClick} className={style.iconMenu}>
                        <img src={ImageEllipsis}/>
                    </IconButton>
                </div>
            </div>
            <Menu
                elevation={1}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={style.popupMenu}
            >
                <MenuItem onClick={()=>handleOpenPreviewDialog(item.id)}>
                    このバージョンを確認
                </MenuItem>
                <PreviewDialog isHistory={true} isOpen={previewDialog} closeHandle={()=>setPreviewDialog(false)} handleAction={handleRevert} handleActionText="このバージョンに戻す"/>
            </Menu>
        </li>
    );
}

export default History;
