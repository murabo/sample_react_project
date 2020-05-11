import React, {useEffect, useState} from "react";

import { RouteComponentProps } from "react-router-dom";

// components
import AppLayout from "../../components/Layout/App";
import List from "../../components/PressRelease/List/";
import { useDispatch, useSelector } from "react-redux";
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

import { RootState } from "../../reducers";
const pressReleaseListSelector = (state: RootState) => state.pressReleaseList;
const pressGroupSelector = (state: RootState) => state.group;

type PageProps = {} & RouteComponentProps<{}>;

const ArchivePage: React.FC<PageProps> = props => {

	const dispatch = useDispatch();
	const list = useSelector(pressReleaseListSelector);
	const group = useSelector(pressGroupSelector);

	useEffect(() => {
		if (group.selectedId) {
			dispatch(PressReleaseActionCreators.getPressReleaseListArchive.request({offset: 1}));
		}
	}, [group.selectedId]);

	return (
		<AppLayout>
			<List list={list.archive} isArchive={false} isPublic={false}/>
		</AppLayout>
	);

}


export default ArchivePage;
