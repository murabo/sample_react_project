import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Typography, Box, makeStyles } from "@material-ui/core";

// img
import IconRobot from "../../../../assets/icon_robot_green.svg";

//style
import style from "./check.module.scss";
import Progress from "../../../Common/Progress";
// state
import {RootState} from "../../../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseAISelector = (state: RootState) => state.pressReleaseAI;

const Check: React.FC = () => {

    const classes = useStyles();
    const pressRelease = useSelector(pressReleaseSelector);
    const pressReleaseAI = useSelector(pressReleaseAISelector);
    const { check, titleSuggest } = pressReleaseAI;

    return (
        <div className={classes.root}>
            <Typography variant={"h6"}　className={classes.title}><img src={IconRobot} className={classes.icon}/>タイトルに入れた方がよいワード</Typography>
            <Box className={classes.content}>
                {titleSuggest.fetched ?
                    titleSuggest.result.length ?
                        <ul>
                            {titleSuggest.result.map(item => (
                                <li><Typography className={classes.block} variant={"h6"}>{item}</Typography></li>
                            ))}
                        </ul>
                        : ''
                    :<Typography className={classes.loader}>チェック中・・・</Typography>}
            </Box>
            <Typography variant={"h6"} className={classes.title}><img src={IconRobot} className={classes.icon}/>表記揺れチェック</Typography>
            <Box className={classes.content}>
                {check.fetched ?
                    check.result.variants_word.length ?
                        <>
                            {check.result.variants_word.map( (row, index) => (
                                <Box className={classNames(classes.variants, classes.block)} key={index}>
                                    <Typography key={index} variant={"body2"}> {row.join(', ')}</Typography>
                                </Box>
                            ))}
                        </>
                        : <Typography className={style.nodata}>表記れなし</Typography>
                    :<div className={classes.loader}><Progress/></div>}
            </Box>
            <Typography variant={"h6"} className={classes.title}><img src={IconRobot} className={classes.icon}/>ですます揺らぎチェック</Typography>
            <Box className={classes.content}>
                {check.fetched ?
                    check.result.desumasu_word.length ?
                        <>
                            {check.result.desumasu_word.map( (row, index) => (
                                <Box className={classNames(classes.desumasu, classes.block)} key={index}>
                                    <Typography key={index} variant={"body2"}> {row.join(', ')}</Typography>
                                </Box>
                            ))}
                        </>
                        : <Typography className={style.nodata}><img src={IconRobot} className={classes.icon}/>揺らぎはありません</Typography>
                    :<div className={classes.loader}><Progress/></div>}
            </Box>
            <Typography variant={"h6"} className={classes.title}><img src={IconRobot} className={classes.icon}/>全角チェック</Typography>
            <Box className={classes.content}>
                {check.fetched ?
                    check.result.zenkaku_word.length ?
                        <>
                            {check.result.zenkaku_word.map( (row, index) => (
                                <Box className={classNames(classes.zenkaku, classes.block)} key={index}>
                                    <Typography key={index} variant={"body2"}> {row.join(', ')}</Typography>
                                </Box>
                            ))}
                        </>
                        : <Typography className={style.nodata}>全角はありません。</Typography>
                    :<div className={classes.loader}><Progress/></div>}
            </Box>
        </div>
    );
}


export default Check;

const useStyles = makeStyles({
    root: {
        background: "#F3F7F4",
        padding: "10px",
        width: "300px",
        overflow: "scroll",
        height: "calc( 100vh - 20px );",
        paddingBottom: 30
    },
    title: {
        padding: '10px 0'
    },
    content: {
        minHeight: "50px"
    },
    block: {
        display: "flex",
        padding: "10px",
        borderRadius: 4,
        alignItems: "center",
        background: "#fff",
        marginBottom: 10
    },
    desumasu: {
        border: "1px solid #E7A82E"
    },
    zenkaku: {
        border: "1px solid #E89EB8"
    },
    variants :{
        border: "1px solid #6BA1D3"
    },
    loader: {
        textAlign: "center"
    },
    icon: {
        marginRight: 10
    }
});
