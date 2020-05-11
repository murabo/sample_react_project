import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";

// component
import SettingTitle from "../../Common/SettingTitle";

//model
import { PressReleaseListModel, PressReleaseModel } from "../../../model/PressReleaseModel";

// img
import ImageEllipsis from "../../../assets/icon_ellipsis.svg";

//style
import style from "./list_layout.module.scss";

// state
import { RootState } from "../../../reducers";

const pressGroupSelector = (state: RootState) => state.group;


const ListLayout: React.FC = () => {

    const group = useSelector(pressGroupSelector);

    const handleExit = () => {
        console.log('退出アクション')
    }

    return (
        <>
            <SettingTitle text="参加グループ"/>
            <ul>
                {group.results.map( (item, index) => (
                    <ListLayoutItem
                        item={item}
                        key={index}
                        handleExit={handleExit}/>
                ))}
            </ul>
        </>
    );
}
export default ListLayout;


interface ListLayoutItemProps {
    item: PressReleaseListModel,
    handleExit
}

const ListLayoutItem: React.FC<ListLayoutItemProps> = ({ item, handleExit}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <li className={style.list}>
            <ul className={style.inner}>
                <li className={style.title}>
                    {item.name}
                 </li>
                {/*<li className={style.menu}>*/}
                {/*    <IconButton onClick={handleClick} className={style.iconMenu}>*/}
                {/*        <img src={ImageEllipsis}/>*/}
                {/*    </IconButton>*/}
                {/*</li>*/}
            </ul>
            <Menu
                elevation={1}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={style.popupMenu}
            >
                <MenuItem onClick={()=> {
                    handleExit('1')
                    handleClose();
                }}>
                   グループから退出
                </MenuItem>
            </Menu>
        </li>
    );
}
