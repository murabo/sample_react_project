import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";

// model
import { SignUpModel } from "../../model/SignModel";

// actions
import * as SignActionCreators from "../../actions/Sign/ActionCreator";

// components
import SignUpForm from "../../components/Form/SignUp";
import PanelLayout from "../../components/Layout/Panel";
import { Typography } from "@material-ui/core";


interface Props extends RouteComponentProps<void> {}

const SendMail: React.FC<Props> = () => {

    const dispatch = useDispatch();

    const handleSubmit = (values: SignUpModel) => {
        dispatch(SignActionCreators.postSignUp.request(values));
	}

	return (
		<PanelLayout>
			<Typography variant="caption" gutterBottom>
				アカウントをお持ちの方は<Typography variant="caption" color={"primary"}><NavLink exact to={`/sign_in/`}>ログイン</NavLink></Typography>へ
			</Typography>
			<SignUpForm onSubmit={handleSubmit} />
			{/*<div>*/}
				{/*<a text="ログインはこちら" href="/sign_in"/>*/}
			{/*</div>*/}
		</PanelLayout>
	);
}

export default SendMail;
