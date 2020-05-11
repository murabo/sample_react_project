import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

// component
import { Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";

interface PreviewDialogProps {
    isOpen: boolean,
    closeHandle,
    mainHandle,
    ButtonText: string,
	text: string
	content?: string
}

const AppDialog: React.FC<PreviewDialogProps> = ({ text, content, isOpen, closeHandle, mainHandle, ButtonText }) => {

    const classes = useStyles();

    return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle className={classes.header}>
				<p className={classes.title}>{text}</p>
			</DialogTitle>
			{content &&
				<DialogContent className={classes.content}>
					<div className='main' dangerouslySetInnerHTML={{__html : content}} />
				</DialogContent>
			}
			<DialogActions className={classes.action}>
				<Button variant="outlined" size="large" color="primary" onClick={closeHandle}>
					キャンセル
				</Button>
				<Button variant="contained" size="large" color="primary" onClick={mainHandle} className={classes.button}>
					{ButtonText}
				</Button>
			</DialogActions>
		</Dialog>
    );
}

export default AppDialog

const useStyles = makeStyles({
    root: {
        width: 424,
        height: 126
    },
    header: {
        width: 424,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        color: '#6D74707',
        fontWeight: 'bold',
        background: '#F3F7F4',
        paddingLeft: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
	content: {
    	padding: 20,
		fontSize: 14,
		width: 424,
	},
    action: {
        padding: '15px 10px'
    },
    button: {
        background: '#E95050',
        '&:hover': {
            background: '#E95050',
            opacity: 0.7,
        }
    }
});
