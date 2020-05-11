import React, { useEffect, CSSProperties, HTMLAttributes } from "react";
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
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

import SelectUser from "../../../../../../Common/SelectUser";

//model
import { PressReleaseMemberModel } from "../../../../../../../model/PressReleaseModel";


//img
import IconClose from "../../../../../../../assets/icon_close_gray.svg";
import IconPlus from "../../../../../../../assets/icon_plus.svg";

//action
import * as PressReleaseActionCreators from "../../../../../../../actions/PressRelease/ActionCreator";
import * as MemberActionCreators from "../../../../../../../actions/Member/ActionCreator";

//state
import { RootState } from "../../../../../../../reducers";

// style
import style from "./reviewer_dialog.module.scss";
import { patchPressReleaseArchive } from "../../../../../../../actions/PressRelease/ActionCreator";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const meSelector = (state: RootState) => state.me;

interface PreviewDialogProps {
	isOpen: boolean,
	closeHandle
}

const useStyles = makeStyles({
	root: {
		width: "42rem",
		height: "20rem",
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



interface OptionType {
	label: string;
	value: string;
}

const ReviewerDialog: React.FC<PreviewDialogProps> = ({ isOpen, closeHandle }) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const pressRelease = useSelector(pressReleaseSelector);
	const me = useSelector(meSelector);
	const [selectUser, setSelectUser] = React.useState<ValueType<OptionType>>([]);

	const ids:any = selectUser.map( row =>{
		return row.uuid
	}).reduce(function(a,b){return a.concat(b)}, []);

	const creators:any = pressRelease.detail.creators.map( row =>{
		return row.uuid
	}).reduce(function(a,b){return a.concat(b)}, []);

	const suggestion = pressRelease.detail.members.filter(item => {
		const id = item.user.uuid
		const isActive = item.user.first_name && item.user.last_name
		return isActive && pressRelease.detail.create_user.uuid !== id && ids.indexOf(id) === -1 && creators.indexOf(id) === -1
	})

    const groupMember: OptionType[] = suggestion
		.filter(suggestion => suggestion.user.last_name && suggestion.user.first_name) // 姓名が存在
		.filter(suggestion => suggestion.user.uuid !== pressRelease.detail.create_user.uuid) // 作成者以外
		.filter(suggestion => creators.indexOf(suggestion.user.uuid) === -1) // 編集者以外
		.filter(suggestion => suggestion.user.uuid !== me.uuid) // 自分以外
		.map(suggestion => ({
        value: `${suggestion.user.last_name_kana}${suggestion.user.first_name_kana}`,
        label: `${suggestion.user.last_name}${suggestion.user.first_name}`,
        uuid: suggestion.user.uuid,
        email: suggestion.user.email,
        // image: suggestion.user.image,
    }));

	const handleAddCreater = () => {
        dispatch(PressReleaseActionCreators.postPressReleaseCreator.request({user: ids}))
		closeHandle()
	};

	return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle className={classes.title}>
				編集者を追加
				<IconButton aria-label="close" onClick={() => closeHandle()} className={classes.close}>
					<img src={IconClose}/>
				</IconButton>
			</DialogTitle>
			<DialogContent className={classes.root}>
				<p className={style.title}>メンバーから追加</p>
				<SelectUser handleChange={(value)=>setSelectUser(value)} suggestions={groupMember}/>
			</DialogContent>
			<DialogActions className={classes.action}>
				<Button variant="outlined" size="large" color="primary" onClick={closeHandle}>
					閉じる
				</Button>
				<Button variant="contained" size="large" color="primary" onClick={()=>handleAddCreater()} disabled={!selectUser.length}>
					追加
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ReviewerDialog;
