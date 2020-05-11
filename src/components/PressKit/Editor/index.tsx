import React, {useEffect, useState} from "react";


//state
import style from "./editor.module.scss";

// action
import * as PressKitActionCreators from "../../../actions/PressKit/ActionCreator";
import { exportFile } from "../../../util/File";

//component
import Button from '@material-ui/core/Button';
import Avatar from "../../Common/Avatar";
import TextField from "@material-ui/core/TextField";
import { IconButton, makeStyles } from "@material-ui/core";
import GoBack from "../../Common/GoBack";
import PreviewDialog from "../../Common/PreviewDialog";

// img
import IconEdit from "../../../assets/editor/icon_edit.svg";

import GEditor from "./Grapes";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import Progress from "../../Common/Progress";
import { PAGE_DETAIL } from "../../../config/page_type";

const pressKitSelector = (state: RootState) => state.pressKit;
const meSelector = (state: RootState) => state.me;
const pressGroupSelector = (state: RootState) => state.group;


const isDevelop = window.location.hostname === "localhost" ? true : false;

const Editor: React.FC = () => {

    const dispatch = useDispatch();
    const pressKit = useSelector(pressKitSelector);
    const group = useSelector(pressGroupSelector);
    const me = useSelector(meSelector);
    const [previewDialog, setPreviewDialog] = React.useState(false);
    const [editName, setEditName] = React.useState(false);
    const classes = useStyles();

    const handleOpenPreviewDialog = () => {
        setPreviewDialog(true);
    };

    const handleClosePreviewDialog = () => {
        setPreviewDialog(false);
    };

    const handleSave = () => {
        dispatch(PressKitActionCreators.postPressKitDetails.request());
    };

    const handleChangeName = (e) => {
        dispatch(PressKitActionCreators.setPressKitName.request(e.target.value));
    };

    const handleSaveName= () => {
        setEditName(false)
        if(!pressKit.detail.id) return
        dispatch(PressKitActionCreators.patchPressKitName.request());
    };

    const handleTemplateSave = () => {
        exportFile({
            body: pressKit.detail.body,
        });
    };

    let link = pressKit.detail.id ? `/press_kit/${group.selectedId}/detail/${pressKit.detail.id}/` : `/press_kit/`;
    
    return (
        <article className={style.wrap}>
            <Progress/>
            <header className={style.header}>
                <GoBack to={link} isReLoad={true}/>
                <div className={style.inner}>
                    {editName ?
                        <div className={style.title}>
                            <TextField multiline
                                       className={classes.textareaField}
                                       value={pressKit.detail.name}
                                       variant="outlined"
                                       onChange={handleChangeName}
                            />
                            <Button variant="outlined" size="small" color="primary" onClick={()=> handleSaveName()}>
                                更新
                            </Button>
                        </div>
                        :
                        <div className={style.title}>
                            <p className={style.text}>
                                {pressKit.detail.name}
                            </p>
                            <IconButton onClick={()=>setEditName(true)} className={classes.editIcon} size="small">
                                <img src={IconEdit}/>
                            </IconButton>
                        </div>
                    }
                    {/*<p className={style.update}><DateTime datetime={pressKit.detail.created_at}/>&nbsp;&nbsp;{pressKit.detail.create_user.last_name}{pressKit.detail.create_user.first_name}が最終更新</p>*/}
                </div>

                <div className={style.actions}>
                    {isDevelop &&
                        <Button variant="outlined" size="large" color="primary" onClick={() => handleTemplateSave()}>
                            <p className='js-fetchStore'>テンプレ保存(local)</p>
                        </Button>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSave}
                        className={"js-fetchStore"}
                    >保存
                    </Button>
                </div>
                <Avatar src={me.img} name={me.last_name} size="medium" color={me.color_cd}/>
            </header>
            <GEditor
                detail={pressKit.detail}/>
            <PreviewDialog isHistory={false} isOpen={previewDialog} closeHandle={handleClosePreviewDialog} handleAction={null} handleActionText="" />
        </article>
    );
};

export default Editor;

const useStyles = makeStyles(() => ({
    textareaField: {
        width: 400,
        marginRight: 10
    },
    editIcon: {
        padding: 0,
        marginLeft: 10,
        minHeight: 10
    }
}));
