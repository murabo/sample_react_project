import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import store from 'store'

import * as GroupActionCreators from "../../../actions/Group/ActionCreator";

// component
import { Select } from '@material-ui/core/';

// state
import {RootState} from "../../../reducers";
import * as MeActionCreators from "../../../actions/Me/ActionCreator";
import * as CompanyActionCreators from "../../../actions/Company/ActionCreator";
const pressGroupSelector = (state: RootState) => state.group;


const useStyles = makeStyles({
    select: {
        width: '100%',
        padding: '10px',
        color: '#2EB964',
        fontWeight: 'bold',
        borderBottom: '1px solid #E2E9E5'
    }
});

// style
// import style from "./group_select.module.scss";

const GroupSelect: React.FC<{}> = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const group = useSelector(pressGroupSelector);

    // group select
    const handleGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(GroupActionCreators.setSelectedId.request(event.target.value as string));
        store.set('groupId', event.target.value)
    };

    useEffect(() => {
        if (!group.results.length) {
            dispatch(GroupActionCreators.getGroupList.request());
        }
    }, []);

    return (
        <Select
            className={classes.select}
            native
            value={group.selectedId}
            onChange={handleGroupChange}
        >
            {group.results.map(value => (
                <option value={value.uuid} key={value.uuid}>{value.name}</option>
            ))}
        </Select>

    );
}


export default GroupSelect
