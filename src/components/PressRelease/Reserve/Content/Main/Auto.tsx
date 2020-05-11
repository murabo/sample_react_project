import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import {
	InputLabel,
	Divider,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	makeStyles,
	DialogContent, Select, FormControl,
} from "@material-ui/core/";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PreviewDialog from '../PreviewDialog';
import MediaSelectDialog from '../MediaSelectDialog';
import FixedPhrase from '../FixedPhrase';
import MailText from "../MailText";

//img
import ImageEllipsis from "../../../../../assets/icon_ellipsis.svg";

// style
import style from "./main.module.scss";

// actions
import * as ActionCreators from "../../../../../actions/PressReleaseReserve/ActionCreator";

// state
import {RootState} from "../../../../../reducers";
import * as MediaActionCreators from "../../../../../actions/Media/ActionCreator";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;
const companySelector = (state: RootState) => state.company;
const memberSelector = (state: RootState) => state.member;
const mediaSelector = (state: RootState) => state.media;

interface ContentsProps {
    isAllOpen: boolean
}

const useStyles = makeStyles({
	summary: {
		padding: '0 10px'
	},
	action: {
		marginLeft: "auto"
	},
	preview: {
		marginLeft: 10
	},
	header: {
		width: "100%",
		padding: 10
	},
	text: {
		padding: 10,
	},
	textareaField: {
		paddingTop: 20,
		minHeight: 200
	},
	send: {
		padding: '0px 10px;',
	}
});

