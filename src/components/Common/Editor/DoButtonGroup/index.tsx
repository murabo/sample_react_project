import React, { useState, useEffect } from "react";
import NewWindow from 'react-new-window'
import classNames from "classnames";
import style from "./status.module.scss";

import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";
import * as PreviewActionCreators from "../../../../actions/Preview/ActionCreator";

//img
import IconDo from "../../../../assets/editor/icon_undo.svg";
import IconDesktopOff from "../../../../assets/preview/icon_desktop_off.svg";
import IconDesktopOn from "../../../../assets/preview/icon_desktop_on.svg";
import IconPDFOff from "../../../../assets/preview/icon_pdf_off.svg";
import IconPDFOn from "../../../../assets/preview/icon_pdf_on.svg";
import IconMobileOff from "../../../../assets/preview/icon_mobile_off.svg";
import IconMobileOn from "../../../../assets/preview/icon_mobile_on.svg";
import IconExpand from "../../../../assets/editor/icon_expand.svg";
import iconRobot from "../../../../assets/icon_robot.svg";

//component
import { Typography, FormControlLabel, ButtonGroup, Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import {
	PREVIEW_TYPE_DESKTOP,
	PREVIEW_TYPE_MOBILE,
	PREVIEW_TYPE_PDF
} from "../../../../config/preview_type";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useDispatch, useSelector } from "react-redux";

import PreviewDialog from "../../PreviewDialog";
import * as DialogActionCreators from "../../../../actions/Dialog/ActionCreator";

import { RootState } from "../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressGroupSelector = (state: RootState) => state.group;
const routerSelector = (state: RootState) => state.router;

