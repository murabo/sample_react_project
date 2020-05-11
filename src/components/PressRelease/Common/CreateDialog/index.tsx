import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from 'connected-react-router'
import className from 'classnames'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// component
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import SelectLayout from "./SelectLayout";
import Content from "./Content";
import Design from "./Design";
import History from "./History";

//img
import IconClose from '../../../../assets/icon_close_gray.svg'
import IconArrow from '../../../../assets/icon_arrow_gray.svg'

//action
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

// style
import style from "./create_dialog.module.scss";

import { RootState } from "../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressGroupSelector = (state: RootState) => state.group;
const dialogSelector = (state: RootState) => state.dialog;


const useStyles = makeStyles({
    root: {
        width: 926,
        height: 530,
        background: '#F9FBF9',
        display: 'flex',
        justifyContent: 'center',
        padding: 0
    },
    mobile: {
        width: 375,
        height: 300
    },
    close: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    title: {
        height: 64,
        background: '#fff',
        justifyContent: 'center'
    },
    radio: {
        padding: 5,
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
    const [selectLayout, setSelectLayout] = React.useState(1);
    const [designTemplate, setDesignTemplate] = React.useState(0);
    const [contentTemplate, setContentTemplate] = React.useState(400);
    const [historyTemplate, setHistoryTemplate] = React.useState(0);

    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
    const group = useSelector(pressGroupSelector);

    useEffect(() => {
        if (pressRelease.create.dialog) handleLoadContentTemplate(contentTemplate)
    }, [pressRelease.create.dialog]);

    const handleSetTemplate = () => {
        dispatch(PressReleaseActionCreators.setPressReleaseTemplate.request(pressRelease.create.template));
        dispatch(push(`/press_release/${group.selectedId}/create/`))
        handleClose()
    };

    const handleClose = () => {
        setType(0)
        setSelectLayout(1)
        setDesignTemplate(0)
        setContentTemplate(400)
        setHistoryTemplate(0)
        dispatch(PressReleaseActionCreators.setPressReleaseCreateDialog.request(false));
    };

    const handleLoadContentTemplate = (path) => {
        dispatch(PressReleaseActionCreators.getPressReleaseTemplate.request(`/template/content/${path}.json`))
        setContentTemplate(path)
    }

    const handleLoadDesignTemplate = (i) => {
        dispatch(PressReleaseActionCreators.getPressReleaseTemplate.request(`/template/design/${i}.json`))
        setDesignTemplate(i)
    }

    const handleSelectLayout = (i) => {
        dispatch(PressReleaseActionCreators.getPressReleaseTemplate.request(`/template/design/${i}.json`))
        setDesignTemplate(i)
    }

    const handleChangeLayout = (i) => {
        setType(selectLayout)
        if (selectLayout === 1) {
            handleLoadContentTemplate(contentTemplate)
        }else if (selectLayout === 2) {
            handleLoadDesignTemplate(designTemplate)
        }
    }


    return (
        <Dialog
            open={pressRelease.create.dialog}
        >
            <DialogTitle className={classes.title}>
                <div className={style.header}>
                    <div className={style.step} >
                        <p className={style.title}>テンプレートタイプを選択</p>
                    </div>
                    <img src={IconArrow} className={style.iconArrow}/>
                    <div className={style.step}>
                        <span className={className(style.num, type > 0 ? style.active: '')}>2</span>
                        {type === 1 && <p className={style.title} onClick={()=>setType(1)}>コンテンツを選択</p>}
                        {type === 2 && <p className={style.title} onClick={()=>setType(2)}>デザインを選択</p>}
                        {/*{type === 3 && <p className={style.title} onClick={()=>setType(3)}>履歴を選択</p>}*/}
                    </div>
                </div>
                <IconButton aria-label="close" onClick={handleClose} className={classes.close}>
                    <img src={IconClose}/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.root}>
                {type === 0 && <SelectLayout type={selectLayout} handleChange={setSelectLayout}/>}
                {type === 1 && <Content type={contentTemplate} handleChange={handleLoadContentTemplate}/>}
                {type === 2 && <Design type={designTemplate} handleChange={handleLoadDesignTemplate}/>}
                {/*{type === 3 && <History type={historyTemplate} handleChange={setHistoryTemplate}/>}*/}
            </DialogContent>
            <DialogActions>
                {type > 0 &&
                <Button variant="outlined" size="large" color="primary" onClick={()=>setType(0)}>
                    戻る
                </Button>}
                <Button variant="outlined" size="large" color="primary" onClick={handleClose}>
                    キャンセル
                </Button>
                {type > 0 ?
                    <Button variant="contained" size="large" color="primary" onClick={() => handleSetTemplate()}>
                        このテンプレートで作成
                    </Button> :
                    <Button variant="contained" size="large" color="primary" onClick={handleChangeLayout}>
                        次へ
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default CreateDialog
