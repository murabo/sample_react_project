import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";

// component
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import PermissionRadio from "../../Common/PermissionRadio";

//img
import IconClose from '../../../assets/icon_close_gray.svg'

//state
import { ValueType } from "react-select/src/types";

import * as MemberActionCreators from "../../../actions/Member/ActionCreator";

interface PreviewDialogProps {
    isOpen: boolean,
    closeHandle
}

interface OptionType {
	label: string;
	value: string;
}

const InvideDialog: React.FC<PreviewDialogProps> = ({ isOpen, closeHandle }) => {

	const dispatch = useDispatch();
    const classes = useStyles();
	// const [users, setUsers] = React.useState({uuid: Array(0), email: Array(0)});
	const [permission, setPermission] = React.useState<number>(1);
	const [user, setUser] = React.useState("");

    const handleInvite = () => {
		//dispatch(MemberActionCreators.postMember.request({uuid: users.uuid, email: users.email, permission: permission}));
		dispatch(MemberActionCreators.postMember.request({uuid: [], email: [user],  permission: permission}));
		closeHandle()
    };

	const handlePermissionChange = (value) => {
		setPermission(value)
	};

	return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle>
				メンバー招待
				<IconButton aria-label="close" onClick={()=>closeHandle()} className={classes.close}>
					<img src={IconClose}/>
				</IconButton>
			</DialogTitle>

			<DialogContent className={classes.root}>
				<Typography className={classes.note}>グループにメンバーを招待します。</Typography>
				{/*<InviteMemberForm/>*/}
				<Box className={classes.textField}>
					<TextField value={user} label="メールアドレス" variant="outlined" onChange={(e)=>setUser(e.target.value)}/>
				</Box>
				{/*<SelectUser handleSelect={(value)=>setUsers(value)}/>*/}
				<PermissionRadio handleChange={handlePermissionChange}/>
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

export default InvideDialog


const useStyles = makeStyles({
    root: {
        width: '42.4rem',
        height: '30rem',
        background: '#F3F7F4'
    },
    close: {
        position: 'absolute',
        right: '1rem',
        top: '1rem',
    },
    note: {
    	padding: 10,
    	marginBottom: 20,
        fontSize: 13,
        color: '#6D7470'
    },
	textField: {
		padding: '10px 0',
	}
});



