import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";

//model
import { PressReleaseListModel, PressReleaseModel } from "../../../../model/PressReleaseModel";


//style
import style from "./list_layout.module.scss";

// state
import { RootState } from "../../../../reducers";
const pressGroupSelector = (state: RootState) => state.group;


interface ListLayoutItemProps {
    item: PressReleaseListModel,
    handleClose,
    handleDeleteDialogOpen,
    handleClone,
    handleArchive,
    anchorEl: null | HTMLElement,
}

const ListMenu: React.FC<ListLayoutItemProps> = ({ item, handleClose, handleDeleteDialogOpen, handleClone, handleArchive, anchorEl }) => {

    const isDelete = item.is_archive || item.status === 0

    return (
            <Menu
                elevation={1}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={style.popupMenu}
            >
                <MenuItem onClick={()=> {
                    handleClone(item.history.body, `コピー${item.name}`)
                    handleClose();
                }}>
                   コピーを作成
                </MenuItem>
                <Divider/>
                {!item.is_archive &&
                    <MenuItem onClick={() => {
                        handleArchive(item.press_id);
                        handleClose();
                    }}>
                        {item.is_archive ? '下書きに戻す' : 'アーカイブ'}
                    </MenuItem>
                }
                <Divider/>
                {isDelete &&
                    <MenuItem onClick={() => {
                        handleDeleteDialogOpen(item.press_id);
                        handleClose();
                    }}>
                        削除
                    </MenuItem>
                }
            </Menu>
    );
}

export default ListMenu;
