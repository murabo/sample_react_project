import React, { useEffect } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

// components
import AppLayout from "../../components/Layout/App";
import Typography from "@material-ui/core/Typography";
import Detail from "../../components/Setting/Detail/Company";
import CompanyEdit from "../../components/Form/CompanyEdit";
import Group from "../../components/Setting/Group";
import Plan from "../../components/Setting/Plan";
import Payment from "../../components/Setting/Payment";
import { useDispatch, useSelector } from "react-redux";
import * as CompanyActionCreators from "../../actions/Company/ActionCreator";
import { CompanyModel } from "../../model/CompanyModel";

import {RootState} from "../../reducers";
const companySelector = (state: RootState) => state.company;
const groupSelector = (state: RootState) => state.group;

interface Props extends RouteComponentProps<void> {}

const SettingPage: React.FC<Props> = (props) => {

	const dispatch = useDispatch();
	const company = useSelector(companySelector);
	const group = useSelector(groupSelector);

	useEffect(() => {
		if (group.selectedId) dispatch(CompanyActionCreators.getCompany.request());
	}, [group.selectedId]);

	const onSubmitPatch = (values: CompanyModel) => {
		dispatch(CompanyActionCreators.patchCompany.request(values));
	};

	const onSubmitPost = (values: CompanyModel) => {
		dispatch(CompanyActionCreators.postCompany.request(values));
	};

	return (
		<AppLayout>
			<Typography variant="h1" component="h1" gutterBottom>
				企業設定
			</Typography>
			<Switch>
				<Route exact={true} path="/setting/" component={Detail} />
				<Route exact={true} path="/setting/company" component={Detail} />
				<Route exact={true} path="/setting/company/edit/" render={props => <CompanyEdit onSubmit={onSubmitPatch} initialValues={company}/>}/>
				<Route exact={true} path="/setting/company/crate/" render={props => <CompanyEdit onSubmit={onSubmitPost}/>}/>
				<Route exact={true} path="/setting/group/" component={Group} />
				<Route exact={true} path="/setting/plan/" component={Plan}/>
				<Route exact={true} path="/setting/payment/" component={Payment}/>
			</Switch>
		</AppLayout>
	);
}

export default SettingPage;
