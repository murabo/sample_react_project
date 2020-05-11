import React from "react";
import { useSelector } from "react-redux";

//state
import style from "./detail.module.scss";

// model
import { PressKitModel } from "../../../model/PressKitModel";
//component
import Button from '@material-ui/core/Button';
import Panel from "../Editor/Panel";
import Avatar from "../../Common/Avatar";
import HeaderMenu from "./HeaderMenu";
import PreviewDialog from "../../Common/PreviewDialog";
import Preview from "../../Common/Preview";
import DateTime from "../../Common/DateTime";
import GoBack from "../../Common/GoBack";

import { RootState } from "../../../reducers";
import Progress from "../../Common/Progress";
const pressKitSelector = (state: RootState) => state.pressKit;
const pressGroupSelector = (state: RootState) => state.group;
const meSelector = (state: RootState) => state.me;

interface IProps {
    detail: PressKitModel
}

const Detail: React.FC<IProps> = props => {

    const pressKit = useSelector(pressKitSelector);
    const group = useSelector(pressGroupSelector);
    const me = useSelector(meSelector);
    const [previewDialog, setPreviewDialog] = React.useState(false);

    const handleOpenPreviewDialog = () => {
        setPreviewDialog(true);
    };

    const handleClosePreviewDialog = () => {
        setPreviewDialog(false);
    };

    return (
        <article className={style.wrap}>
            <Progress/>
            <header className={style.header}>
                <GoBack to={'/press_kit/'} isReLoad={false}/>
                <div className={style.inner}>
                    <p className={style.title}>プレスキット</p>
                    <p className={style.name}>{pressKit.detail.name}</p>
                    {/*<p className={style.update}><DateTime datetime={pressKit.detail.created_at}/>&nbsp;&nbsp;{pressKit.detail.create_user.last_name}{pressKit.detail.create_user.first_name}が最終更新</p>*/}
                </div>
                <div className={style.actions}>
                    <a href={`/press_kit/${group.selectedId}/detail/${pressKit.detail.id}/edit/`}>
                        <Button variant="outlined" size="large" color="primary">
                            編集
                        </Button>
                    </a>
                    <Avatar src={me.img} name={me.last_name} size="medium" color={me.color_cd}/>
                </div>
            </header>
            <div className={style.body}>
                <div className={style.preview}>
                    <Preview body={pressKit.detail.body}/>
                </div>
            </div>
            <PreviewDialog isHistory={false} isOpen={previewDialog} closeHandle={handleClosePreviewDialog} handleAction={null} handleActionText=""/>
        </article>
    );
}

export default Detail;



