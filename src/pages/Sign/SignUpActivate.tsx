import React, {useEffect, useState} from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";

// actions
import * as SignActionCreators from "../../actions/Sign/ActionCreator";

type PageProps = {} & RouteComponentProps<{id: string}>;

const SignUpActivate: React.FC<PageProps> = props => {

	const dispatch = useDispatch();
	useEffect(() => {
		const id = props.match.params.id
		if (id){
			dispatch(SignActionCreators.getSignUpActivate.request({id}));
		}
	}, []);

	return (
		<></>
	);
}

export default SignUpActivate;
