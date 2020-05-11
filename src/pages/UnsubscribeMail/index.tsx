import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import {Button, Typography} from '@material-ui/core';
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
	root: {
		marginTop: 10,
		textAlign: "center"
	},
	action: {
		marginTop: 10
	},
	button: {
		margin: 10
	}
});

const UnsubscribeMail: React.FC = () => {

	const dispatch = useDispatch();
	const [value, setValue] = useState(0)

	const classes = useStyles();
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//setValue(event.target.value)
	};

	const handleSubmit = () => {
		//dispatch(CompanyActionCreators.getCompany.request());
	};

	const handleCansell = () => {
		//dispatch(CompanyActionCreators.getCompany.request());
	};

	return (
		<>
			<div className={classes.root}>
				<Typography variant="h1" component="h1" gutterBottom>
					配信設定を停止する
				</Typography>
				<div className={classes.action}>
					<Button variant="contained" color="primary" onChange={handleSubmit} className={classes.button}>
						停止する
					</Button>
					<Button variant="outlined" color="primary" onChange={handleCansell} className={classes.button}>
						停止しない
					</Button>
				</div>
			</div>
		</>
	);
};

export default UnsubscribeMail;
