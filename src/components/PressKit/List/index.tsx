import React, {useEffect, useState} from "react";
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import store from 'store'

import {LS_KEY_LIST_LAYOUT } from '../../../config/localstrage'
import { LAYOUT_TYPE_LIST } from '../../../config/layout_type'

// actions
import * as PressKitActionCreators from "../../../actions/PressKit/ActionCreator";

// component
import { Button, Typography, Dialog, DialogContent, DialogActions, Tabs, Tab} from '@material-ui/core/';
import ListLayout from './ListLayout'
import AppDialog from "../../Common/AppDialog";
import Pagination from '../../Common/Pagination'

// style
import style from "./press_release_list.module.scss";

// state
import {RootState} from "../../../reducers";
import Progress from "../../Common/Progress";
const pressKitSelector = (state: RootState) => state.pressKit;
const pressGroupSelector = (state: RootState) => state.group;
const companySelector = (state: RootState) => state.company;

interface IProps {
    archive?: boolean,
}

const PressKitList: React.FC<IProps> = () => {

    const dispatch = useDispatch();
    const pressKit = useSelector(pressKitSelector);
    const group = useSelector(pressGroupSelector);
    const [eleteDialog, setDeleteDialog] = useState(false);
    const [id, setDeleteId] = useState('');
    const company = useSelector(companySelector);

    useEffect(() => {
        if (group.selectedId) {
            dispatch(PressKitActionCreators.getPressKitList.request({ offset: 1 }));
        }
    }, [group.selectedId]);

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
        dispatch(PressKitActionCreators.deletePressKitDetails.request({id}));
        setDeleteDialog(false)
    };

    // 複製
    const handleClone = (body, name) => {
        dispatch(PressKitActionCreators.postPressKitClone.request({
            body: {...body},
            name: name
        }));
    };

    //ページング
    const handlePageChange = (pageNumber) => {
        dispatch(PressKitActionCreators.getPressKitList.request({ offset: pageNumber }))
    }


    return (
        <section className={style.root}>
            <Typography variant="h1" component="h2" gutterBottom>
               プレスキット
            </Typography>
            <div>
                <div className={style.list}>
                    <ListLayout
                        list={pressKit.list.results}
                        handleDeleteDialogOpen={handleDeleteDialogOpen}
                        handleClone={handleClone}/>
                </div>
            </div>
        {pressKit.list.results.length > 0 &&
            <div className={style.pagination}>
               <Pagination
                    activePage={pressKit.list.offset}
                    totalCount={pressKit.list.count}
                    handlePageChange={handlePageChange}
               />
            </div>
        }
            <AppDialog isOpen={eleteDialog} closeHandle={handleDeleteDialogClose} mainHandle={handleDelete} text='削除しますか' ButtonText="削除"/>
        </section>
    );
}

export default PressKitList;
