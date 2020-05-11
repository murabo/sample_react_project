import React, {useEffect, useState} from "react";
import { Theme, makeStyles, withTheme } from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { push } from 'connected-react-router'

// components
import GEditor from "../../components/PressKit/Editor/";
import Layout from "./Layout";
// state
import {RootState} from "../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const routerSelector = (state: RootState) => state.router;

type PageProps = {} & RouteComponentProps<{group:string, id: string}>;

const PressKitCreatePage: React.FC<PageProps> = props => {
    const dispatch = useDispatch();
	const router = useSelector(routerSelector);

	useEffect(()=> {
		if (router.action === 'POP') {
			dispatch(push('/create/'))
		}
	}, []);

	return (
		<Layout>
			<GEditor/>
		</Layout>
	);
}

export default withTheme(PressKitCreatePage);
