import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// component
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

interface NameDialogProps {
    isOpen: boolean,
	handleSave,
	handleClose
}

const CreateDialog: React.FC<NameDialogProps> = ({ isOpen, handleSave, handleClose }) => {

    const classes = useStyles();
	const [name, setName] = React.useState('');

    return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle>
				新規グループ追加
			</DialogTitle>
			<DialogContent className={classes.content}>
				<TextField multiline
						   placeholder="グループ名"
						   value={name}
						   variant="outlined"
						   onChange={(e)=>setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" size="large" color="primary" onClick={()=>handleClose()}>
					キャンセル
				</Button>
				<Button variant="contained" size="large" color="primary" onClick={()=>handleSave(name)} disabled={!name}>
					作成
				</Button>
			</DialogActions>
		</Dialog>
    );
}

export default CreateDialog


const useStyles = makeStyles({
	content: {
        width: 424,
		padding: 20
    }
});


