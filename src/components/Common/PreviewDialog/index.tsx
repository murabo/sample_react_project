import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";
import {
    PREVIEW_TYPE_MOBILE,
    PREVIEW_TYPE_PDF,
} from "../../../config/preview_type";

// component
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import Preview from "../Preview";
import PreviewRadios from "./PreviewRadios";

//img
import IconClose from '../../../assets/icon_close_gray.svg'

//action
import * as PressReleaseActionCreators from "../../../actions/PressRelease/ActionCreator";

//state
import { RootState } from "../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressKitSelector = (state: RootState) => state.pressKit;
const routerSelector = (state: RootState) => state.router;
const previewSelector = (state: RootState) => state.preview;

interface PreviewDialogProps {
    isRevew? :boolean,
    isHistory? :boolean,
    isOpen: boolean,
    closeHandle,
    handleAction?,
    handleActionText?: String,
    defaultLayout?: string
}

const useStyles = makeStyles({
    root: {
        width: 926,
        height: 530,
        padding: 0
    },
    mobile: {
        width: 375,
        height: 600,
        padding: 0
    },
    close: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    title: {
        padding: '0',
        background: '#F3F7F4',
        display: "flex",
        justifyContent: "center",
    },
    action: {
        borderTop: '1px solid #E2E9E5'
    },
    pdf: {
        width: '100%',
        height: '100%'
    },
    note: {
        background: "#2eb964",
        color: "#fff",
        fontSize: 14,
        padding: 10,
        bottom: 50,
        position: "absolute",
        width: "100%",
        textAlign: "center"
    }
});


const PreviewDialog: React.FC<PreviewDialogProps> = ({ isRevew, isHistory, isOpen, closeHandle, handleAction, handleActionText, defaultLayout }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
    const pressKit = useSelector(pressKitSelector);

    const preview = useSelector(previewSelector);
    const router = useSelector(routerSelector);
    const isPressRelease = router.location.pathname.indexOf('press_release') > -1;

    let html:any = ""
    if (isPressRelease) {
        const history = pressRelease.history
        html = isHistory ? history.body: pressRelease.detail.body
    } else {
        html = pressKit.detail.body
    }

    useEffect(() => {
        if (isOpen === true) {
            if (pressRelease.detail.status < 3) {
                dispatch(PressReleaseActionCreators.postPressReleasePDF.request({isDownload: false}));
            }
        }
    }, [isOpen]);

    const contentClass =  preview === PREVIEW_TYPE_MOBILE ? classes.mobile : classes.root;

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle className={classes.title}>
                <PreviewRadios isHistory={isHistory}/>
                <IconButton aria-label="close" onClick={()=>closeHandle()} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={contentClass}>
                <Content preview={preview} html={html} pressRelease={pressRelease}/>
                {isRevew && <Typography className={classes.note}>PC、PDF、SPの表示確認をして、承認依頼をだしてください。</Typography>}
            </DialogContent>
            <DialogActions className={classes.action}>
                <Button variant="outlined" size="large" color="primary" onClick={closeHandle}>
                    閉じる
                </Button>
                {handleAction  && handleActionText &&
                <Button variant="contained" size="large" color="primary" onClick={()=>handleAction()}>
                    {handleActionText}
                </Button>}
            </DialogActions>
        </Dialog>
    );
};

export default PreviewDialog

const Content = ({preview, pressRelease, html}) => {

    const classes = useStyles();
    const random = Math.random();
    let content = <></>
    let url = pressRelease.detail.pdf;
    // 承認前はPDFを生成する
    if (pressRelease.detail.status < 3) {
        url = pressRelease.PDF
    }
    if (preview ===  PREVIEW_TYPE_PDF) {
        content = <iframe src={`${url}?r=${random}`} className={classes.pdf}/>
    } else {
        content = <Preview body={html}/>
    }
    return content
};
