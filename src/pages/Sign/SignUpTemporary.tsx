import React from "react";
import { RouteComponentProps } from "react-router-dom";

import PanelLayout from "../../components/Layout/Panel";
import { Typography } from "@material-ui/core";

interface Props extends RouteComponentProps<void> {}

const SignUpTemporaryPge: React.FC<Props> = () => {

	return (
		<PanelLayout>
			<Typography variant="h2" component="h2">
				仮登録完了
			</Typography>
			<Typography variant="caption" gutterBottom>
				ご登録いただいたメールアドレスに、本登録用ページのURLを記載したメールをお送りしました。<br/>
			</Typography>
		</PanelLayout>
	);
}

export default SignUpTemporaryPge;
