import React, { useEffect } from "react";
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

// component
import DateTime from "../../../../Common/DateTime";

// style
import style from "./create_dialog_history.module.scss";

// action
import * as PressReleaseActionCreators from "../../../../../actions/PressRelease/ActionCreator";

// state
import { RootState } from "../../../../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressGroupSelector = (state: RootState) => state.group;

const useStyles = makeStyles({
    title: {
        paddingRight: '6rem',
    },
    datetime: {
        width: '5rem'
    },
    item: {
        paddingRight: '0',
    },
    active: {
        background: "#E3F5EA",
    }
});


export default function History({ type, handleChange }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
    const group = useSelector(pressGroupSelector);


    useEffect(() => {
        if (group.selectedId) {
            dispatch(PressReleaseActionCreators.getPressReleaseTemplateList.request());
        }
    }, [group.selectedId]);

    return (
        <div className={style.root}>
            <div className={style.header}>
                <span className={style.title}>タイトル</span><span className={style.createTime}>作成日</span></div>
            <ul className={style.list}>
                {pressRelease.create.historyList.map( (item, index) => (
                    <ListItem className={classNames(classes.item, classes.active)} button key={index} onClick={() => handleChange(index)}>
                        <ListItemText className={classes.title} primary={' タイトルタイトルタイトルタイトルタイトルタイトルタイトルルタイトルタイトル'}/>
                        <ListItemSecondaryAction className={classes.datetime}>
                            <DateTime datetime={item.history.created_at}/>
                        </ListItemSecondaryAction>
                    </ListItem>

                ))}
            </ul>
        </div>
    );
}

