import React, { useEffect } from "react";
import {CircularProgress, LinearProgress} from '@material-ui/core';
import { RootState } from "../../../reducers";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const sagaMonitorReserveSelector = (state: RootState) => state.sagaMonitor;

interface Props {
    size? : "large",
}

const Progress: React.FC<Props> = ({ size }) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingSlow, setLoadingSlow] = React.useState<boolean>(false);
    const sagaMonitor = useSelector(sagaMonitorReserveSelector);
    const classes = useStyles();

    useEffect(() => {
        if (!loading) {
            setLoading(true)
            setLoadingSlow(true)
            setTimeout(function(){
                setLoading(false)
            },1000)

            setTimeout(function(){
                setLoadingSlow(false)
            },1000)
        }
    }, [sagaMonitor]);

    if (size) {
        return loading ?
            <LinearProgress className={classes.root}/> : null
    } else {
        return loadingSlow ? <LinearProgress className={classes.root}/> : null
    }
}


export default Progress

const useStyles = makeStyles({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100
    },
    inner: {
        width: "100%"
    }
});
