import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {reset} from 'redux-form';

// models
import { MediaModel } from "../../model/MediaModel";
// components
import MediaEditForm from "../../components/Form/Media";
// actions
import * as MediaActionCreators from "../../actions/Media/ActionCreator";

interface Props extends RouteComponentProps<void> {}

const MediaCratePage: React.FC<Props> = () => {

	const dispatch = useDispatch();

	const handleSubmit = (values: MediaModel) => {
		dispatch(MediaActionCreators.postMedia.request(values));
	}

	useEffect(() => {
		dispatch(reset('MEDIA'));
	}, []);

	return (
		<MediaEditForm onSubmit={handleSubmit}/>
	);
}

export default MediaCratePage;
