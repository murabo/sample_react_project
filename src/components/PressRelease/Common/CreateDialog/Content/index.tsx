import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { pressReleaseType } from "../../../../../config/press_release_type2";

// style
import style from "./create_dialog_content.module.scss";
import Preview from "../../../../Common/Preview";
import { useSelector } from "react-redux";

//state
import { RootState } from "../../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;

const useStyles = makeStyles({
    button: {
        width: 160,
        height: 200,
        display: "block",
        borderRadius: 6,
    },
    listItem: {
        background: '#F9FBF9',
        color: '#6D7470',
        borderBottom: '0.1rem solid #E2E9E5',
    },
    nested: {
        background: '#fff',
    },
    active: {
        background: "#E3F5EA",
        color: '#2EB964',
        borderRadius: 4,
        padding: 10
    },
    default: {
        fontSize: 11,
        color: '#616763',
    },
    text :{
        fontSize: 14,
    }
});


export default function Content({ type, handleChange }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState('');
    const pressRelease = useSelector(pressReleaseSelector);

    const handleClick = (i) => {
        const list = open.split(',')
        if (list.indexOf(String(i)) >= 0){
            list.splice( list.indexOf(i), 1 ) ;
        }else {
            list.push(i) ;
        }
        const result = list.join(',')
        setOpen(result)
    };

    return (
        <div className={style.root}>
            <div className={style.menu}>
                <List
                aria-labelledby="nested-list-subheader"
                >
                {pressReleaseType.map(( value, i ) => {
                    const list = open.split(',')
                    const isOpen = list.indexOf(String(i)) >= 0

                    return (
                        <div key={i}>
                            <ListItem button onClick={() => handleClick(i)} className={classes.listItem}>
                                <ListItemText primaryTypographyProps={{className: classes.default}} primary={value.label}/>
                                { isOpen? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                {value.sub.map((item, k) => (
                                    <List key={k} component="div" disablePadding>
                                        <ListItem button className={classes.nested} onClick={() => handleChange(item.id)}>
                                            <ListItemText primaryTypographyProps={{className: classes.default}} primary={item.label} className={type === `${i}_${k}` ? classes.active:""}/>
                                        </ListItem>
                                    </List>
                                ))}
                            </Collapse>
                            <Divider />
                        </div>
                        )
                })}
            </List>
            </div>
            <div className={style.content}>
                <div className={style.inner}>
                <Preview body={pressRelease.create.template.body}/>
                </div>
            </div>
        </div>
    );
}
