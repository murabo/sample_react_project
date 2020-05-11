import { Switch, Route } from "react-router";
import * as React from "react";
import store from 'store'

// page
import AlertDialog from "./components/Common/AlertDialog";
import HelpFab from "./components/Common/HelpFab";
import DashboardPage from "./pages/Dashboard";
import PressReleasePage from "./pages/PressRelease/";
import SettingPage from "./pages/Setting";
import PressKitPage from "./pages/PressKit";
import UserPage from "./pages/User";
import MemberPage from "./pages/Member";
import MediaPage from "./pages/Media";
import ResetPassword from "./pages/Reset/Password";
import ResetSendMail from "./pages/Reset/SendMail";
import InitialSetting from "./pages/InitialSetting";

import ErrorSorryPage from "./pages/Error/Sorry";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as GroupActionCreators from "./actions/Group/ActionCreator";
import * as MeActionCreators from "./actions/Me/ActionCreator";
import * as CompanyActionCreators from "./actions/Company/ActionCreator";

import { RootState } from "./reducers";
import { push } from "connected-react-router";
const groupSelector = (state: RootState) => state.group;
const meSelector = (state: RootState) => state.me;

export default function AppRoutes() {

	const me = useSelector(meSelector);
	const group = useSelector(groupSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(GroupActionCreators.getGroupList.request());
	}, []);

	useEffect(() => {
		if (group.selectedId) {
			dispatch(MeActionCreators.getMe.request());
			dispatch(CompanyActionCreators.getCompany.request());
		}
	}, [group.selectedId]);


	useEffect(() => {
		if (group.fetched && !group.results.length) {
			dispatch(push('/initial_setting/'))
		} else if (me.uuid && !me.first_name && !me.last_name) {
			dispatch(push('/initial_setting/'))
		}
	}, [group.fetched, me]);

	return (
		<>
			<AlertDialog/>
			<HelpFab/>
			<Switch>
				<Route exact={true} path="/" component={DashboardPage}/>
				<Route path="/create/" component={DashboardPage}/>
				<Route path="/press_release/" component={PressReleasePage}/>
				<Route path="/press_kit/" component={PressKitPage}/>

				{/*<Route exact={true} path="/invite/activate/:id" component={HomePage}/>*/}
				{/*<Route exact={true} path="/invite/:id" component={HomePage}/>*/}

				<Route path="/user" component={UserPage}/>
				{/*<Route exact={true} path="/me/edit" component={MeEditPage}/>*/}
				{/*<Route exact={true} path="/me/password" component={HomePage}/>*/}

				<Route exact={true} path="/reset/password/" component={ResetPassword}/>
				<Route exact={true} path="/reset/send_mail/" component={ResetSendMail}/>

				<Route path="/initial_setting/" component={InitialSetting}/>
				<Route path="/setting/" component={SettingPage}/>
				<Route path="/media/" component={MediaPage}/>
				<Route path="/member/" component={MemberPage}/>

				<Route exact={true} path="/sorry" component={ErrorSorryPage}/>
				<Route exact={true} path="/unauthorized" component={ErrorSorryPage}/>

				{/*<Route component={HomePage}/>*/}
			</Switch>

		</>
	);
}
