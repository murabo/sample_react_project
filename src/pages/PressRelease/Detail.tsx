import React, {useEffect} from "react";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// action
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

// components
import Detail from "../../components/PressRelease/Detail";
import Layout from "./Layout";

// state
import {RootState} from "../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const groupSelector = (state: RootState) => state.group;

type PageProps = {} & RouteComponentProps<{groupId:string, pressReleaseId: string}>;

const DetailPage: React.FC<PageProps> = props => {
    const dispatch = useDispatch();
    const pressRelease = useSelector(pressReleaseSelector);

    useEffect(() => {
        const pressReleaseId = props.match.params.pressReleaseId
        if (pressReleaseId){
            dispatch(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: pressReleaseId}));
        }
    }, []);

	return (
		<Layout>
			<Detail
				detail={pressRelease.detail}/>
		</Layout>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
	},

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},
}));

export default DetailPage;
