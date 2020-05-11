import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";

// component
import { Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@material-ui/core";
//img
import IconClose from '../../../../assets/icon_close_gray.svg'

//action
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

//state
import { RootState } from "../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressKitSelector = (state: RootState) => state.pressKit;
const routerSelector = (state: RootState) => state.router;


interface DialogProps {
    no: number | null,
    closeHandle,
}

const useStyles = makeStyles({
    root: {
        backgroundColor: "#555"
    },
    close: {
        position: 'absolute',
        right: '0.5rem',
        top: '0.5rem',
    },
    box: {
        padding: 40,
        maxWidth: 1000,
        maxHeight: 1000,
        margin: "auto"
    }
});


const HelpDilalog: React.FC<DialogProps> = ({ closeHandle, no }) => {

    const classes = useStyles();
    const isOpen = no? true: false

    return (
        <Dialog
            onClose={closeHandle}
            open={isOpen}
        >
            {/*<DialogTitle>*/}
            {/*    <IconButton aria-label="close" onClick={()=>closeHandle()} className={classes.close}>*/}
            {/*        <img src={IconClose}/>*/}
            {/*    </IconButton>*/}
            {/*</DialogTitle>*/}
            <DialogContent className={classes.root}>
                <Box className={classes.box}>
                     <video src={`/video/0${no}.mov`} autoPlay loop width="100%"></video>
                </Box>
            </DialogContent>
            {/*<DialogActions>*/}
            {/*    <Button variant="outlined" size="large" color="primary" onClick={closeHandle}>*/}
            {/*        閉じる*/}
            {/*    </Button>*/}
            {/*</DialogActions>*/}
        </Dialog>
    );
}

export default HelpDilalog
