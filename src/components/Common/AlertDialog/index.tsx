import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";

import * as DialogActionCreators from "../../../actions/Dialog/ActionCreator";

import { RootState } from "../../../reducers";
const dialogSelector = (state: RootState) => state.dialog;

const AlertDialog = () => {

    const dispatch = useDispatch();
    const dialog = useSelector(dialogSelector);

    const handleClose = () => {
        dispatch(DialogActionCreators.setDialog.request({isOpen: false}));
        setTimeout(function() {
            dispatch(DialogActionCreators.setDialog.request({text: ''}))
        }, 100);
    };

    return (
        <div>
            <Dialog
                open={dialog.isOpen}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialog.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog

