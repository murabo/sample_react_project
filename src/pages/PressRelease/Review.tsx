import React, {useEffect} from "react";
import { withTheme } from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// action
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

// components
import GEditor from "../../components/PressRelease/Review";
import Layout from "./Layout";

// state
import {RootState} from "../../reducers";
import { push } from "connected-react-router";
const groupSelector = (state: RootState) => state.group;
const meSelector = (state: RootState) => state.me;
const pressReleaseSelector = (state: RootState) => state.pressRelease;


type PageProps = {} & RouteComponentProps<{groupId:string, pressReleaseId: string}>;

const ReviewPage: React.FC<PageProps> = props => {
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);
	const me = useSelector(meSelector);
	const group = useSelector(groupSelector);

    useEffect(()=> {
        const pressReleaseId = props.match.params.pressReleaseId
		if (pressReleaseId){
			dispatch(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: pressReleaseId}));
		}
    }, []);

	useEffect(() => {
		if (me.uuid && pressRelease.detail.fetched === true) {
			// 校閲権限チェック
			const hasReview = (pressRelease.detail.review.member || []).filter(member => member.user.uuid === me.uuid);
			if (hasReview.length) {
				if (hasReview[0].history) {
					dispatch(PressReleaseActionCreators.getPressReleaseHistoryDetails.request({press_id: pressRelease.detail.press_id, history_id: hasReview[0].history}));
				} else {
					dispatch(PressReleaseActionCreators.getPressReleaseHistoryDetails.request({press_id: pressRelease.detail.press_id, history_id: pressRelease.detail.review.history}));
				}
			} else {
				dispatch(push(`/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/`))
			}
		}
	}, [me.uuid,pressRelease.detail.fetched]);

	return (
		<Layout>
			<GEditor/>
		</Layout>
	);
}

export default withTheme(ReviewPage);
