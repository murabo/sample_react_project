import React, { useEffect, CSSProperties, HTMLAttributes } from "react";
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import clsx from 'clsx';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';
import { Omit } from '@material-ui/types';
import { useDispatch, useSelector } from "react-redux";
// component


//img
import IconClose from "../../../assets/icon_close_gray.svg";

//state
import { RootState } from "../../../reducers";

// style
import style from "./reviewer_dialog.module.scss";

const pressReleaseSelector = (state: RootState) => state.pressRelease;

interface PreviewDialogProps {
	isOpen: boolean,
	closeHandle,
}

const useStyles = makeStyles({
	root: {
		width: "42rem",
		height: "40rem",
		background: '#F3F7F4'
	},
	close: {
		position: "absolute",
		right: "0.5rem",
		top: "0.5rem",
	},
	title: {
		background: "#F3F7F4",
		height: '5rem'
	},
	action: {
		borderTop: "0.1rem solid #E2E9E5",
	},
	radio: {
		padding: "0.5rem",
		textAlign: "center",
	},
	pdf: {
		width: "100%",
		height: "100%",
	},
	button: {
		marginTop: '1rem',
		width: '13rem',
		height: '4rem',
		borderRadius: '3rem'
	},
	textField: {
		fontSize: '1.4rem',
		lineHeight: '1.5',
		borderRadius: '0.5rem'
	}
});

const ProfileImageDialog: React.FC<PreviewDialogProps> = ({ isOpen, closeHandle }) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const pressRelease = useSelector(pressReleaseSelector);

	useEffect(() => {
		//dispatch(MemberActionCreators.getMemberList.request())
	}, [pressRelease.detail]);

	// switch card or list
	const handleChange = () => {
		//dispatch(MeActionCreators.patchProfileImage.request())
	};

	return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle className={classes.title}>
				<IconButton aria-label="close" onClick={() => closeHandle()} className={classes.close}>
					<img src={IconClose}/>
				</IconButton>
			</DialogTitle>
			<DialogContent className={classes.root}>
				aa


			</DialogContent>
			<DialogActions className={classes.action}>
				<Button variant="outlined" size="large" color="primary" onClick={closeHandle}>
					閉じる
				</Button>
				<Button variant="contained" size="large" color="primary" onClick={()=>handleChange()}>
					追加
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProfileImageDialog;
