import React from 'react';
import { NavLink } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: '16rem'
        }
    }),
);


const OutlinedButton = ({text, href}) => {
    const classes = useStyles();
    return (
        <Button variant="outlined" size="large" color="primary" className={classes.button}>
            <NavLink to={href}>
                {text}
            </NavLink>
        </Button>
    );
}


export {
    OutlinedButton
}