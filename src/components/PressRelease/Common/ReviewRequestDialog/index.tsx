import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select/src/types";


import style from "./review_dialog.module.scss";

// component
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import DatePicker from "../../../Common/DatePicker";
import SelectUser from "../../../Common/SelectUser";

//img
import IconClose from '../../../../assets/icon_close_gray.svg'

import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

//state
import { RootState } from "../../../../reducers";
import TextField from "@material-ui/core/TextField";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const meSelector = (state: RootState) => state.me;

interface PreviewDialogProps {
    isOpen: boolean,
    closeHandle,
    handleReview,
}

const useStyles = makeStyles({
    content: {
        width: 540,
        height: 530,
        paddingTop: 20,
        backgroundColor: '#F3F7F4',
    },
    close: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    dialogTitle: {
        padding: 10,
        borderBottom: '1px solid #E2E9E5',
        backgroundColor: '#F3F7F4',
    },
    action: {
        borderTop: '1px solid #E2E9E5',
    },
    radio: {
        padding: 10
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
        marginRight: 10
    },
});


interface OptionType {
    label: string;
    value: string;
}

const ReviewRequestDialog: React.FC<PreviewDialogProps> = ({ isOpen, closeHandle, handleReview }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
    const me = useSelector(meSelector);
    const _d = new Date();
    const now = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate() + 3, 0, 0, 0);

    const [datetime, setDatetime] = useState(now);
    const [selectUser, setSelectUser] = React.useState<ValueType<OptionType>>([]);
    const [comment, setComment] = React.useState<ValueType<OptionType>>('');
    const [creators, setCreators] = React.useState<ValueType<OptionType>>([]);

    const suggestUser = pressRelease.detail.members
    useEffect(() => {
        // 編集者リスト
        const creatorList:string[] =[]
        pressRelease.detail.creators.forEach((element) => {
            creatorList.push(element.uuid)
        });
        setSelectUser(creatorList)
    }, [pressRelease.detail.creators]);

    const groupMember: OptionType[] = suggestUser
        .filter(item => selectUser.indexOf(item.user.uuid) === -1 )
        .filter(suggestion => suggestion.user.last_name && suggestion.user.first_name) // 姓名が存在
        .filter(suggestion => suggestion.user.uuid !== pressRelease.detail.create_user.uuid) // 作成者以外
        .filter(suggestion => creators.indexOf(suggestion.user.uuid) === -1) // 編集者以外
        .filter(suggestion => suggestion.user.uuid !== me.uuid) // 自分以外
        .map(suggestion => {
        return ({
            value: `${suggestion.user.last_name_kana}${suggestion.user.first_name_kana}`,
            label: `${suggestion.user.last_name}${suggestion.user.first_name}`,
            uuid: suggestion.user.uuid,
            email: suggestion.user.email,
            // image: suggestion.user.image,
        })
    });

    // 承認依頼
    const handleClickReview = () => {
        const date = dayjs(datetime).format();
        handleReview(selectUser, date, comment);
        handleClose()
    };

    // キャンセル
    const handleCansell = (event: React.ChangeEvent<{}>)  => {
        handleClose()
        setDatetime(now)
    };

    // キャンセル
    const handleClose = ()  => {
        closeHandle()
        setSelectUser([])
    };


    // 承認者選択
    const handleChangeUser = ( users ) => {
        if (users.length) {
            const userList: string[] = []
            users.forEach((element) => {
                userList.push(element.uuid)
            });
            setSelectUser(userList)
        }else {
            setSelectUser([])
        }
    };

    // 日付選択
    const handleChangeDatetime = ( m ) => {
        setDatetime(m)
    };

    // コメント入力
    const handleChangeComment= ( e ) => {
        setComment(e.target.value)
    };

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle className={classes.dialogTitle}>
                <p className={style.title}>{pressRelease.detail.name}</p>
                <IconButton aria-label="close" onClick={handleCansell} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <section className={style.item}>
                    <p className={style.subTitle}>承認期限</p>
                    <DatePicker datetime={datetime}
                                edit={true}
                                isReserve={false}
                                handleChangeDatetime={handleChangeDatetime}/>
                </section>
                <section className={style.item}>
                    <p className={style.subTitle}>承認者</p>
                    <SelectUser handleChange={(value)=>handleChangeUser(value)} suggestions={groupMember}/>
                </section>
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
                <Button variant="outlined" size="large" color="primary" onClick={handleCansell}>
                    キャンセル
                </Button>
                <Button variant="contained" size="large" color="primary" onClick={handleClickReview} disabled={selectUser.length === 0 || !comment}>
                    承認依頼
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReviewRequestDialog
