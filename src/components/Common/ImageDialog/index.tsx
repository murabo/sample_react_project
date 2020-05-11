import React, { useEffect, useState, createRef, ChangeEvent } from "react";
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';

//img
import IconClose from "../../../assets/icon_close_gray.svg";

//state
import { RootState } from "../../../reducers";
import 'react-image-crop/dist/ReactCrop.css';
import Typography from "antd/lib/typography/Typography";

interface PreviewDialogProps {
	isOpen: boolean,
	closeHandle,
	handleUpload
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
	},
	content: {
		padding: 10,
		textAlign: 'center'
	},
	buttons: {
		margin: '10px 0',
	}
});


const ImageDialog: React.FC<PreviewDialogProps> = ({ isOpen, closeHandle, handleUpload }) => {

	const classes = useStyles();
	const [src, setSrc] = useState('')
	const [image, setImage] = useState<File>()
	const ref = createRef<HTMLInputElement>()


	const handleChange = () => {
		handleUpload(image)
		closeHandle()
	};

	const onClick = () => {
		if (ref.current) {
			ref.current.click()
		}
	}

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files === null) {
			return
		}
		const file = event.target.files.item(0)
		if (file === null) {
			return
		}
		setImage(file)
		var reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			setSrc(reader.result as string)
		}
	}

	return (
		<Dialog
			open={isOpen}
		>
			<DialogTitle className={classes.title}>
				<Typography>画像アップロード</Typography>
				<IconButton aria-label="close" onClick={() => closeHandle()} className={classes.close}>
					<img src={IconClose}/>
				</IconButton>
			</DialogTitle>
			<DialogContent className={classes.root}>
				<input
					onChange={onChange}
					ref={ref}
					style={{ display: 'none' }}
					type={'file'}
				/>
				<div className={classes.content} >
					<Button className={classes.buttons} onClick={onClick} variant="contained" color="primary">ファイルを選択</Button>
					<div>{src && <img src={src} width={'100%'}/>}</div>
				</div>
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

export default ImageDialog;
