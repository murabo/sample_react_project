import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";

// component
import { Divider, Button, IconButton, Menu, MenuItem, Typography, InputLabel, Select, FormControl } from "@material-ui/core/";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PreviewDialog from '../PreviewDialog';
import FixedPhrase from '../FixedPhrase';
import MailText from "../MailText";

//img
import ImageEllipsis from "../../../../../assets/icon_ellipsis.svg";


// style
import style from "./main.module.scss";

// model
import { ReserveCustomModel } from "../../../../../model/PressReleaseReserveModel";

// actions
import * as ActionCreators from "../../../../../actions/PressReleaseReserve/ActionCreator";
import * as CompanyActionCreators from "../../../../../actions/Company/ActionCreator";

// state
import {RootState} from "../../../../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;
const companySelector = (state: RootState) => state.company;
const memberSelector = (state: RootState) => state.member;

interface ContentsProps {
	item: ReserveCustomModel,
    isAllOpen: boolean
}

const useStyles = makeStyles({
	summary: {
		padding: '0 10px'
	},
	preview: {
		marginLeft: "auto"
	},
	header: {
		width: "100%",
		padding: 10
	},
	text: {
		padding: 10,
		minHeight: 200
	},
	send: {
		padding: '0px 10px;',
	}
});


const Main: React.FC<ContentsProps> = ({item, isAllOpen}) => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const pressRelease = useSelector(pressReleaseSelector);
    const reserve = useSelector(pressReleaseReserveSelector);
	const company = useSelector(companySelector);
	const member = useSelector(memberSelector);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuTarget, setMenuTarget] = React.useState<null | string>('from_email');
    const [anchorTempleMenu, setAnchorTempleMenu] = React.useState<null | HTMLElement>(null);
	const [preview, setPreview] = React.useState<boolean>(false);

	useEffect(() => {
		// // setCategoryDialog(true)
		// //　初期値
		if (reserve.data.fetched === true && company.email) {
			if (!item.from_email) {
				dispatch(ActionCreators.setPressReleaseReserveCustom.request({id: item.id, from_email: company.email}));
			}
			if (!item.mail_title) {
				dispatch(ActionCreators.setPressReleaseReserveCustom.request({id: item.id, mail_title: pressRelease.detail.name}));
			}
		}
	}, [reserve.data.fetched, company]);



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
    	if (item.id) {
			const id = reserve.active === item.id? "" : item.id
			dispatch(ActionCreators.setPressReleaseReserveActive.request(id));
		}
    };

	const handleCopyClick = () => {
		if (menuTarget) dispatch(ActionCreators.setPressReleaseReserveCopy.request({key: menuTarget, value: item[menuTarget]}));
        setAnchorEl(null);
	};

    const handleEmailChange = (event) => {
        const target:any = event.target
        dispatch(ActionCreators.setPressReleaseReserveCustom.request({id:item.id, [target.name]: target.value}));
    };

    let isExpanded = false

	if (isAllOpen) {
        isExpanded = true
	} else {
        isExpanded = reserve.active === item.id? true: false
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
					id="panel1a-header">
					<Typography variant="h6" className={classes.summary}>{item.name}&nbsp;{item.last_name}&nbsp;{item.first_name}</Typography>
					{isExpanded && <Button color="primary" onClick={()=> setPreview(true)} className={classes.preview}>プレビュー</Button>}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
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
									value={item.from_email || company.email}
									onChange={handleEmailChange}
									name="from_email">
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
									   value={item.mail_title || ""}
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
									{item.name}<br/>
									{item.publisher && <>{item.publisher}<br/></>}
									{item.department && <>{item.department}<br/></>}
									{item.position && <>{item.position}<br/></>}
									{item.last_name} {item.first_name}様
								</Typography>
								<TextField multiline
										   className={classes.text}
										   type="textarea"
										   name="mail_body"
										   placeholder="本文"
										   onChange={handleEmailChange}
										   value={item.mail_body || ""}
										   error={!item.mail_body}
								/>
								<MailText name={pressRelease.detail.name}
										  pdf={pressRelease.detail.pdf}
										  date={reserve.data.released_at}
										  prefix={company.prefix}/>
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
			<PreviewDialog isAuto={false} isOpen={preview} closeHandle={()=> setPreview(false)} id={item.id}/>
		</div>

	);
}

export default Main;

