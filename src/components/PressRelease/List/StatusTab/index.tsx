import React from "react";
import { makeStyles, Tab, Tabs } from "@material-ui/core";

interface ListLayoutItemProps {
    handleChange,
    value
}

const StatusTab: React.FC<ListLayoutItemProps> = ({ handleChange, value }) => {

    const classes = useStyles();

    return (
        <Tabs
            className={classes.tab}
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
        >
            <Tab label="すべて"/>
            <Tab label="編集中"/>
            <Tab label="校閲・承認待ち"/>
            <Tab label="公開待ち"/>
        </Tabs>
    )
}

export default StatusTab;

const useStyles = makeStyles({
    tab: {
        marginBottom: 30
    }
});
