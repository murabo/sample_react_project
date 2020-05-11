import React, { useEffect } from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core";
import { SetStatus } from '../../../../util/Status'

interface StatusProps {
    status: number | undefined,
    review,
    type: string,
}

const Status: React.FC<StatusProps> = ({ status, review, type }) => {
    const classes = StatusStyles();
    const [statusInfo, setStatusInfo] = React.useState({code: 0, label: '', color: ''});
    useEffect(() => {
        setStatusInfo(SetStatus(status))
    }, [status]);

    if (type === 'bar') {
        return (
            <StatusExpansionPanel status={statusInfo.code} statusText={statusInfo.label} statusColor={statusInfo.color}/>
        );
    }else {
        return (
            <span className={classes.root} style={{background: statusInfo.color}}>{statusInfo.label}</span>
        );
    }
}

const StatusStyles = makeStyles({
    root: {
        fontSize: 12,
        height: 22,
        lineHeight: 1.7,
        borderRadius: 10,
        color: '#fff',
        minWidth: 72,
        padding: '2px 10px',
        textAlign: 'center',
        fontWeight: "bold"
    }
});


export default Status

interface StatusExpansionPanelProps {
    status: number,
    statusText: string,
    statusColor: string,
}

function getSteps() {
    return ['編集中', '校閲・承認待ち', '配信設定　編集中', '配信設定　承認待ち', '配信 待ち', '配信 済み'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return '承認依頼をするまでは、ステータスが「編集中」となります。';
        case 1:
            return '承認依頼をすると、ステータスが「校閲・校閲待ち」となります。校閲と承認は複数回繰り返す場合があります。';
        case 2:
            return 'プレスリリースが承認されるとステータスが「配信設定　編集中」となり、配信設定をすることができます。';
        case 3:
            return '配信設定が承認されるとステータスが「配信　待ち」となります。';
        case 4:
            return '配信が完了するとステータスが「配信　済み」となります。';
        case 5:
            return '配信設定が承認されるとステータスが「配信　待ち」となります。';
        default:
            return '';
    }
}

const StatusExpansionPanelStyles = makeStyles({
    root: {
        background: "none",
        border: "none",
    },
    panel: {
        flexDirection: "row",
        display: "flex",
        color: "#fff",
        fontWeight: "bold",
        paddingLeft: 0
    },
    panelDetail: {
        background: "#E2E9E5",
        padding: 10,
    },
    status: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff",
    },
    statusButton: {
        position: "absolute",
        right: 3,
        top: 12,
        width: 110,
        padding: "2px 5px",
        fontSize: 11,
        background: "#fff",
        textAlign: "center",
        marginLeft: "auto",
        borderRadius: 10,
        paddingRight: 10,
    },
    stepper: {
        background: "#fff",
        borderRadius: 4,
        padding: 10
    },
    button: {
        marginTop: 10,
        marginRight: 10,
    },
    actionsContainer: {
        marginBottom: 10,
    },
    resetContainer: {
        padding: 10,
    },
    subText: {
        fontSize: 12,
        color: '#6d7470'
    }
});


const StatusExpansionPanel: React.FC<StatusExpansionPanelProps> = ({ status, statusText, statusColor }) => {
    const classes = StatusExpansionPanelStyles();

    const [activeStep, setActiveStep] = React.useState(status);
    const steps = getSteps();

    useEffect(() => {
        setActiveStep(status)
    }, [status]);

    return (
        <ExpansionPanel className={classes.root} elevation={0} defaultExpanded>
            <ExpansionPanelSummary
                style={{background: statusColor}}
                className={classes.panel}
                expandIcon={<ExpandMoreIcon/>}
            >
                <div className={classes.status}>
                    {statusText}
                    <Typography style={{color: statusColor}} className={classes.statusButton}>ステータス確認</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetail}>
                <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography className={classes.subText}>{getStepContent(index)}</Typography>
                                {/*<div className={classes.actionsContainer}>*/}
                                {/*    <div>*/}
                                {/*        <Button*/}
                                {/*            disabled={activeStep === 0}*/}
                                {/*            onClick={handleBack}*/}
                                {/*            className={classes.button}*/}
                                {/*        >*/}
                                {/*            Back*/}
                                {/*        </Button>*/}
                                {/*        <Button*/}
                                {/*            variant="contained"*/}
                                {/*            color="primary"*/}
                                {/*            onClick={handleNext}*/}
                                {/*            className={classes.button}*/}
                                {/*        >*/}
                                {/*            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
                                {/*        </Button>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

