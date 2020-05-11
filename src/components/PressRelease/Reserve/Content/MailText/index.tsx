import React from "react";
import { createReleasedAt } from "../../../../../util/createUrl";

// component
import { makeStyles, Typography } from "@material-ui/core/";

// img
import ImagePDF from "../../../../../assets/icon_pdf.svg";

const useStyles = makeStyles({
	root: {
		padding: 10
	},
	name: {

	},
	url: {
		marginTop: 5,
		marginRight: 10,
		borderRadius: 4,
		display: "flex",
		cursor: "pointer"
	},
	pdf: {
		wordBreak: "break-all",
		marginTop: 5,
		background: "#F8FBF9",
		borderRadius: 4,
		padding: 10,
		display: "flex",
		cursor: "pointer"
	},
	icon: {
		marginRight: 10
	},
});


interface Props {
	name: string,
	date: Date,
	pdf: string,
	prefix: string
}
const MailText: React.FC<Props> = ({name, date, pdf, prefix}) => {
	const classes = useStyles();
	const url = createReleasedAt(date, prefix);
	return (
		<div className={classes.root}>
			<Typography variant={"h6"} className={classes.name}>
				{name}
			</Typography>
			<Typography variant={"body1"} className={classes.pdf} onClick={()=>{window.open(pdf, "_blank");}}>
				<img src={ImagePDF} className={classes.icon} />{pdf}
			</Typography>
		</div>
	);
};
export default MailText;
