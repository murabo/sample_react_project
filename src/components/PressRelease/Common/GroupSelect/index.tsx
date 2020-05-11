import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";

import * as GroupActionCreators from "../../../../actions/Group/ActionCreator";

// component
import { Select } from '@material-ui/core/';

// state
import {RootState} from "../../../../reducers";
const pressGroupSelector = (state: RootState) => state.group;

const useStyles = makeStyles({
    select: {
        background: '#F8FBF9',
        borderRadius: '20px'
    }
});


const GroupSelect: React.FC<{}> = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const group = useSelector(pressGroupSelector);

    // group select
    const handleGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(GroupActionCreators.setSelectedId.request(event.target.value as string));
    };

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
