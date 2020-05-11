import React from 'react';
import { makeStyles, Typography } from "@material-ui/core/";

const useStyles = makeStyles({
    text: {
        padding: "0 10px",
        fontSize: 10
    },
});


const PasswordText = () => {
    const classes = useStyles();
    return (
        <Typography variant={"caption"} className={classes.text}>
            個人情報と似ているパスワードにはできません。<br/>
            パスワードは最低 8 文字以上必要です。<br/>
            よく使われるパスワードにはできません。<br/>
            数字だけのパスワードにはできません。<br/>
        </Typography>
    );
}


export default PasswordText
