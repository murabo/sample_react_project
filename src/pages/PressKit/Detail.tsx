import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// action
import * as pressKitActionCreators from "../../actions/PressKit/ActionCreator";

// components
import Detail from "../../components/PressKit/Detail";
import Layout from "./Layout";

// state
import {RootState} from "../../reducers";
import { push } from "connected-react-router";
const pressKitSelector = (state: RootState) => state.pressKit;

type PageProps = {} & RouteComponentProps<{group:string, id: string}>;

const PressKitDetailPage: React.FC<PageProps> = props => {
    const dispatch = useDispatch();
    const pressKit = useSelector(pressKitSelector);

    useEffect(() => {
        const id = props.match.params.id
        if (id){
            dispatch(pressKitActionCreators.getPressKitDetails.request({id}));
        }
    }, []);

	return (
		<Layout>
			<Detail
				detail={pressKit.detail}/>
		</Layout>
	);
}

export default PressKitDetailPage;
