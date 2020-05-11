import React from "react";
import { RouteComponentProps } from "react-router-dom";

// components
import MediaDetail from "../../components/Media/Detail";
import AppLayout from "../../components/Layout/App";

interface Props extends RouteComponentProps<void> {}

const MediaDetailPage: React.FC<Props> = (props) => {
	return (
		<AppLayout>
			<MediaDetail/>
		</AppLayout>
	);
};

export default MediaDetailPage;

