import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// component
import { Button, Tooltip, Box, IconButton, makeStyles, Typography } from "@material-ui/core/";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// img
import ImageEllipsis from "../../../../../assets/icon_ellipsis.svg";

import { FixedPhraseTemplate } from "./template";


const useStyles = makeStyles({
	head: {
		padding: 10,
	},
	root: {
		borderTop: "1px solid #E9EFEB",
		width: 300,
		border: "none",
		borderRadius: 0,
	},
	body: {
		background: "#F8FBF9",
		padding: 10,
		// borderBottom: '1px solid #E2E9E5',
	},
	action: {
		display: "flex",
		justifyContent: "flex-end",
		marginBottom: 10
	},
});


const FixedPhrase: React.FC = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState<number>(0);

	return (
		<>
			<Typography variant={"h6"} className={classes.head}>
				サンプル定型文
			</Typography>
			{FixedPhraseTemplate.map((item, index) => (
				<ExpansionPanel
					square
					className={classes.root}
					expanded={index === expanded}
					onChange={()=>setExpanded(index)}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon/>}
						aria-controls="panel1a-content"
					>
						<Typography>{item.title}</Typography>
					</ExpansionPanelSummary>
					<Divider/>
					<ExpansionPanelDetails className={classes.body}>
						<Box className={classes.action}>
							<CopyToClipboard text={item.text}>
								<Button variant="outlined" size="small" color="primary">
									クリップボードにコピー
								</Button>
							</CopyToClipboard>
						</Box>
						<Typography variant={"body2"}>
							{item.text}
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}
		</>
	);
};
export default FixedPhrase;
