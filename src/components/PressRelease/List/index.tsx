import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import store from 'store'

import {LS_KEY_LIST_LAYOUT } from '../../../config/localstrage'
import { LAYOUT_TYPE_CARD } from '../../../config/layout_type'

// actions
import * as PressReleaseActionCreators from "../../../actions/PressRelease/ActionCreator";

// component
import { Typography } from '@material-ui/core/';
import GroupSelect from '../Common/GroupSelect'
import SwitchLayoutRadios from './SwitchLayoutRadios'
import ListLayout from './ListLayout'
import CardLayout from './CardLayout'
import AppDialog from "../../Common/AppDialog";
import Pagination from "../../Common/Pagination";
import StatusTab from "./StatusTab";

// style
import style from "./press_release_list.module.scss";

// state
import {RootState} from "../../../reducers";
import { ListModel } from "../../../model/ListModel";
import MaileOpenDialog from "../Common/MaileOpenDialog";
import Button from "@material-ui/core/Button";
import AppLayout from "../../Layout/App";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressGroupSelector = (state: RootState) => state.group;
const companySelector = (state: RootState) => state.company;
const routerSelector = (state: RootState) => state.router;

interface IProps {
    isArchive: boolean,
    isPublic: boolean,
    list: ListModel,
}

const PressReleaseList: React.FC<IProps> = ({list, isArchive, isPublic}) => {

    const dispatch = useDispatch();
    const [switchLayout, setSwitchLayout] = React.useState(LAYOUT_TYPE_CARD);

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [mailOpenDialog, setMailOpenDialog] = useState(null);

    const [deleteId, setDeleteId] = useState('');
    const [status, setStatus] = useState(0);
    const company = useSelector(companySelector);
    const router = useSelector(routerSelector);

    useEffect(() => {
        if (store.get(LS_KEY_LIST_LAYOUT) ) setSwitchLayout(store.get(LS_KEY_LIST_LAYOUT));
    }, []);

    // switch card or list
    const handleLayoutSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSwitchLayout(value);
        store.set(LS_KEY_LIST_LAYOUT, value)
    };

    // 削除
    const handleDeleteDialogOpen = (id) => {
        setDeleteDialog(true)
        setDeleteId(id)
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialog(false)
        setDeleteId('')
    };

    const handleDelete = () => {
        dispatch(PressReleaseActionCreators.deletePressReleaseDetails.request({press_id: deleteId}));
        setDeleteDialog(false)
    };

    // 複製
    const handleClone = (body, name) => {
        dispatch(PressReleaseActionCreators.postPressReleaseClone.request({
            body: {...body},
            name: name
        }));
    };

    // アーカイブ
    const handleArchive = (id) => {
        dispatch(PressReleaseActionCreators.patchPressReleaseArchive.request({press_id: id, archive: !isArchive}));
    };

    // ページング
    const handlePageChange = (pageNumber) => {
        const is_archive = !!(router.location.pathname.indexOf('archive') > -1 ? 1: 0)
        const is_public = !!(router.location.pathname.indexOf('public') > -1 ? 1: 0)
        if (is_archive) {
            dispatch(PressReleaseActionCreators.getPressReleaseListArchive.request({ offset: pageNumber }))
        } else if (is_public) {
            dispatch(PressReleaseActionCreators.getPressReleaseListPublic.request({ offset: pageNumber }))
        } else {
            dispatch(PressReleaseActionCreators.getPressReleaseList.request({ offset: pageNumber }));
        }
    }

    // ページング
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setStatus(newValue)
        dispatch(PressReleaseActionCreators.getPressReleaseList.request({offset: 0}));
    }

    return (
        <section className={style.root}>
            <Typography variant="h2" gutterBottom>
               プレスリリース
            </Typography>
            {/*<GroupSelect/>*/}
            <div>
                <ul className={style.filter}>
                    <li className={style.switchLayout}>
                        <SwitchLayoutRadios type={switchLayout} handleChange={handleLayoutSwitch}/>
                    </li>
                </ul>

                {/*{!archive && <StatusTab value={status} handleChange={handleTabChange}/>}*/}

                <div className={style.list}>
                    {switchLayout === 'card' ?
                        <CardLayout
                            list={list.results}
                            handleDeleteDialogOpen={handleDeleteDialogOpen}
                            handleClone={handleClone}
                            handleArchive={handleArchive}
                            handleOpenMailDialog={setMailOpenDialog}
                        />
                        :
                        <ListLayout
                            list={list.results}
                            handleDeleteDialogOpen={handleDeleteDialogOpen}
                            handleClone={handleClone}
                            handleArchive={handleArchive}
                            handleOpenMailDialog={setMailOpenDialog}
                        />
                    }
                </div>
            </div>
            {list.results.length > 0 &&
                <div className={style.pagination}>
                    <Pagination
                        activePage={list.offset}
                        totalCount={list.count}
                        handlePageChange={handlePageChange}
                        displayCount={list.displayCount}
                    />
                </div>
            }
            <MaileOpenDialog isOpen={Boolean(mailOpenDialog)} id={mailOpenDialog} handleClose={()=>setMailOpenDialog(null)}/>
            <AppDialog isOpen={deleteDialog} closeHandle={handleDeleteDialogClose} mainHandle={handleDelete} text='削除しますか' ButtonText="削除"/>
        </section>
    );
}

export default PressReleaseList;
