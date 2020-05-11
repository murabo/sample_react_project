import React, {ReactNode} from 'react';
import List from "./List";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography, Container } from "@material-ui/core";
import {Box} from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Switch} from "react-router";

export interface Props {
	children: ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'block',
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				display: 'flex',
			},
		},
		content: {
			flex: 1,
			marginLeft: 30,
		}
	}),
);

const Menu = ({children}) => {
	const classes = useStyles();
	return (
		<Box>
			<Typography variant="h1" component="h1" gutterBottom>
				ヘルプセンター
			</Typography>
			<Box className={classes.root}>
				<List/>
				<div className={classes.content}>
					<main>
						{children}
					</main>
				</div>
			</Box>
		</Box>
	);
};

export default Menu

