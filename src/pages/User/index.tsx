import React, { useEffect } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

// components
import Typography from '@material-ui/core/Typography';
import AppLayout from "../../components/Layout/App";
import Detail from "../../components/User/Detail/Me";
import MeEditForm from "../../components/Form/MeEdit";
import PasswordEditForm from "../../components/Form/PasswordEdit";
import Group from "../../components/User/Group";
import * as MeActionCreators from "../../actions/Me/ActionCreator";
import { MeModel, passwordRequestModel } from "../../model/MeModel";
import { useDispatch, useSelector } from "react-redux";

// state
import {RootState} from "../../reducers";
const meSelector = (state: RootState) => state.me;

interface Props extends RouteComponentProps<void> {}

const UserSettingPage: React.FC<Props> = (props) => {

	const dispatch = useDispatch();
	const me = useSelector(meSelector);
	useEffect(() => {
		dispatch(MeActionCreators.getMe.request());
	}, []);

	const handleSubmitMe = (values: MeModel) => {
		dispatch(MeActionCreators.patchMe.request(values));
	}
	const handleSubmitPassword = (values: passwordRequestModel) => {
		dispatch(MeActionCreators.patchPassword.request(values));
	}

	return (
		<AppLayout>
			<Typography variant="h1" component="h1" gutterBottom>
				アカウント設定
			</Typography>
			<Switch>
				<Route exact={true} path="/user/me/" component={Detail} />
				<Route exact={true} path="/user/me/edit/" render={props => <MeEditForm onSubmit={handleSubmitMe} initialValues={me}/>}/>
				<Route exact={true} path="/user/password/edit/" render={props => <PasswordEditForm onSubmit={handleSubmitPassword} initialValues={me}/>}/>
				<Route exact={true} path="/user/group/" component={Group} />
			</Switch>
		</AppLayout>
	);
}

export default UserSettingPage;
