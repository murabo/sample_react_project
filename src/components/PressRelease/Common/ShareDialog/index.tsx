import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";

import style from "./share_dialog.module.scss";

// component
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@material-ui/core";

//img
import IconClose from '../../../../assets/icon_close_gray.svg'

// actions
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

//state
import { RootState } from "../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;

interface ShareDialogProps {
    isOpen: boolean,
    closeHandle,
}

const useStyles = makeStyles({
    content: {
        width: '54rem',
        backgroundColor: '#F3F7F4',
        paddingBottom: '3rem'
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
    input: {
        fontSize: 14,
        lineHeight: '1.5',
        width: '34rem',
        padding: 12
    },
    textField: {
        borderRadius: '4px 0 0 4px',
    },
    button: {
        height: '3.8rem',
        width: '8rem',
        borderRadius: '0 4px 4px 0'
    }
});


const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, closeHandle }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);

    // switch card or list
    const handleCopy = () => {
        console.log('aa')
    };

    useEffect(() => {
        dispatch(PressReleaseActionCreators.getPressReleaseOneTimePassword.request());
    }, []);

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle className={classes.dialogTitle}>
                <p className={style.title}>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</p>
                <IconButton aria-label="close" onClick={()=>closeHandle()} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <ul className={style.form}>
                    <li>
                        <p className={style.label}>URL</p>
                        <TextField
                            value={pressRelease.oneTimePassword.url}
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: classes.input,
                                    root: classes.textField
                                },
                            }}
                        />
                        <Button variant="contained"
                                size="large"
                                color="primary"
                                onClick={()=>handleCopy()}
                                className={classes.button}>
                            コピー
                        </Button>
                    </li>
                    <li>
                        <p className={style.label}>パスワード</p>
                        <TextField
                            value={pressRelease.oneTimePassword.password}
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: classes.input,
                                    root: classes.textField
                                },
                            }}
                        />
                        <Button variant="contained"
                                size="large"
                                color="primary"
                                onClick={()=>handleCopy()}
                                className={classes.button}>
                            コピー
                        </Button>
                    </li>
                </ul>
            </DialogContent>
        </Dialog>
    );
}

export default ShareDialog

