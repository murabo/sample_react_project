import React from "react";
import {RouteComponentProps} from "react-router-dom";

// components
import PanelPageLayout from "../../components/Layout/PanelPage";
import InitialSetting from "../../components/InitialSetting";

interface Props extends RouteComponentProps<void> {}

const InitialSettingPage: React.FC<Props> = () => {

	return (
		<PanelPageLayout>
			<InitialSetting/>
		</PanelPageLayout>
	);
}

export default InitialSettingPage;

