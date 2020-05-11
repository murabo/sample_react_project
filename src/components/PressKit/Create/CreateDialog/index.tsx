import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from 'connected-react-router'
import className from 'classnames'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { getJSON } from "../../../../util/File";

// component
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import SelectLayout from "./SelectLayout";
import Content from "./Content";
import History from "./History";
import NameDialog from "../NameDialog";

//img
import IconClose from '../../../../assets/icon_close_gray.svg'
import IconArrow from '../../../../assets/icon_arrow_gray.svg'

//action
import * as PressKitActionCreators from "../../../../actions/PressKit/ActionCreator";

// style
import style from "./create_dialog.module.scss";

import { RootState } from "../../../../reducers";
const pressKitSelector = (state: RootState) => state.pressKit;
const pressGroupSelector = (state: RootState) => state.group;



const useStyles = makeStyles({
    root: {
        width: '92.6rem',
        height: '60rem',
        background: '#F9FBF9',
        display: 'flex',
        justifyContent: 'center',
        padding: 0
    },
    mobile: {
        width: '37.5rem',
        height: '30rem'
    },
    close: {
        position: 'absolute',
        right: '0.5rem',
        top: '0.5rem',
    },
    title: {
        height: '6.4rem',
        background: '#fff',
        justifyContent: 'center'
    },
    radio: {
        padding: '0.5rem',
        textAlign: 'center'
    },
    pdf: {
        width: '100%',
        height: '100%'
    }
});


const CreateDialog: React.FC = () => {

    const classes = useStyles();
    const [type, setType] = React.useState(0);
    const [contentTemplate, setContentTemplate] = React.useState(1);
    const [nameDialog, setNameDialog] = React.useState(false);

    const dispatch = useDispatch();
    const pressKit = useSelector(pressKitSelector);
    const group = useSelector(pressGroupSelector);

    useEffect(() => {
        if (pressKit.create.dialog) {
            handleLoadContentTemplate(contentTemplate)
        }
    }, [pressKit.create.dialog]);
    const handleSetTemplate = () => {
        handleClose()
        setNameDialog(true)
    };

    const handleSaveName = (name) => {
        dispatch(PressKitActionCreators.setPressKitName.request(name));
        dispatch(PressKitActionCreators.setPressKitDetails.request(pressKit.create.template));
        dispatch(push(`/press_kit/${group.selectedId}/create/`))
        setNameDialog(false)
    }

    const handleClose = () => {
        setType(0)
        setContentTemplate(1)
        setNameDialog(false)
        dispatch(PressKitActionCreators.setPressKitCreateDialog.request(false));
    };

    const handleLoadContentTemplate = (path) => {
        dispatch(PressKitActionCreators.getPressKitTemplate.request(`/template/kit/${path}.json`))
        setContentTemplate(path)
    }

    return (
        <div>
            <Dialog
            open={pressKit.create.dialog}
        >
            <DialogTitle className={classes.title}>
                <div className={style.header}>
                    <div className={style.step}>
                        <p className={style.title} onClick={()=>setType(1)}>コンテンツを選択</p>
                    </div>
                </div>
                <IconButton aria-label="close" onClick={handleClose} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.root}>
               <Content type={contentTemplate} handleChange={handleLoadContentTemplate}/>}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="large" color="primary" onClick={() => handleSetTemplate()}>
                    このテンプレートで作成
                </Button>
            </DialogActions>
            </Dialog>
            <NameDialog isOpen={nameDialog} handleSave={handleSaveName} handleClose={handleClose}/>
        </div>
    );
}

export default CreateDialog
