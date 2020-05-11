import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PANEL_TYPE_INFO, PANEL_TYPE_HISTORY, PANEL_TYPE_EDITOR} from "../../../../config/panel_type";

import Block from "../../../Common/Editor/Manager/Block";
import { RadioGroup, FormControl, IconButton, makeStyles } from "@material-ui/core/";
import Radio, { RadioProps } from '@material-ui/core/Radio';

//action
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

//img
import IconHistoryOff from "../../../../assets/editor/panel_history_off.svg";
import IconHistoryOn from "../../../../assets/editor/panel_history_on.svg";
import IconPartsOff from "../../../../assets/editor/panel_parts_off.svg";
import IconPartsOn from "../../../../assets/editor/panel_parts_on.svg";

// state
import { RootState } from "../../../../reducers";
const blockSelector = (state: RootState) => state.block;
const pressKitSelector = (state: RootState) => state.pressKit;

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'row',
		height: '100vh',
		borderLeft: '0.1rem solid #E2E9E5;',
		marginLeft: 'auto'
	},
	menu: {
		background: '#616763',
		width: '4.8rem'
	},
	content: {
		width: '31.2rem',
		background: '#F3F7F4',
	},
	radio: {
		borderRadius: '0.4rem',
		transition: 'none',
		margin: '0.5rem auto',
		'&:hover': {
			backgroundColor: 'none',
		}
	},
	checked: {
		background: '#3A3D3B'
	}
});

interface IProps {
	editor?: any,
    isPreview: boolean,
    panelIndex?: string
}

const Panel: React.FC<IProps> = ({editor, isPreview, panelIndex}) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const [switchPanel, setSwitchPanel] = React.useState(PANEL_TYPE_EDITOR);
    const pressKit = useSelector(pressKitSelector);;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSwitchPanel(value);
		const element = document.querySelector('.gjs-blocks-cs')
		if (element){
			if (value === PANEL_TYPE_EDITOR) {
				(element as HTMLInputElement).style.visibility = 'visible'
			} else {
				(element as HTMLInputElement).style.visibility = 'hidden'
			}
		}
		fetchData(value)
	};


	useEffect(() => {
		if(pressKit.detail.fetched) fetchData(switchPanel)
	}, [pressKit.detail.fetched]);


	const fetchData =  (value) => {
		switch(value) {
			case PANEL_TYPE_HISTORY:
				dispatch(PressReleaseActionCreators.getPressReleaseHistory.request())
				break;
		}
	}

	return (
		<FormControl className={classes.root} id="panelTab">
			<div className={classes.content}>
				<PanelContent type={switchPanel} editor={editor} isPreview={isPreview}/>
			</div>
			<RadioGroup className={classes.menu}>
				{ (editor && !isPreview) &&
				<Radio
					classes={{root: classes.radio, checked: classes.checked}}
					checked={switchPanel === PANEL_TYPE_EDITOR}
					onChange={handleChange}
					value={PANEL_TYPE_EDITOR}
					color="default"
					name="layout"
					icon={<img src={IconPartsOff}/>}
					checkedIcon={<img src={IconPartsOn}/>}
				/>}
				{/*<Radio*/}
				{/*	classes={{root: classes.radio, checked: classes.checked}}*/}
				{/*	checked={switchPanel === PANEL_TYPE_HISTORY}*/}
				{/*	onChange={handleChange}*/}
				{/*	value={PANEL_TYPE_HISTORY}*/}
				{/*	color="default"*/}
				{/*	name="layout"*/}
				{/*	icon={<img src={IconHistoryOff}/>}*/}
				{/*	checkedIcon={<img src={IconHistoryOn}/>}*/}
				{/*/>*/}
			</RadioGroup>

		</FormControl>
	);
};

export default Panel;



interface ListLayoutItemsProps {
	type: string,
	editor: any,
    isPreview: boolean
}

const PanelContent: React.FC<ListLayoutItemsProps> = ({ type, editor, isPreview }) => {

	let html:any = ''
	switch(type) {
		case PANEL_TYPE_EDITOR:
			html = (editor && !isPreview) ? <Block editor={editor}/> : ''
			break;
	}

	return (
		<div>
			{html}
		</div>
	);
}