// grapesjs用コンポーネント
const DoButtonGroup = ({ editor, isGrid }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [type, setType] = useState(PREVIEW_TYPE_DESKTOP);
	const [grid, setGrid] = useState(false);
	const [modalOpen, setModalOpen] = React.useState<Boolean>(false);
	const [previewDialog, setPreviewDialog] = React.useState(false);

	const group = useSelector(pressGroupSelector);
	const pressRelease = useSelector(pressReleaseSelector);
	const router = useSelector(routerSelector);
	const isPressRelease = router.location.pathname.indexOf('press_release') > -1;

	const canvas = document.querySelector(".gjs-cv-canvas__frames") as HTMLElement;
	const frame = document.querySelector(".gjs-frame") as HTMLElement;


	useEffect(() => {
		if (editor) {
			setGrid(isGrid);
			if (isGrid) editor.Commands.run("sw-visibility");
			handleChange(PREVIEW_TYPE_DESKTOP);
			const um = editor.UndoManager
			const undoEl = document.getElementById("js-undo");
			if (undoEl) {
				undoEl.addEventListener("click", () => {
					um.undo();
				}, false);
			}

			const redoEl = document.getElementById("js-redo");
			if (redoEl) {
				redoEl.addEventListener("click", () => {
					um.redo();
				}, false);
			}

			// 線
			const swVisibility = document.getElementById("js-sw-visibility");
			if (swVisibility) {
				swVisibility.addEventListener("change", (e) => {
					const target: any = e.target;
					if (target.checked) {
						editor.Commands.run("sw-visibility");
					} else {
						editor.Commands.stop("sw-visibility");
					}
				}, false);
			}
		}
	}, [editor]);


	const handleAiCheck = () => {
		dispatch(PressReleaseActionCreators.postPressReleaseDetails.request({ isDiff: false, isReview: false }));
		if (pressRelease.detail.press_id) {
			setTimeout(function() {
				setModalOpen(true)
			}, 1000);
		} else {
			dispatch(DialogActionCreators.setDialog.request({
				isOpen: true,
				text: '保存後に実行してください。'
			}))
		}
	};

	const openPreviewDialog = (value) => {
		setPreviewDialog(true)
		dispatch(PreviewActionCreators.setPreviewType.request(value));
	};

	const handleChange = (type) => {

		switch (type) {
			case PREVIEW_TYPE_DESKTOP:
				editor.Commands.run("set-device-desktop");
				if (canvas) {
					canvas.style.paddingRight = "362px";
					canvas.style.background = "#fff";
					editor.getWrapper().removeClass("pdf");
				}
				setType(PREVIEW_TYPE_DESKTOP);
				break;
			case PREVIEW_TYPE_PDF:
				if (canvas) {
					editor.Commands.run("set-device-tablet");
					canvas.style.paddingRight = "362px";
					canvas.style.background = "none";
					frame.style.width = "210mm";
					editor.getWrapper().addClass("pdf");
				}
				setType(PREVIEW_TYPE_PDF);
				break;
			case PREVIEW_TYPE_MOBILE:
				editor.Commands.run("set-device-mobile");
				if (canvas) {
					canvas.style.paddingRight = "362px";
					canvas.style.background = "none";
					editor.getWrapper().removeClass("pdf");
				}
				setType(PREVIEW_TYPE_MOBILE);
				break;
			default:
		}
	};

	return (
		<div className={style.root}>
			<div className={style.actions}>
				<ButtonGroup size="small">
					<Button id="js-undo" className={classes.buttonGroup}>
						<img src={IconDo}　className={style.doImage}/>
					</Button>

					<Button id="js-redo" className={classes.buttonGroup}>
						<img src={IconDo}/>
					</Button>
				</ButtonGroup>

				<RadioGroup className={classes.radioGroup}>
					<Radio
						className={classes.radio}
						checked={type === PREVIEW_TYPE_DESKTOP}
						onChange={() => handleChange(PREVIEW_TYPE_DESKTOP)}
						value={PREVIEW_TYPE_DESKTOP}
						color="default"
						name="layout"
						icon={<img src={IconDesktopOn}/>}
						checkedIcon={<img src={IconDesktopOff}/>}
					/>
					{isPressRelease &&
						<Radio
							className={classes.radio}
							checked={type === PREVIEW_TYPE_PDF}
							value={PREVIEW_TYPE_PDF}
							onChange={() => handleChange(PREVIEW_TYPE_PDF)}
							color="default"
							name="layout"
							icon={<img src={IconPDFOn}/>}
							checkedIcon={<img src={IconPDFOff}/>}
						/>}
					<Radio
						className={classes.radio}
						checked={type === PREVIEW_TYPE_MOBILE}
						value={PREVIEW_TYPE_MOBILE}
						onChange={() => handleChange(PREVIEW_TYPE_MOBILE)}
						color="default"
						name="layout"
						icon={<img src={IconMobileOn}/>}
						checkedIcon={<img src={IconMobileOff}/>}
					/>
				</RadioGroup>

				<div className={classes.button}>
					<FormControlLabel
						control={
							<Checkbox
								id="js-sw-visibility"
								checked={grid}
								onChange={() => setGrid(!grid)}
								value="checkedA"
								color={"primary"}
							/>
						}
						label={<Typography className={classes.formControlLabel}>グリッド</Typography>}
					/>
				</div>

				{isPressRelease &&
					<>
						<Button className={classNames(classes.button, "js-fetchStore")}
								onClick={() => openPreviewDialog(PREVIEW_TYPE_DESKTOP)}>
							プレビュー
						</Button>

						{/*< Button className = {*/}
						{/*	classNames(classes*/}
						{/*	.button,*/}
						{/*	"js-fetchStore")} onClick={()=>openPreviewDialog(PREVIEW_TYPE_PDF_MEDIA)}>*/}
						{/*メディア専用PDF プレビュー*/}
						{/*</Button>*/}
					</>
				}

			</div>

			{isPressRelease ?
				modalOpen ?
					<>
						<NewWindow
							url={`//${window.location.host}/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/check/`}
							onUnload={() => setModalOpen(false)}
							features={{ width: 1280, height: 500 }}
						/>
					</>
					:
					<div className={classNames(style.aiCheckButton, "js-fetchStore")} onClick={handleAiCheck}>
						<img src={iconRobot} className={classes.icon}/><Typography variant={"h6"} className={classes.ai}>AIチェック</Typography><img src={IconExpand} className={style.expand}/>
					</div>
			: null}
			<PreviewDialog isHistory={false} isOpen={previewDialog} closeHandle={()=>setPreviewDialog(false)} defaultLayout={PREVIEW_TYPE_DESKTOP}/>
		</div>
	);
};

const useStyles = makeStyles({
	buttonGroup: {
		width: 32,
		height: 32,
		border: "none",
		backgroundColor: "#525855",
		"&:hover": {
			backgroundColor: "#000",
		}
	},
	radioGroup: {
		padding: 0,
		marginLeft: "10px",
		display: "block",
		backgroundColor: "#525855",
		borderRadius: "4px",
	},
	button: {
		color: "#fff",
		fontSize: 12,
		padding:"0 10px",
		marginLeft: "10px",
		display: "block",
		backgroundColor: "#525855",
		borderRadius: "4px",
		"&:hover": {
			backgroundColor: "#000",
		},
	},
	radio: {
		padding: 5,
		width: 30
	},
	formControlLabel: {
		color: "#fff",
	},
	icon: {
		marginRight: 10
	},
	ai:{
		color: "#fff",
		lineHeight: 3
	},
});


export default DoButtonGroup;
