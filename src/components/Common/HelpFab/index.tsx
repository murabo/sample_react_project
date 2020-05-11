import React, { useEffect } from "react";
import store from 'store'
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Box } from "@material-ui/core";
import FeedbackForm from "../../Form/FeedbackForm";
import { FeedbackModel } from "../../../model/FeedbackModel";
import * as ActionCreators from "../../../actions/Feedback/ActionCreator";
import { useDispatch, useSelector } from "react-redux";

import HelpDilalog from "./HelpDilalog";

import { RootState } from "../../../reducers";
import {options} from "../../../config/help";
import {NavLink} from "react-router-dom";
const routerSelector = (state: RootState) => state.router;
const pressReleaseSelector = (state: RootState) => state.pressRelease;


const useStyles = makeStyles({
	helpButton: {
		position: "fixed",
		bottom: 10,
		right: 10,
		zIndex: 10,
	},
	icon: {
		fontSize: 30,
	},
	title: {
		color: "#fff",
		fontWeight: "bold",
		fontsize: 12,
	},
	video: {
		width: 300,
		margin: "auto",
		cursor: "pointer"
	},
	menu: {
		position: "fixed",
		bottom: 10,
		right: 60,
		zIndex: 100,
		border: "1px solid #616763",
		backgroundColor: "#616763",
	},
	moreIcon: {
		color: "#fff",
	},
	header: {
		textAlign: "right"
	}
});

const ExpansionPanel = withStyles({
	root: {
		border: "none",
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: 0,
		},
		"&:before": {
			display: "none",
		},
		"&$expanded": {
			margin: "auto",
		},
	},
	expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
	root: {
		backgroundColor: "#616763",
		borderBottom: "1px solid #ffffff3d",
		minHeight: 30,
		"&$expanded": {
			minHeight: 30,
		},
	},
	content: {
		// '&$expanded': {
		//     margin: '12px 0',
		// },
	},
	expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiExpansionPanelDetails);

const HelpFab = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const [expanded, setExpanded] = React.useState<string | false>("panel2");
	const [videoNo, setVideoNo] = React.useState<number | null>(null);
	const [menu, setMenu] = React.useState<boolean>(false);
	const router = useSelector(routerSelector);
	const pressRelease = useSelector(pressReleaseSelector);

	const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const onSubmitPost = (values: FeedbackModel) => {
		dispatch(ActionCreators.postFeedback.request(values));
	};

	useEffect(() => {
		const isHelp = store.get('help')
		const pass = router.location.pathname;
		if (pass.indexOf("press_kit") >= 0) {
			if (isHelp) {
				setMenu(true)
			}
			setExpanded("panel5")
		} else if (pass.indexOf("check") >= 0 || pass.indexOf("diff") >= 0) {
			setMenu(false)
		} else if (pass.indexOf("press_release") === -1) {
			setMenu(false)
		} else {
			if (isHelp) {
				setMenu(true)
			}
			const { status } = pressRelease.detail
			switch (status) {
				case null:
				case 0:
				case 4:
					setExpanded("panel2")
					break;
				case 1:
				case 2:
					setExpanded("panel3")
					break;
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					setExpanded("panel4")
					break;
			}
		}
	}, [router.location, pressRelease.detail.status]);

	return (
		<>
			{menu ?
				<Box className={classes.menu}>
					<Box className={classes.header}>
						<IconButton className={classes.moreIcon}　color="primary" aria-label="close" onClick={()=> {
							store.set('help',false)
							setMenu(false)
						}}>
							<CloseIcon/>
						</IconButton>
					</Box>
					<ExpansionPanel square expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
						<ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header"
											   expandIcon={<ExpandMoreIcon className={classes.moreIcon}/>}>
							<Typography className={classes.title}>フィードバックお待ちしています！</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<FeedbackForm onSubmit={onSubmitPost}/>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel square expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
						<ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header"
											   expandIcon={<ExpandMoreIcon className={classes.moreIcon}/>}>
							<Typography className={classes.title}>ヘルプ一覧</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<List
								component="nav"
								aria-labelledby="nested-list-subheader">
								{options.map((option, index) => (
									<ListItem button onClick={() => window.open(`${option.url}`)} key={index}>
										<ListItemText primary={option.label}/>
									</ListItem>
								))}
							</List>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Box>
				:
				<div className={classes.helpButton}>
					<Tooltip title="使い方" placement="top">
						<Fab size="medium" color="primary" onClick={()=>{
							store.set('help',true)
							setMenu(true)
						}}>
						<HelpOutlineIcon className={classes.icon}/>
					</Fab>
					</Tooltip>
				</div>
			}
			<HelpDilalog no={videoNo} closeHandle={()=> setVideoNo(null)}/>
		</>
	);
};

export default HelpFab;

