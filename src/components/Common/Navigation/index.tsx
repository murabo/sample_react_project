import React from 'react';
import { makeStyles, Typography } from "@material-ui/core/";

const useStyles = makeStyles({
    text: {
        padding: "0 10px",
        position: "fixed"
    },
});

interface Props {
    html
}

const Navigation: React.FC<Props> = ({html}) => {
    const classes = useStyles();

    return (
        <Typography variant={"caption"} className={classes.text}　dangerouslySetInnerHTML={{__html : html}} ></Typography>
    );
}


export default Navigation
