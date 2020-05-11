import React from "react";
//state
import Typography from '@material-ui/core/Typography';
import style from "../press_release.module.scss";
import GEditor from "./Grapes";
import { makeStyles } from "@material-ui/core";

const Editor: React.FC = () => {

    const classes = useStyles();

    return (
        <article className={style.wrap}>
            <Typography className={classes.navi} variant={"h6"}>
                    差分を表示しています。
                    <span className={classes.ins}></span> 追加　 <span className={classes.del}></span> 削除
            </Typography>
            <GEditor/>
        </article>
    );
};

export default Editor;


const useStyles = makeStyles({
    navi: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 4,
        background: "#6D7470",
        padding: 20,
        color: "#fff"
    },
    ins: {
        display: "block",
        backgroundColor: "rgba(69, 230, 252, 0.5)",
        width: 20,
        height: 10,
        margin: 5
    },
    del: {
        display: "block",
        backgroundColor: "#ddd",
        width: 20,
        height: 10,
        margin: 5
    }
});
