import React from "react";
import {useDispatch, useSelector} from "react-redux";

//style
import style from "../press_release.module.scss";

// model
import { PressReleaseModel } from "../../../model/PressReleaseModel";

// conf
import { PAGE_DETAIL } from "../../../config/page_type";
import * as StatusConfig from "../../../config/status_type";
import { SetStatus } from "../../../util/Status";

//component
import Panel from "../Common/Panel";
import HeaderMenu from "../Common/HeaderMenu";
import Preview from "../../Common/Preview";
import PreviewDialog from "../../Common/PreviewDialog";

// state
import { RootState } from "../../../reducers";
import { Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as PressReleaseActionCreators from "../../../actions/PressRelease/ActionCreator";
const pressReleaseSelector = (state: RootState) => state.pressRelease;

interface IProps {
    detail: PressReleaseModel
}

const useStyles = makeStyles({
    button: {
        zIndex: 10,
        position: 'fixed',
        bottom: 20,
        left: 10
    },
    pdf: {
        zIndex: 10,
        position: 'fixed',
        bottom: 20,
        left: 120
    },
    icon: {
        marginRight: 10
    }
});

const Detail: React.FC<IProps> = props => {

    const pressRelease = useSelector(pressReleaseSelector);
    const dispatch = useDispatch();
    const status = SetStatus(pressRelease.detail.status)
    const [previewDialog, setPreviewDialog] = React.useState(false);
    const classes = useStyles();

    const handlePDFDownload = () => {
       dispatch(PressReleaseActionCreators.postPressReleasePDF.request({isDownload: true}));
    }

    return (
        <article className={style.wrap}>
            <HeaderMenu page={PAGE_DETAIL}/>
             <div className={style.body}>
                <div className={style.wrap}>
                    {status.code === StatusConfig.STATUS_APPROVED && <div className={style.nav}>プレスリリースが承認されました。メール配信・公開設定をすることができます。</div>}
                    <div className={style.preview}>
                        {pressRelease.detail.body && <Preview body={pressRelease.detail.body}/>}
                    </div>
                </div>
                <Panel pageType={PAGE_DETAIL}/>
            </div>
            <Button className={classes.button} color={"primary"} size={"large"} variant={"contained"} onClick={() => setPreviewDialog(true)}>
                プレビュー
            </Button>
            {/*<Button className={classes.pdf} color={"primary"} size={"large"} variant={"outlined"} onClick={handlePDFDownload}>*/}
            {/*    PDF*/}
            {/*</Button>*/}
            <PreviewDialog isHistory={false} isOpen={previewDialog} closeHandle={() => setPreviewDialog(false)}
                           handleAction={null} handleActionText=""/>
        </article>
    );
};

export default Detail;
