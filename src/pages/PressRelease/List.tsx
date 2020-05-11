import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";

// components
import AppLayout from "../../components/Layout/App";
import List from "../../components/PressRelease/List/";
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducers";
const pressReleaseListSelector = (state: RootState) => state.pressReleaseList;
const pressGroupSelector = (state: RootState) => state.group;

type PageProps = {} & RouteComponentProps<{}>;

const ListPage: React.FC<PageProps> = props => {

	const dispatch = useDispatch();
	const list = useSelector(pressReleaseListSelector);
	const group = useSelector(pressGroupSelector);

	useEffect(() => {
		if (group.selectedId) {
			dispatch(PressReleaseActionCreators.getPressReleaseList.request({offset: 1}));
		}
	}, [group.selectedId]);

    return (
		<AppLayout>
            <List list={list.search} isArchive={false} isPublic={false}/>
		</AppLayout>
    );
}

export default ListPage;
