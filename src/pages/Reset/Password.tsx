import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";

// models
import { SignInModel } from "../../model/SignModel";
// actions
import * as SignActionCreators from "../../actions/Sign/ActionCreator";
// components
import ResetPasswordForm from "../../components/Form/ResetPassword";
import PanelLayout from "../../components/Layout/Panel";
import { Link, Typography } from "@material-ui/core";

interface Props extends RouteComponentProps<void> {}

const Password: React.FC<Props> = () => {

    const dispatch = useDispatch();

    const handleSubmit = (values: SignInModel) => {
        dispatch(SignActionCreators.postSignIn.request(values));
	}

	return (
		<PanelLayout>
			<Typography variant="h1" component="h2" gutterBottom>
				パスワードリセット
			</Typography>
			<Typography variant="caption" gutterBottom>
				ご登録いただいたメールアドレスに、パスワード再設定用のメールをお送りします。
			</Typography>
			<ResetPasswordForm onSubmit={handleSubmit} />
			<Typography variant="caption" gutterBottom>
				アカウントをお持ちの方は<Typography variant="caption" color={"primary"}><NavLink exact to={`/sign_in/`}>ログイン</NavLink></Typography>へ
			</Typography>
		</PanelLayout>
	);
}

export default Password;
