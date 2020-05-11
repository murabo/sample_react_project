import React from "react";

//state
import style from "./editor.module.scss";

// conf
import {PAGE_EDIT} from "../../../config/page_type";

// model
import { PressReleaseModel } from "../../../model/PressReleaseModel";

//component
import HeaderMenu from "../Common/HeaderMenu";
import GEditor from "./Grapes";

import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;

interface IProps {
    detail: PressReleaseModel
}


const Editor: React.FC<IProps> = props => {

    const pressRelease = useSelector(pressReleaseSelector);

    return (
        <article className={style.wrap}>
            <HeaderMenu page={PAGE_EDIT}/>
            <GEditor detail={pressRelease.detail}/>
        </article>
    );
};

export default Editor;

