import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

// actions
import * as ActionCreators from "../../actions/Media/ActionCreator";
import { MediaModel } from "../../model/MediaModel";

// component
import { push } from 'connected-react-router'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "../Common/Avatar";
import Pagination from "../Common/Pagination";
import AppDialog from "../Common/AppDialog";
import {MEDIA_TYPE_LIST} from "../../config/media_type";

// state
import {RootState} from "../../reducers";
import ImageEllipsis from "../../assets/icon_ellipsis.svg";
import { Divider, Menu, MenuItem } from "@material-ui/core";
import style from "../PressRelease/List/press_release_list.module.scss";
const mediaSelector = (state: RootState) => state.media;
const groupSelector = (state: RootState) => state.group;

const MediaList: React.FC = () => {

    const dispatch = useDispatch();
    const media = useSelector(mediaSelector);
    const group = useSelector(groupSelector);

    useEffect(() => {
        if (group.selectedId) dispatch(ActionCreators.getMediaList.request({offset: 0}));
    }, [group.selectedId]);

    const handlePageChange = (pageNumber) => {
        dispatch(ActionCreators.getMediaList.request({offset: pageNumber}))
    }

    return (
        <>
            <TableList list={media.list.results}/>
            {media.list.results.length > 0 &&
                <div className={style.pagination}>
                    <Pagination
                        activePage={media.list.offset}
                        totalCount={media.list.count}
                        handlePageChange={handlePageChange}
                    />
                </div>
            }
        </>
    );
}

export default MediaList;


const TableList = ({list}) => {

    return (
        <section >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: "5%"}}></TableCell>
                        <TableCell style={{width: "25%"}}>メディア名</TableCell>
                        <TableCell style={{width: "30%"}}>氏名</TableCell>
                        <TableCell style={{width: "5%"}}>メディア種別</TableCell>
                        <TableCell style={{width: "30%"}}>備考</TableCell>
                        <TableCell style={{width: "5%"}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row, index) => (
                        <List key={index} row={row}/>
                    ))}
                </TableBody>
            </Table>

        </section>
    );
}

interface ListProps {
    row: MediaModel,
}

const List: React.FC<ListProps> = ({ row }) => {

    const dispatch = useDispatch();
    const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(ActionCreators.deleteMedia.request({id: row.id}));
        setDeleteDialog(false)
    };

    const handleEdit = () => {
        dispatch(push(`/media/${row.id}/edit/`));
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <Avatar src="" name={row.name} size="medium"/>
                </TableCell>

                <TableCell>
                    {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    <p>{row.last_name_kana} {row.first_name_kana}</p>
                    <p>{row.last_name} {row.first_name}</p>
                </TableCell>
                <TableCell>
                    { MEDIA_TYPE_LIST[row.media_type || 0]}
                </TableCell>
                <TableCell>
                    {row.memo}
                </TableCell>
                <TableCell>
                    <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)}>
                        <img src={ImageEllipsis}/>
                    </IconButton>
                    <Menu
                        elevation={1}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            setDeleteDialog(true)
                            handleClose();
                        }}>
                            削除
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={() => {
                            handleEdit()
                            handleClose();
                        }}>
                            編集
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
            <AppDialog isOpen={deleteDialog}
                       closeHandle={()=>setDeleteDialog(false)}
                       mainHandle={handleDelete} text='削除しますか' ButtonText="削除"/>

        </>
    );
};
