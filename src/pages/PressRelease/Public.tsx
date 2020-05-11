import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";

// components
import AppLayout from "../../components/Layout/App";
import List from "../../components/PressRelease/List/";
import { useDispatch, useSelector } from "react-redux";
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

import { RootState } from "../../reducers";
import style from "../../components/Menu/menu.module.scss";
import Button from "@material-ui/core/Button";
const pressReleaseListSelector = (state: RootState) => state.pressReleaseList;
const pressGroupSelector = (state: RootState) => state.group;
const companySelector = (state: RootState) => state.company;

type PageProps = {} & RouteComponentProps<{}>;

const PublicPage: React.FC<PageProps> = props => {

	const dispatch = useDispatch();
	const list = useSelector(pressReleaseListSelector);
	const group = useSelector(pressGroupSelector);
	const company = useSelector(companySelector);

	useEffect(() => {
		if (group.selectedId) {
			dispatch(PressReleaseActionCreators.getPressReleaseListPublic.request({offset: 1}));
		}
	}, [group.selectedId]);

	return (
		<AppLayout>
			<List list={list.publicList} isArchive={false} isPublic={true}/>
		</AppLayout>
	);
};

export default PublicPage;
