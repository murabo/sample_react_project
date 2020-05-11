import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";

// component
import SettingTitle from "../../Common/SettingTitle";

//model
import { PressReleaseListModel, PressReleaseModel } from "../../../model/PressReleaseModel";


//style
import style from "./payment.module.scss";

// state
import { RootState } from "../../../reducers";
import Button from "@material-ui/core/Button";

const pressGroupSelector = (state: RootState) => state.group;


const ListLayout: React.FC = () => {

    const group = useSelector(pressGroupSelector);

    const handleExit = () => {
        console.log('退出アクション')
    }

    return (
        <>
            <SettingTitle text="お支払い"/>
            <ul className={style.header}>
                <li>
                    概要
                </li>
                <li>
                   支払日
                </li>
                <li>
                    金額
                </li>
                <li>
                    支払い状況
                </li>
            </ul>
            <ul>
                {/*{group.list.map( (item, index) => (*/}
                {/*    <ListLayoutItem*/}
                {/*        item={item}*/}
                {/*        key={index}*/}
                {/*        handleExit={handleExit}/>*/}
                {/*))}*/}
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
                    プラン名xxx
                 </li>
                <li className={style.title}>
                    2019/8/19
                </li>
                <li className={style.title}>
                    ￥144,000
                </li>
                <li className={style.title}>
                    ご入金待ち
                </li>
                <li className={style.menu}>
                    <Button variant="outlined" size="small" color="primary">
                        領収書
                    </Button>
                </li>
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
