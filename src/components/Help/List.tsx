import React from 'react';
import {NavLink} from "react-router-dom";
import {Typography, Box, ListItem, Divider} from "@material-ui/core";
import List from '@material-ui/core/List';

import {options} from '../../config/help'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        marginBottom: 20
    },
    link: {
        padding: 5,
        display: "block"
    },
    active: {
        background: '#e3f5ea'
    }
});


const HelpList = () => {

    const classes = useStyles();

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                メニュー
            </Typography>
            <List component="nav" className={classes.root}>
                {options.map((option, index) => (
                    <>
                        <NavLink to={option.url} className={classes.link} activeClassName={classes.active}>
                            <ListItem key={index}>
                                <Typography>{option.label}</Typography>
                            </ListItem>
                        </NavLink>
                        <Divider/>
                    </>
                ))}
            </List>
        </Box>
    );
};

export default HelpList

