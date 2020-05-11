import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import store from 'store'

// models
import { SignInModel } from "../../model/SignModel";
// actions
import * as SignActionCreators from "../../actions/Sign/ActionCreator";
import * as GroupActionCreators from "../../actions/Group/ActionCreator";

// components
import SignInForm from "../../components/Form/SignIn";
import PanelLayout from "../../components/Layout/Panel";
import { Typography } from "@material-ui/core";


interface Props extends RouteComponentProps<void> {}

const SignIn: React.FC<Props> = () => {

    const dispatch = useDispatch();

    const handleSubmit = (values: SignInModel) => {
        dispatch(SignActionCreators.postSignIn.request(values));
	}

	useEffect(() => {
		dispatch(GroupActionCreators.setSelectedId.request(''));
		store.remove('token')
		store.remove('groupId')
	}, []);

	return (
		<PanelLayout>
			<Typography variant="h2" component="h2">
				ログイン
			</Typography>
			<Typography variant="caption">
				アカウントをお持ちでない方は<Typography variant="caption" color={"primary"}><NavLink exact to={`/sign_up/`}>新規会員登録</NavLink></Typography>へ
			</Typography>
			<SignInForm onSubmit={handleSubmit} />
			{/*<Typography variant="caption" gutterBottom>*/}
			{/*	<Typography variant="caption" color={"primary"}><NavLink exact to={`/reset/password/`}>パスワードをお忘れですか？</NavLink></Typography>*/}
			{/*</Typography>*/}
		</PanelLayout>
	);
}

export default SignIn;
