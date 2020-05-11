import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {IconButton, Typography, Box} from '@material-ui/core';
import { useDispatch } from "react-redux";

// component
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";

//img
import IconClose from '../../../../../../../assets/icon_close_gray.svg'

//state
import { ValueType } from "react-select/src/types";

import * as ActionCreators from "../../../../../../../actions/PressReleaseInvite/ActionCreator";

interface PreviewDialogProps {
    isOpen: boolean,
    closeHandle
}

interface OptionType {
	label: string;
	value: string;
}

const InviteDialog: React.FC<PreviewDialogProps> = ({ isOpen, closeHandle }) => {

	const dispatch = useDispatch();
    const classes = useStyles();
	//const [users, setUsers] = React.useState({uuid: Array(0), email: Array(0)});
	const [user, setUser] = React.useState("");

    const handleInvite = () => {
		//dispatch(ActionCreators.postPressReleaseGuestUser.request({uuid: users.uuid, email: users.email}));
		dispatch(ActionCreators.postPressReleaseGuestUser.request({uuid: [], email: [user]}));
		closeHandle()
	};

	return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle>
				ゲスト招待
				<IconButton aria-label="close" onClick={()=>closeHandle()} className={classes.close}>
					<img src={IconClose}/>
				</IconButton>
			</DialogTitle>

			<DialogContent className={classes.root}>
				<Typography className={classes.note}>ゲストにメンバーを招待します。</Typography>
				<Box className={classes.textField}>
					<TextField value={user} label="メールアドレス" variant="outlined" onChange={(e)=>setUser(e.target.value)}/>
				</Box>
				{/*<InviteMemberForm/>*/}
				{/*<UserTagInput handleSelect={(value)=>setUsers(value)}/>*/}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" size="large" color="primary" onClick={closeHandle}>
					キャンセル
				</Button>
				<Button variant="contained" size="large" color="primary" onClick={()=>handleInvite()} disabled={!user}>
					招待メールを送る
				</Button>
			</DialogActions>
		</Dialog>
    );
}

export default InviteDialog


const useStyles = makeStyles({
    root: {
        width: 420,
        height: 200,
        background: '#F3F7F4'
    },
    close: {
        position: 'absolute',
        right: '1rem',
        top: '1rem',
    },
    note: {
		margin: '20px 0',
        fontSize: 13,
        color: '#6D7470'
    },
	textField: {
		padding: '10px 0',
	}
});



