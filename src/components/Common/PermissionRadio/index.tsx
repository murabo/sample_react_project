import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from "../../../reducers";
import Radio from '@material-ui/core/Radio';
import {RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';

const memberSelector = (state: RootState) => state.member;

interface SuggestType {
	id: string;
	text: string;
}

interface SelectUserProps {
	handleChange
}

const useStyles = makeStyles({
	root: {
		marginTop: 10
	}
});

const PermissionRadio: React.FC<SelectUserProps> = ({ handleChange }) => {

	const classes = useStyles();
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleChange((event.target as HTMLInputElement).value);
	};

	return (
		<>
			<FormControl component="fieldset" className={classes.root}>
				<FormLabel component="legend">権限</FormLabel>
				<RadioGroup defaultValue="1" name="permission" onChange={handleRadioChange}>
					<FormControlLabel value="1" control={<Radio color="primary"/>} label="企業メンバー" />
					<FormControlLabel value="2" control={<Radio color="primary"/>} label="パートナー(メディアリスト閲覧不可)" />
				</RadioGroup>
			</FormControl>
		</>
	);
};

export default PermissionRadio;
