import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Switch, FormControlLabel, Divider, IconButton, Menu, MenuItem, makeStyles, Button } from "@material-ui/core";

//model
import { PressKitListModel } from "../../../../model/PressKitModel";

// component
import DateTime from "../../../Common/DateTime";

// img
import ImageEllipsis from "../../../../assets/icon_ellipsis.svg";

//style
import style from "./list_layout.module.scss";

// state
import { RootState } from "../../../../reducers";
import { company } from "../../../../reducers/Company";
import * as PressKitActionCreators from "../../../../actions/PressKit/ActionCreator";
const pressGroupSelector = (state: RootState) => state.group;
const companySelector = (state: RootState) => state.company;

interface ListLayoutProps {
    list: PressKitListModel[],
    handleDeleteDialogOpen,
    handleClone,
}

const useStyles = makeStyles({
    button: {
        padding: '0',
        borderRadius: 40
    }
});

const ListLayout: React.FC<ListLayoutProps> = ({ list, handleDeleteDialogOpen, handleClone }) => {

    return (
        <ul>
            {list.map( (item, index) => (
                <ListLayoutItem
                    item={item}
                    key={index}
                    handleDeleteDialogOpen={handleDeleteDialogOpen}
                    handleClone={handleClone}/>
            ))}
        </ul>
    );
}
export default ListLayout;

interface ListLayoutItemProps {
    item: PressKitListModel,
    handleDeleteDialogOpen,
    handleClone,
}


const ListLayoutItem: React.FC<ListLayoutItemProps> = ({ item, handleDeleteDialogOpen, handleClone }) => {

    const dispatch = useDispatch();
    const group = useSelector(pressGroupSelector);
    const company = useSelector(companySelector);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isPublic, setIsPublic] = React.useState<null | Boolean>( Boolean(item.is_public));

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = () => {
        setIsPublic(!isPublic)
        dispatch(PressKitActionCreators.patchPressKitDetails.request({id: item.id, is_public: !item.is_public}));
    };

    // アーカイブ
    const handleArchive = () => {
        dispatch(PressKitActionCreators.patchPressKitDetails.request({id: item.id, is_archive: true}));
    };

    return (
        <li className={style.list}>
            <ul className={style.inner}>
                <li className={style.title}>
                    <NavLink exact to={`/press_kit/${group.selectedId}/detail/${item.id}/`}>
                        <p>{item.name}</p>
                    </NavLink>
                 </li>
                {!item.is_archive &&
                    <li>
                        {isPublic && <Button color="primary"
                                             onClick={() => window.open(`//pr.harvest.site/press_kit/${company.prefix}/${item.number}`, '_blank')}>プレビュー</Button>}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={Boolean(isPublic)}
                                    onChange={handleChange}
                                    value={item}
                                    color="primary"
                                />
                            }
                            label="公開"
                        />
                    </li>
                }
                <li className={style.update}>
                    <DateTime datetime={item.created_at} updatetime={true}/>
                </li>
                <li className={style.menu}>
                    <IconButton onClick={handleClick} className={style.iconMenu}>
                        <img src={ImageEllipsis}/>
                    </IconButton>
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
                    handleClone(item.body, `コピー${item.name}`)
                    handleClose();
                }}>
                   コピーを作成
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() =>　{
                    handleArchive();
                    handleClose();
                }}>
                    アーカイブ
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() =>　{
                    handleDeleteDialogOpen(item.id);
                    handleClose();
                }}>
                    削除
                </MenuItem>
            </Menu>
        </li>
    );
}
