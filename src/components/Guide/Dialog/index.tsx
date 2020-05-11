import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// component
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";

//img
import IconClose from '../../../assets/icon_close_gray.svg'

interface Props {
    isOpen: boolean,
    handleClose,
    component
}

const useStyles = makeStyles({
    root: {
        width: 926,
        height: 600,
        padding: 20,
    },
    close: {
        position: 'absolute',
        right: '0.5rem',
        top: '0.5rem',
    },
    action: {
        borderTop: '0.1rem solid #E2E9E5'
    }
});


const GuideDialog: React.FC<Props> = ({ isOpen, handleClose, component}) => {

    const classes = useStyles();

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle>
                <IconButton aria-label="close" onClick={()=>handleClose()} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.root}>
                {component}
            </DialogContent>
            <DialogActions className={classes.action}>
                <Button variant="outlined" size="large" color="primary" onClick={handleClose}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default GuideDialog
