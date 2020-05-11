import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as config from "../../../../config/panel_type";
import * as pageConfig from "../../../../config/page_type";

import Block from "../../../Common/Editor/Manager/Block";
import Comment from "./Commnet";
import History from "./History";
import Info from "./Info";
import Email from "./Email";
import ActiveLog from "./ActiveLog";
import Member from "./Member";

import {RadioGroup, FormControl, makeStyles, Tooltip} from "@material-ui/core/";
import Radio from "@material-ui/core/Radio";

//action
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

//img
import IconInfoOff from "../../../../assets/editor/panel_info_off.svg";
import IconInfoOn from "../../../../assets/editor/panel_info_on.svg";
import IconHistoryOff from "../../../../assets/editor/panel_history_off.svg";
import IconHistoryOn from "../../../../assets/editor/panel_history_on.svg";
import IconCommentOff from "../../../../assets/editor/panel_comment_off.svg";
import IconCommentOn from "../../../../assets/editor/panel_comment_on.svg";
import IconPartsOff from "../../../../assets/editor/panel_parts_off.svg";
import IconPartsOn from "../../../../assets/editor/panel_parts_on.svg";
import IconUserOff from "../../../../assets/editor/panel_user_off.svg";
import IconUserOn from "../../../../assets/editor/panel_user_on.svg";

// state
import { RootState } from "../../../../reducers";
import IconMail from "../../../../assets/icon_mail.svg";

const pressReleaseSelector = (state: RootState) => state.pressRelease;

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
		borderLeft: "0.1rem solid #E2E9E5;",
		marginLeft: "auto",
		minWidth: 362,
		zIndex: 1,
		boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2)"
	},
	inner: {
		overflowY: 'scroll',
		height: "calc(100vh - 70px)"
	},
	menu: {
		background: "#616763",
		width: 50,
	},
	content: {
		width: "31.2rem",
		background: "#e2e9e5e0",
		height: "100vh",
		overflow: "hidden"
	},
	radio: {
		borderRadius: 4,
		transition: "none",
		margin: "5px auto",
		"&:hover": {
			backgroundColor: "none",
		},
	},
	checked: {
		background: "#3A3D3B",
	}
});

interface IProps {
	editor?: any,
	pageType: string
}

