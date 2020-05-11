import React, {useEffect, useState} from "react";
import { RouteComponentProps } from "react-router-dom";

// components
import AppLayout from "../../components/Layout/App";
import {Typography, Button }from "@material-ui/core";

interface Props extends RouteComponentProps<void> {}

const SignUpTemporary: React.FC<Props> = () => {
	return (
		<AppLayout>
			<Typography variant="h1" component="h1" gutterBottom>エラーが発生しました。</Typography>
			<Button variant="contained" size={"large"} color={"primary"} onClick={()=>{window.location.href = "/"}}>
				TOPへ戻る
			</Button>
		</AppLayout>
	);
}

export default SignUpTemporary;
