import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

// action
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

// components
import Layout from "./Layout";
import Reserve from "../../components/PressRelease/Reserve";
import { useDispatch } from "react-redux";

type PageProps = {} & RouteComponentProps<{groupId:string, pressReleaseId: string}>;

const ReservePage: React.FC<PageProps> = props => {

    const dispatch = useDispatch();
    useEffect(()=> {
        const pressReleaseId = props.match.params.pressReleaseId
        if (pressReleaseId){
            dispatch(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: pressReleaseId}));
        }
    }, []);

    return (
		<Layout>
            <Reserve/>
		</Layout>
    );
};

export default ReservePage;