const Panel: React.FC<IProps> = ({ editor, pageType }) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const [switchPanel, setSwitchPanel] = React.useState(config.PANEL_TYPE_INFO);
	const pressRelease = useSelector(pressReleaseSelector);

	const element = document.querySelector(".gjs-blocks-cs") as HTMLInputElement

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSwitchPanel(value);

		if (element) {
			if (value === config.PANEL_TYPE_EDITOR) {
				element.style.visibility  = "visible";
			} else {
				element.style.visibility = "hidden";
			}
		}
		fetchData(value);
	};

	useEffect(() => {
		init()
	}, [pressRelease.detail.fetched]);


	const fetchData = (value) => {
		switch (value) {
			case config.PANEL_TYPE_COMMENT:
				dispatch(PressReleaseActionCreators.getPressReleaseCommentList.request());
				break;
			case config.PANEL_TYPE_HISTORY:
				dispatch(PressReleaseActionCreators.getPressReleaseHistory.request());
				break;
            case config.PANEL_TYPE_ACTIVE_LOG:
                dispatch(PressReleaseActionCreators.getPressReleaseReviewList.request({offset: 0}));
                break;
		}
	};

	const init = () => {
		let panel = ''

		switch (pageType) {
			case pageConfig.PAGE_DETAIL:
				panel = config.PANEL_TYPE_INFO
				break;
			case pageConfig.PAGE_EDIT:
				panel = config.PANEL_TYPE_EDITOR
				break;
			case pageConfig.PAGE_DIFF:
				panel = config.PANEL_TYPE_COMMENT
				break;
			case pageConfig.PAGE_REVIEW:
				// element.style.visibility = "hidden";
				panel = config.PANEL_TYPE_COMMENT
				break;
		}
		setSwitchPanel(panel)
		fetchData(panel)

	};

	const block = <Tooltip title="ブロック" arrow><Radio
		classes={{ root: classes.radio, checked: classes.checked }}
		checked={switchPanel === config.PANEL_TYPE_EDITOR}
		onChange={handleChange}
		value={config.PANEL_TYPE_EDITOR}
		color="default"
		name="layout"
		icon={<img src={IconPartsOff}/>}
		checkedIcon={<img src={IconPartsOn}/>}
	/></Tooltip>;

	const info = <Tooltip title="プロパティ" arrow><Radio
		classes={{ root: classes.radio, checked: classes.checked }}
		checked={switchPanel === config.PANEL_TYPE_INFO}
		onChange={handleChange}
		value={config.PANEL_TYPE_INFO}
		color="default"
		name="layout"
		icon={<img src={IconInfoOff}/>}
		checkedIcon={<img src={IconInfoOn}/>}
	/></Tooltip>;

	const log = <Tooltip title="ログ" arrow><Radio
		classes={{ root: classes.radio, checked: classes.checked }}
		className={classes.radio}
		checked={switchPanel === config.PANEL_TYPE_ACTIVE_LOG}
		onChange={handleChange}
		value={config.PANEL_TYPE_ACTIVE_LOG}
		color="default"
		name="layout"
		icon={<img src={IconHistoryOff}/>}
		checkedIcon={<img src={IconHistoryOn}/>}
	/></Tooltip>;

	const history = <Tooltip title="作業履歴" arrow><Radio
		classes={{ root: classes.radio, checked: classes.checked }}
		checked={switchPanel === config.PANEL_TYPE_HISTORY}
		onChange={handleChange}
		value={config.PANEL_TYPE_HISTORY}
		color="default"
		name="layout"
		icon={<img src={IconHistoryOff}/>}
		checkedIcon={<img src={IconHistoryOn}/>}
	/></Tooltip>;

	const comment = <Tooltip title="コメント" arrow><Radio
		classes={{ root: classes.radio, checked: classes.checked }}
		checked={switchPanel === config.PANEL_TYPE_COMMENT}
		onChange={handleChange}
		value={config.PANEL_TYPE_COMMENT}
		color="default"
		name="layout"
		icon={<img src={IconCommentOn}/>}
		checkedIcon={<img src={IconCommentOff}/>}
	/></Tooltip>;

	const member = <Tooltip title="メンバー" arrow><Radio
		classes={{ root: classes.radio, checked: classes.checked }}
		checked={switchPanel === config.PANEL_TYPE_MEMBER}
		onChange={handleChange}
		value={config.PANEL_TYPE_MEMBER}
		color="default"
		name="layout"
		icon={<img src={IconUserOn}/>}
		checkedIcon={<img src={IconUserOff}/>}
	/></Tooltip>;

	let html: any = "";

	switch (pageType) {
		case pageConfig.PAGE_DETAIL:
			html = <RadioGroup className={classes.menu}>
				{info}
				{member}
				{/*{email}*/}
			</RadioGroup>;
			break;
		case pageConfig.PAGE_EDIT:
			html = <RadioGroup className={classes.menu}>
				{block}
				{comment}
				{pressRelease.detail.press_id && info}
				{history}
				{member}
			</RadioGroup>;
			break;
		case pageConfig.PAGE_DIFF:
			html = <RadioGroup className={classes.menu}>
				{comment}
				{info}
				{member}
			</RadioGroup>;
			break;
		case pageConfig.PAGE_REVIEW:
			html = <RadioGroup className={classes.menu}>
				{comment}
				{info}
				{member}
			</RadioGroup>;
			break;
	}

	return (
		<FormControl className={classes.root} id="panelTab">
			<div className={classes.content}>
				<PanelContent type={switchPanel} editor={editor}/>
			</div>
			{html}
		</FormControl>
	);
};

export default Panel;

interface ListLayoutItemsProps {
	type: string,
	editor: any,
}

const PanelContent: React.FC<ListLayoutItemsProps> = ({ type, editor }) => {

	const classes = useStyles();

	let html: any = "";
	switch (type) {
		case config.PANEL_TYPE_EDITOR:
			html = <Block editor={editor}/>;
			break;
		case config.PANEL_TYPE_INFO:
			html = <div className={classes.inner}><Info/></div>;
			break;
		case config.PANEL_TYPE_COMMENT:
			html = <div className={classes.inner}><Comment/></div>;
			break;
		case config.PANEL_TYPE_HISTORY:
			html = <div className={classes.inner}><History/></div>;
			break;
		case config.PANEL_TYPE_EMAIL:
			html = <div className={classes.inner}><Email/></div>;
			break;
		case config.PANEL_TYPE_ACTIVE_LOG:
			html = <div className={classes.inner}><ActiveLog/></div>;
			break;
		case config.PANEL_TYPE_MEMBER:
			html = <div className={classes.inner}><Member/></div>;
			break;

	}

	return (
		<div>
			{html}
		</div>
	);
};
