import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Switch, Route } from "react-router";

// components
import Typography from '@material-ui/core/Typography';
import List from "../../components/Media/List";
import AppLayout from "../../components/Layout/App";

import CreatePage from "./Create";
import EditPage from "./Edit"

interface Props extends RouteComponentProps<void> {}

const MediaListPage: React.FC<Props> = () => {
	return (
		<AppLayout>
			<Typography variant="h1" component="h1" gutterBottom>
				メディア情報
			</Typography>
			<Switch>
				<Route exact={true} path="/media/" component={List}/>
				<Route exact={true} path="/media/create/" component={CreatePage}/>
				<Route exact={true} path="/media/:id/edit/" component={EditPage}/>
			</Switch>
		</AppLayout>
	);
}

export default MediaListPage;
