import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// models
import { MediaModel } from "../../model/MediaModel";
// components
import MediaEditForm from "../../components/Form/Media";

// actions
import * as MediaActionCreators from "../../actions/Media/ActionCreator";

//state
import { RootState } from "../../reducers";
const MediaSelector = (state: RootState) => state.media;

type PageProps = {} & RouteComponentProps<{id: string | undefined}>;
const MediaEditPage: React.FC<PageProps> = (props) => {

    const dispatch = useDispatch();
	const media = useSelector(MediaSelector);

	useEffect(() => {
		const id = props.match.params.id
		if (id) {
			dispatch(MediaActionCreators.getMediaDetail.request({id: id}));
		}
	}, []);

    const handleSubmit = (values: MediaModel) => {
        dispatch(MediaActionCreators.patchMedia.request(values));
	}

	return (
		<MediaEditForm onSubmit={handleSubmit} initialValues={media.detail}/>
	);
}

export default MediaEditPage;
