import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import style from "./card_layout.module.scss";
import { IconButton, Tooltip } from "@material-ui/core";

//model
import { PressReleaseListModel } from "../../../../model/PressReleaseModel";

// component
import Status from "../../Common/Status";
import DateTime from "../../../Common/DateTime";
import ListMenu from "../ListMenu";
import Avatar from  '../../../Common/Avatar'

//img
import IconMailGray from '../../../../assets/icon_mail_gray.svg'

//state
import { RootState } from "../../../../reducers";
import Preview from "../../../Common/Preview";

//material-ui
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';




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
        <ul className={style.card}>
        {list.map( (item, index) => (
            <ListLayoutItems
                item={item}
                key={index}
                handleDeleteDialogOpen={handleDeleteDialogOpen}
                handleClone={handleClone}
                handleArchive={handleArchive}
                handleOpenMailDialog={handleOpenMailDialog}/>
        ))}
        </ul>
    );
}
export default ListLayout;

interface ListLayoutItemsProps {
    item: PressReleaseListModel,
    handleDeleteDialogOpen,
    handleClone,
    handleArchive,
    handleOpenMailDialog
}

const ListLayoutItems: React.FC<ListLayoutItemsProps> = ({ item, handleDeleteDialogOpen, handleClone, handleArchive, handleOpenMailDialog }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mailOpenDialog, setMailOpenDialog] = React.useState<null | Number>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const group = useSelector(pressGroupSelector);


    return (
        <li className={style.list}>
            <Card className={style.inner}>
                <CardHeader
                    avatar={
                        <Avatar src={item.create_user.img} name={item.create_user.last_name} size="menu" color={item.create_user.color_cd}/>
                    }
                    action={
                    <Tooltip title="メニュー" placement="top" arrow>
                        <IconButton onClick={handleClick} className={style.iconMenu}>
                            <MoreVertIcon/>
                        </IconButton>
                    </Tooltip>
                    }
                    title={
                        <Typography className={style.author}>{item.create_user.last_name} {item.create_user.first_name}</Typography>
                    }
                    subheader={<DateTime datetime={item.history.created_at}/>}
                />
                <div className={style.overlay}>
                    <NavLink exact to={`/press_release/${group.selectedId}/detail/${item.press_id}/`} className={style.open}>
                        開く
                    </NavLink>
                </div>
                <div className={style.bg}>
                    {item.history.body &&
                         <Preview body={item.history.body} isCard={true}/>
                    }
                </div>
                <CardContent className={style.card_footer}>
                    <Tooltip title={item.name} placement="bottom" arrow>
                        <Typography className={style.title}>{item.name}</Typography>
                    </Tooltip>
                    {item.status ?
                        item.status >=  7 &&
                        <Tooltip title="開封確認" placement="bottom" arrow>
                            <IconButton onClick={()=>handleOpenMailDialog(item.press_id)} className={style.iconMail}>
                                <img src={IconMailGray}/>
                            </IconButton>
                        </Tooltip>
                    : null}
                </CardContent>
                <div className={style.status}><Status type="label" review={item.review} status={Number(item.status)}/></div>
            </Card>
            <div className={style.info}>
               {/*<div className={style.deadline}><DeadLine review={item.review} status={item.status} min={true}/></div>*/}
            </div>
            <ListMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                item={item}
                handleDeleteDialogOpen={handleDeleteDialogOpen}
                handleClone={handleClone}
                handleArchive={handleArchive}/>
        </li>
      );
}
