import React, {useEffect, useState} from "react";
import { Theme, makeStyles, withTheme } from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import { RouteComponentProps } from "react-router-dom";


// action
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

// components
import DiffEditor from "../../components/PressRelease/Diff/";
import Layout from "./Layout";
// state
import {RootState} from "../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;

type PageProps = {} & RouteComponentProps<{groupId:string, pressReleaseId: string, historyId: string}>;

const DiffPage: React.FC<PageProps> = props => {
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);

    useEffect(()=> {
        const pressReleaseId = props.match.params.pressReleaseId
		if (pressReleaseId){
            dispatch(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: pressReleaseId}));
		}

		const historyId = props.match.params.historyId
		if (historyId){
			dispatch(PressReleaseActionCreators.getPressReleaseDiffHistoryDetails.request({
				press_id: pressReleaseId,
				history_id: historyId
			}));
		}

    }, []);

	return (
		<Layout>
			<DiffEditor/>
		</Layout>
	);
}

export default withTheme(DiffPage);
