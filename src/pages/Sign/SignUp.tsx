import React from "react";
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
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

interface Props extends RouteComponentProps<void> {}

const SignUp: React.FC<Props> = () => {

    const dispatch = useDispatch();

    const handleSubmit = (values: SignUpModel) => {
        dispatch(SignActionCreators.postSignUp.request(values));
	}

	return (
		<PanelLayout>
			<Typography variant="h2" component="h2">
				新規会員登録
			</Typography>
			<Typography variant="caption" gutterBottom>
				アカウントをお持ちの方は<Typography variant="caption" color={"primary"}><NavLink exact to={`/sign_in/`}>ログイン</NavLink></Typography>へ
			</Typography>
			<SignUpForm onSubmit={handleSubmit} />
		</PanelLayout>
	);
}

export default SignUp;
