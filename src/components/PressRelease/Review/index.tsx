import React from "react";

//state
import style from "../press_release.module.scss";

// conf
import {PAGE_REVIEW} from "../../../config/page_type";

//component
import HeaderMenu from "../Common/HeaderMenu";
import GEditor from "./Grapes";


const Review: React.FC= () => {

    return (
        <article className={style.wrap}>
            <HeaderMenu page={PAGE_REVIEW}/>
            <GEditor/>
        </article>
    );
};

export default Review;
