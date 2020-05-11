import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';

const selectUseStyles = makeStyles({
		root: {
			flexGrow: 1,
			boxShadow: 'none'
		},
		input: {
			fontSize:14
		}
	}
);

interface SelectUserProps {
	handleChange,
	suggestions
}

interface FilmOptionType {
	label: string;
	value: string;
	uuid: string,
	email: string
}

const SelectUser: React.FC<SelectUserProps> = ({ handleChange, suggestions }) => {
	const classes = selectUseStyles();

	return (
		<div className={classes.root}>
				<Autocomplete
					onChange={(e, value) => handleChange(value)}
					multiple
					options={suggestions}
					getOptionLabel={(option: FilmOptionType) => option.label}
					filterSelectedOptions
					renderInput={params => (
						<TextField
							{...params}
							variant="outlined"
							placeholder=""
							margin="normal"
							fullWidth
							className={classes.input}
						/>
					)}
				/>
		</div>
	);
}

export default SelectUser;
