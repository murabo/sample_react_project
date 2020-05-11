import React, { ReactNode, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";

// action
import * as GroupActionCreators from "../../actions/Group/ActionCreator";

// state
import {RootState} from "../../reducers";
const routerSelector = (state: RootState) => state.router;


export interface Props {
    children: ReactNode
}

const PressReleaseLayout: React.FC<Props> = ({children}) => {
	const classes = useStyles();
    const dispatch = useDispatch();
    const router = useSelector(routerSelector);

    const param = router.location.pathname.split('/')
    useEffect(() => {
        dispatch(GroupActionCreators.setSelectedId.request(param[2]));
    }, []);

	return (
		<div className={classes.root}>
            {children}
		</div>
	);
}

export default PressReleaseLayout;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			margin: 0,
			overflow: 'hidden'
		}
	}),
);
