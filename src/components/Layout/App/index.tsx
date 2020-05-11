import React, { ReactNode, useEffect } from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

// component
import Drawer from '@material-ui/core/Drawer';
import Menu from '../../Menu';

// State
import {RootState} from "../../../reducers";
import Progress from "../../Common/Progress";

export interface Props {
	children: ReactNode
}

const AppLayout: React.FC<Props> = ({children}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
                    paper: classes.drawerPaper,
                }}
				anchor="left"
			>
				<Menu/>
			</Drawer>
			<div className={classes.content}>
				<Progress size={"large"}/>
				<div className={classes.inner}>
					<main className={classes.main}>
						{children}
						{/*<Footer/>*/}
					</main>
				</div>
			</div>
		</div>
	);
}
export default AppLayout;

const drawerWidth = 280;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
			height: '100%',
			margin: 0,
			overflow: 'hidden'
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
			flexGrow: 1,
			height: "100vh",
			overflow: "scroll",
        },
		inner: {
			padding: theme.spacing(3),
		},
		main: {
			maxWidth: 1000,
			margin: "auto"
		},
    }),
);
