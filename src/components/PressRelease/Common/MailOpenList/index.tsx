import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import style from "./share_dialog.module.scss";

// component
import { List, ListItem, ListItemIcon, ListItemText, Divider, ListItemSecondaryAction, Typography} from "@material-ui/core";

//img
import IconMail from '../../../../assets/icon_mail.svg'
import DateTime from "../../../Common/DateTime";

//state
import { RootState } from "../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;

const useStyles = makeStyles({
    content: {
        width: '54rem',
        backgroundColor: '#F3F7F4',
        paddingBottom: '3rem'
    },
    close: {
        position: 'absolute',
        right: '1rem',
        top: '0',
    },
    dialogTitle: {
        padding: '1rem',
        borderBottom: '0.1rem solid #E2E9E5',
        backgroundColor: '#F3F7F4',
    },
    action: {
        borderTop: '0.1rem solid #E2E9E5',
    },
    input: {
        fontSize: 14,
        lineHeight: '1.5',
        width: '34rem',
        padding: 12
    },
    textField: {
        borderRadius: '4px 0 0 4px',
    },
    button: {
        height: '3.8rem',
        width: '8rem',
        borderRadius: '0 4px 4px 0'
    }
});


const MailOpenList: React.FC = () => {

    const pressReleaseReserve = useSelector(pressReleaseReserveSelector);
    const { custom } = pressReleaseReserve.data

    return (
        <List>
            {custom.map( (value, index) => {
                {
                    return value.is_done ?
                        <div key={index}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <img src={IconMail}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<React.Fragment>
                                            <Typography component="span" variant="h6">
                                                {value.name}
                                            </Typography>
                                        </React.Fragment>}
                                        secondary={`${value.last_name || ""} ${value.first_name || ""}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <Typography variant={"caption"}>
                                            {value.opened_at ? <><DateTime isFormat={true}
                                                                           datetime={value.opened_at}/> 開封</> : "未開封"}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            <Divider/>
                        </div>
                        : null;
                }
            })}
        </List>
    );
}

export default MailOpenList
