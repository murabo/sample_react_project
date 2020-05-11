import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface SelectUserProps {
	handleChange,
	permission,
}

const useStyles = makeStyles({
	root: {
		marginTop: 10
	}
});

const PermissionSelect: React.FC<SelectUserProps> = ({ handleChange, permission }) => {

	const classes = useStyles();
	const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		handleChange(event.target.value as string);
	};

	return (
		<>
			<FormControl>
				<Select
					disabled={Boolean(permission > 0)}
					value={permission}
					onChange={handleSelectChange}
				>
					<MenuItem value={0}>管理者</MenuItem>
					<MenuItem value={1}>企業メンバー</MenuItem>
					<MenuItem value={2}>パートナー(メディアリスト閲覧不可)</MenuItem>
				</Select>
			</FormControl>
		</>
	);
};

export default PermissionSelect;
