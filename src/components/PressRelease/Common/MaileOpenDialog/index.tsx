import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";

// component
import { Dialog, DialogContent, DialogTitle, TextField, Button,Typography } from "@material-ui/core";
import MailOpenList from "../../Common/MailOpenList";

//img
import IconClose from '../../../../assets/icon_close_gray.svg'

// actions
import * as PressReleaseReserve from "../../../../actions/PressReleaseReserve/ActionCreator";

//state
import { RootState } from "../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;

interface DialogProps {
    id: string | null
    isOpen: boolean,
    handleClose,
}

const useStyles = makeStyles({
    content: {
        width: '54rem',
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


const MaileOpenDialog: React.FC<DialogProps> = ({ isOpen, id, handleClose }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
    const pressReleaseReserve = useSelector(pressReleaseReserveSelector);
    const { custom } = pressReleaseReserve.data

    useEffect(() => {
        if (id) dispatch(PressReleaseReserve.getPressReleaseReserve.request({press_id: id}));
    }, [id]);

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle>
                配信メール開封確認
                <IconButton aria-label="close" onClick={()=>handleClose()} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
               <MailOpenList/>
            </DialogContent>
        </Dialog>
    );
}

export default MaileOpenDialog

