import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Typography } from "@material-ui/core";

// components
import AppLayout from "../../components/Layout/App";
import Guide from "../../components/Guide/List";

interface Props extends RouteComponentProps<void> {}

function HomePage(props: Props) {

	return (
		<AppLayout>
			<div>
				<Typography variant="h2" gutterBottom color="primary" align={"center"}>
					プレスリリースに必要な機能をオールインワン
				</Typography>
				<Typography variant="h6" gutterBottom color="primary" align={"center"}>
					HARVESTでできること
				</Typography>
				<Guide/>
			</div>
		</AppLayout>
	);
}

export default HomePage;
