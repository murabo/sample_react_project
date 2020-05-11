import React, { useEffect } from "react";
import { withTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// action
import * as ActionCreator from "../../actions/PressKit/ActionCreator";

// components
import GEditor from "../../components/PressKit/Editor/";
import Layout from "./Layout";

type PageProps = {} & RouteComponentProps<{group:string, id: string}>;

const PressKitCreatePage: React.FC<PageProps> = props => {
    const dispatch = useDispatch();

	useEffect(()=> {
		const id = props.match.params.id
		if (id){
			dispatch(ActionCreator.getPressKitDetails.request({id: id}));
		}
	}, []);

	return (
		<Layout>
			<GEditor/>
		</Layout>
	);
}

export default withTheme(PressKitCreatePage);
