import React from "react";
import { RouteComponentProps } from "react-router-dom";

// components
import MemberList from "../../components/Member/List";
import AppLayout from "../../components/Layout/App";
import Typography from "@material-ui/core/Typography";

interface Props extends RouteComponentProps<void> {}

const Member: React.FC<Props> = (props) => {
	return (
		<AppLayout>
			<Typography variant="h1" component="h1" gutterBottom>
				メンバー情報
			</Typography>
			<MemberList/>
		</AppLayout>
	);
}

export default Member;
