import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

// component
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";

//state
import { RootState } from "../../../../../reducers";
import { ReserveCustomModel } from "../../../../../model/PressReleaseReserveModel";
import MailText from "../MailText";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;
const companySelector = (state: RootState) => state.company;

interface PreviewDialogProps {
    isAuto: boolean,
    id : string | undefined,
    isOpen: boolean,
    closeHandle,
}

const useStyles = makeStyles({
    root: {
        width: 926,
        height: 600,
        padding: 30
    },
    title: {
        backgroundColor: "#fff",
        padding: 30
    }
});


const PreviewDialog: React.FC<PreviewDialogProps> = ({ isAuto, id, isOpen, closeHandle}) => {

    const classes = useStyles();
    const reserve = useSelector(pressReleaseReserveSelector);
    const pressRelease = useSelector(pressReleaseSelector);
    const company = useSelector(companySelector);

    let target:any = {}

    if (isAuto) {
        target = reserve.data.auto;
        target.name = '〇〇株式会社';
        target.last_name = '〇〇'
        target.first_name = '〇〇'
    } else {
        const list = reserve.data.custom.filter(item => item.id === id);
        if (list.length) {
            target = list[0]
        } else {
            closeHandle()
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle className={classes.title}>
                <div><Typography variant={"caption"}>送信元：</Typography>{target.from_email}</div>
                <div><Typography variant={"caption"}>件名：</Typography>{target.mail_title}</div>
            </DialogTitle>

            <DialogContent className={classes.root}>
                <Typography variant={"body1"} gutterBottom>
                    {target.name}<br/>
                    {target.publisher && <>{target.publisher}<br/></>}
                    {target.department && <>{target.department}<br/></>}
                    {target.position && <>{target.position}<br/></>}
                    {target.last_name} {target.first_name}様
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    {target.mail_body}
                </Typography>
                <MailText name={pressRelease.detail.name}
                          pdf={pressRelease.detail.pdf}
                          date={reserve.data.released_at}
                          prefix={company.prefix}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size="large" color="primary" onClick={closeHandle}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PreviewDialog
