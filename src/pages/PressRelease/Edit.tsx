import React, {useEffect} from "react";
import { withTheme } from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { push } from 'connected-react-router'

// action
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

// components
import GEditor from "../../components/PressRelease/Editor/";
import Layout from "./Layout";

// state
import {RootState} from "../../reducers";
import { checkEditAuthority } from "../../util/checkAuthority";
const groupSelector = (state: RootState) => state.group;
const meSelector = (state: RootState) => state.me;
const pressReleaseSelector = (state: RootState) => state.pressRelease;

type PageProps = {} & RouteComponentProps<{groupId:string, pressReleaseId: string}>;

const CreatePage: React.FC<PageProps> = props => {
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
	const me = useSelector(meSelector);
	const group = useSelector(groupSelector);

    useEffect(()=> {
		const pressReleaseId = props.match.params.pressReleaseId
		if (pressReleaseId){
			dispatch(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: pressReleaseId}));
		}
    }, [group.selectedId]);

	useEffect(()=> {
		if (me.uuid && pressRelease.detail.fetched === true) {
			// 編集権限チェック
			const hasEdit = checkEditAuthority(pressRelease, me)
			if (!hasEdit) dispatch(push(`/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/`))
		}
	}, [me.uuid, pressRelease.detail.fetched]);

	return (
		<Layout>
			<GEditor
				detail={pressRelease.detail}/>
		</Layout>
	);
}

export default withTheme(CreatePage);
