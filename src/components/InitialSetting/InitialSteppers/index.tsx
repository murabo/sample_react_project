import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import ImageEdit from "../../../assets/menu/edit.svg";
import style from "../../Menu/menu.module.scss";
import {ListItem, Tooltip} from "@material-ui/core";
import ImageMedia from "../../../assets/menu/media.svg";
import {NavLink} from "react-router-dom";

interface Props {
    activeStep: number,
    setActiveStep
}


const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props: StepIconProps) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginBottom: 20
        },
        button: {
            width: '100%',
            marginTop: 40,
            fontsize:18
        },
        text: {
            marginTop: 40,
        },
        icon: {
            width: 20,
            margin: "0 5px 5px 10px",
            verticalAlign: "middle"
        }
    }),
);

function getSteps() {
    return ['会社情報', '個人情報', 'メンバー招待'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}


const InitialSetting: React.FC<Props> = ({activeStep, setActiveStep}) => {
    const classes = useStyles();

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography variant={"h4"} align={"center"} color={"primary"} gutterBottom>
                            初期設定完了です
                        </Typography>
                        <Typography variant={"h1"} align={"center"} className={classes.text}>
                            さっそく<img src={ImageEdit} className={classes.icon}/>プレスリリースを作りましょう！
                        </Typography>
                        <NavLink exact to={`/`}>
                            <Button variant={"contained"} size={"large"} onClick={handleReset} color={"primary"} className={classes.button}>
                                作ってみる
                            </Button>
                        </NavLink>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default InitialSetting;