const Main: React.FC<ContentsProps> = ({isAllOpen}) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const pressRelease = useSelector(pressReleaseSelector);
    const reserve = useSelector(pressReleaseReserveSelector);
	const company = useSelector(companySelector);
	const member = useSelector(memberSelector);
	const media = useSelector(mediaSelector);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuTarget, setMenuTarget] = React.useState<null | string>('from_email');
    const [anchorTempleMenu, setAnchorTempleMenu] = React.useState<null | HTMLElement>(null);
	const [mediaSelect, setMediaSelectDialog] = React.useState<boolean>(false);
	const [preview, setPreview] = React.useState<boolean>(false);

	useEffect(() => {
		// // setCategoryDialog(true)
		// //　初期値
		if (reserve.data.fetched === true && company.email) {
			if (!reserve.data.auto.from_email) {
				dispatch(ActionCreators.setPressReleaseReserveAuto.request({from_email: company.email}));
			}
			if (!reserve.data.auto.mail_title) {
				dispatch(ActionCreators.setPressReleaseReserveAuto.request({mail_title: pressRelease.detail.name}));
			}
		}
	}, [reserve.data.fetched, company]);

	const handleCheckMedia= () => {
		setMediaSelectDialog(true)
		if (!media.allList.results.length) dispatch(MediaActionCreators.getMediaAllList.request({offset: 0, limit: 1500}));
	};

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, target: string) => {
		setAnchorEl(event.currentTarget);
        setMenuTarget(target)
	};
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenTemplateMenu =(event: React.MouseEvent<HTMLLIElement>) => {
        handleCloseMenu()
    	setAnchorTempleMenu(event.currentTarget);
    };

    const handleListItemClick = () => {
		const id = reserve.active === "0" ? "" : "0"
		dispatch(ActionCreators.setPressReleaseReserveActive.request(id || ""));
    };

	const handleCopyClick = () => {
		if (menuTarget) dispatch(ActionCreators.setPressReleaseReserveCopy.request({key: menuTarget, value: reserve.data.auto[menuTarget]}));
        setAnchorEl(null);
	};

	const handleEmailChange = (event) => {
        const target:any = event.target
        dispatch(ActionCreators.setPressReleaseReserveAuto.request({[target.name]: target.value}));
    };

    let isExpanded = false
	if (isAllOpen) {
        isExpanded = true
	} else {
        isExpanded = reserve.active === '0' ? true: false
	}

    return (
		<div className={style.root}>
			<ExpansionPanel
				square
				expanded={isExpanded}
				onChange={handleListItemClick}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography variant="h6" className={classes.summary}>自動選定({reserve.data.auto.id_list.length}件)</Typography>
					{isExpanded &&
						<div className={classes.action}>
							<Button variant="outlined" color="primary" size={"large"} onClick={handleCheckMedia}>
								配信先確認
							</Button>
							<Button className={classes.preview} color="primary" onClick={()=> setPreview(true)}>プレビュー</Button>
						</div>
					}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					{/*<MediaSelect/>*/}
					<ul className={style.form}>
						<li>
							<IconButton
								onClick={event => handleOpenMenu(event, 'from_email')}
								className={style.iconMenu}>
								<img src={ImageEllipsis}/>
							</IconButton>
							<InputLabel>送信元</InputLabel>
							<FormControl variant="outlined" className={classes.header}>
								<Select
									value={reserve.data.auto.from_email || company.email}
									onChange={handleEmailChange}
									name="from_email"
								>
									<MenuItem value={company.email}>{company.email}<span className={style.name}>企業アドレス</span></MenuItem>
									{member.list.results.map( (user, key) =>
										<MenuItem value={user.email} key={key}>
											{user.email}
											<span className={style.name}>{user.last_name}{user.first_name}</span>
										</MenuItem>
									)}
								</Select>
							</FormControl>
						</li>
						<li>
							<IconButton
								onClick={event => handleOpenMenu(event, 'mail_title')}
								className={style.iconMenu}>
								<img src={ImageEllipsis}/>
							</IconButton>
							<InputLabel>件名</InputLabel>
							<TextField multiline
									   className={classes.header}
									   variant="outlined"
									   type="textarea"
									   name="mail_title"
									   placeholder="〇〇のお知らせ"
									   onChange={handleEmailChange}
									   value={reserve.data.auto.mail_title || ""}
							/>
						</li>
						<li>
							<IconButton
								onClick={event => handleOpenMenu(event, 'mail_body')}
								className={style.iconMenu}>
								<img src={ImageEllipsis}/>
							</IconButton>
							<InputLabel>本文</InputLabel>
							<div className={style.main}>
								<Typography variant={"body1"} className={classes.send}>
									〇〇株式会社<br/>
									〇〇 〇〇様　(自動挿入)
								</Typography>
								<TextField multiline
										   className={classes.text}
										   type="textarea"
										   name="mail_body"
										   placeholder="お世話になっております。&#13;&#10;株式会社〇〇の〇〇と申します。&#13;&#10;リリース内容の概要.."
										   onChange={handleEmailChange}
										   value={reserve.data.auto.mail_body || ""}
										   error={!reserve.data.auto.mail_body}
										   InputProps={{
											   classes: {
												   input: classes.textareaField,
											   },
										   }}
								/>
								<MailText name={pressRelease.detail.name}
										  pdf={pressRelease.detail.pdf}
										  date={reserve.data.released_at}
										  prefix={company.prefix}
								/>
							</div>
						</li>
					</ul>
					<Menu
						elevation={1}
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleCloseMenu}
						className={style.popupMenu}
					>
						<MenuItem onClick={()=> {
                            handleCopyClick()
                        }}>
							他のメールにコピー
						</MenuItem>
						{menuTarget === 'mail_body' &&
						<MenuItem onClick={event => handleOpenTemplateMenu(event)}>
							サンプル定型文
						</MenuItem>}
					</Menu>

					<Menu
						elevation={1}
						anchorEl={anchorTempleMenu}
						open={Boolean(anchorTempleMenu)}
						onClose={()=>setAnchorTempleMenu(null)}
						className={style.popupMenu}
					>
						<FixedPhrase/>
					</Menu>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<MediaSelectDialog isOpen={mediaSelect} closeHandle={()=>setMediaSelectDialog(false)}/>
			<PreviewDialog isAuto={true} isOpen={preview} closeHandle={()=> setPreview(false)} id=""/>
		</div>

	);
}

export default Main;

