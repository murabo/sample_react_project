import React, { useState } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select/src/types";

import style from "./review_dialog.module.scss";

// component
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

//img
import IconClose from '../../../../assets/icon_close_gray.svg'

import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";
import * as PressReleaseReserveActionCreators from "../../../../actions/PressReleaseReserve/ActionCreator";

//state
import { RootState } from "../../../../reducers";
import TextField from "@material-ui/core/TextField";
import { push } from "connected-react-router";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const groupSelector = (state: RootState) => state.group;

interface PreviewDialogProps {
    isOpen: boolean,
    closeHandle,
    isReserve?: boolean;
}

const useStyles = makeStyles({
    content: {
        width: 540,
        paddingTop: 20,
        backgroundColor: '#F3F7F4',
    },
    close: {
        position: 'absolute',
        right: '1rem',
        top: '0',
    },
    dialogTitle: {
        padding: '1rem',
        borderBottom: '0.1rem solid #E2E9E5',
        backgroundColor: '#F3F7F4',
    },
    action: {
        borderTop: '0.1rem solid #E2E9E5',
    },
    radio: {
        padding: '1rem'
    },
    buttonPreview: {
        marginRight: 'auto'
    },
    textareaField: {
        padding: 0
    },
    input: {
        padding: 10,
        fontSize: 14,
        lineHeight: 1.5,
        minHeight: 200,
    },
    margin: {
        marginRight: '1rem'
    }
});


interface OptionType {
    label: string;
    value: string;
}

const ReviewResultDialog: React.FC<PreviewDialogProps> = ({ isOpen, closeHandle, isReserve }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
    const group = useSelector(groupSelector);
    const [comment, setComment] = React.useState<ValueType<OptionType>>('');

    // 承認依頼　プレスリリース
    const handleReview = (result:number) => {
        // 依頼する
        dispatch(PressReleaseActionCreators.postPressReleaseReviewResult.request({
            status: result,
            comment: comment,
        }));
        closeHandle()
        dispatch(push(`/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/`))
    };

    // 承認依頼　配信
    const handleReserveReview = (result:number) => {
        dispatch(PressReleaseReserveActionCreators.postPressReleaseReserveReviewResult.request({
            status: result,
            comment: comment,
        }));
        closeHandle()
    };

    const handleChangeComment= ( e ) => {
        setComment(e.target.value)
    };

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle className={classes.dialogTitle}>
                <p className={style.title}>{pressRelease.detail.name}</p>
                <IconButton aria-label="close" onClick={()=>closeHandle()} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <section className={style.item}>
                    <p className={style.subTitle}>メッセージ</p>
                    <div className={style.message}>
                        <TextField multiline
                                   className={classes.textareaField}
                                   variant="outlined"
                                   placeholder="メッセージ"
                                   type="text"
                                       InputProps={{
                                       classes: {
                                           input: classes.input,
                                       },
                                   }}
                                   value={comment}
                                   onChange={handleChangeComment}
                        />
                    </div>
                </section>
            </DialogContent>
            <DialogActions className={classes.action}>
                <Button variant="contained" size="large" color="primary" onClick={()=>{
                    if (isReserve){
                        handleReserveReview(0)
                    } else {
                        handleReview(0)
                    }
                }} disabled={!comment}>
                    修正依頼
                </Button>
                <Button variant="contained" size="large" color="primary" onClick={()=>{
                    if (isReserve){
                        handleReserveReview(1)
                    } else {
                        handleReview(1)
                    }
                }} disabled={!comment}>
                    承認
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewResultDialog
