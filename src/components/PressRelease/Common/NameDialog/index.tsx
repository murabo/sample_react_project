import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// component
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

// state
import { RootState } from "../../../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;

interface NameDialogProps {
	isOpen: boolean,
	handleSave,
	handleClose
}


const NameDialog: React.FC<NameDialogProps> = ({ isOpen, handleSave, handleClose }) => {

    const classes = useStyles();
	const pressRelease = useSelector(pressReleaseSelector);
	const [name, setName] = React.useState('');

	useEffect(() => {
		if (isOpen) setName(pressRelease.detail.name)
	}, [isOpen]);

    return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle>
				プレスリリース名入力してください。<br/>
			</DialogTitle>
			<DialogContent className={classes.content}>
				<Typography gutterBottom variant={"h6"}>
					公開ページのタイトルに使用します。<br/>
					ステータスが編集中の間は、ヘッダーの鉛筆ボタンから何度でも修正できます。
				</Typography>

				<TextField multiline
						   placeholder="プレスリリース名を入力"
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
					保存
				</Button>
			</DialogActions>
		</Dialog>
    );
}

export default NameDialog


const useStyles = makeStyles({
	content: {
        width: 424,
		padding: 20
    }
});


