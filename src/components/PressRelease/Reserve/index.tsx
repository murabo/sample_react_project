import React from "react";
import style from "./reserve.module.scss";
import { PAGE_DETAIL, PAGE_RESERVE } from "../../../config/page_type";

// component
import { Box } from "@material-ui/core/";
import Content from "./Content/";
import HeaderMenu from "../Common/HeaderMenu";
import Panel from "../Common/Panel";

const Reserve: React.FC = () => {

    return (
        <article className={style.wrap}>
            <HeaderMenu page={PAGE_RESERVE}/>
            <Box className={style.body}>
                <div className={style.mediaList}>
                    <Content/>
                </div>
                <Panel pageType={PAGE_DETAIL}/>
            </Box>
        </article>
    );
}
export default Reserve;
