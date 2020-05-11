import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as ActionCreators from "../../../../../actions/PressReleasePublish/ActionCreator";

// state
import { RootState } from "../../../../../reducers";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Typography, Box, Switch} from "@material-ui/core";

const pressReleasePublishSelector = (state: RootState) => state.pressReleasePublish;
const companySelector = (state: RootState) => state.company;

const Publish: React.FC = () => {

	const publish = useSelector(pressReleasePublishSelector);
	const company = useSelector(companySelector);
	const dispatch = useDispatch();
	const isCompanyPage = company.is_public_page === "true"
	const handleClick = () => {
		dispatch(ActionCreators.setPressReleasePublish.request({is_publish: Number(!publish.publish.is_publish)}))
	}

	return (
		<>
			<Box>
				<FormControlLabel
					control={
						<Switch
							disabled={!isCompanyPage}
							checked={publish.is_publish}
							onChange={handleClick}
							value="checkedB"
							color="primary"
							inputProps={{ 'aria-label': 'primary checkbox' }}
						/>
					}
					label="公開する"
				/>
			</Box>
			{!isCompanyPage && <Typography variant="caption" color={"error"}>企業の公開ページが非公開に設定されています。</Typography>}
		</>
	);
};

export default Publish;

