import React from "react";
import {Button, makeStyles, Typography} from "@material-ui/core";
import iconRobot from "../../../assets/icon_robot.svg";

//state
import style from "../press_release.module.scss";

import GEditor from "./Grapes";
import Panel from "./Panel";
import IconDo from "../../../assets/editor/icon_undo.svg";



const Editor: React.FC = () => {

    const classes = useStyles();

    return (
        <article className={style.wrap}>
            <Typography className={classes.header} variant={"h4"} align={"center"}>
                <img src={iconRobot} className={classes.icon}/>文章チェック
            </Typography>
            <Button variant={"contained"} className={classes.button} size={"large"} onClick={()=>{ window.location.reload() }}>
                <img src={IconDo} className={classes.icon}/> 再チェック
            </Button>
            <div className={style.body}>
                <div className={style.check}>
                    <GEditor/>
                </div>
                <Panel/>
            </div>
        </article>
    );
};

export default Editor;

const useStyles = makeStyles({
    header: {
        backgroundColor: "#2eb964",
        color: "#fff",
        height: 60,
        lineHeight: 3
    },
    icon: {
        marginRight: 10
    },
    button: {
        position: "fixed",
        right: 10,
        top: 10,
        backgroundColor:"#616763",
        color: "#fff"
    }
});
