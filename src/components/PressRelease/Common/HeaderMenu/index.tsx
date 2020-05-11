import React, { useEffect } from "react";
import { push } from 'connected-react-router'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

import { checkEditAuthority } from "../../../../util/checkAuthority";

// img
import IconEllipsis from "../../../../assets/icon_ellipsis.svg";
import IconEdit from "../../../../assets/editor/icon_edit.svg";

// action
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";
import * as ActionCreators from "../../../../actions/PressReleaseReserve/ActionCreator";
import * as PressReleasePublishActionCreators from "../../../../actions/PressReleasePublish/ActionCreator";

// component
import Avatar from "../../../Common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import { exportFile } from "../../../../util/File";
import PreviewDialog from "../../../Common/PreviewDialog";
import ReviewResultDialog from "../ReviewResultDialog";
import NameDialog from "../NameDialog";
import AppDialog from "../../../Common/AppDialog";
import { Box, IconButton } from "@material-ui/core";
import ReviewRequestDialog from "../ReviewRequestDialog";
import ShareDialog from "../ShareDialog";
import Progress from "../../../Common/Progress";

//style
import style from "./header_menu.module.scss";

// conf
import { PAGE_EDIT, PAGE_REVIEW, PAGE_DIFF, PAGE_DETAIL, PAGE_RESERVE } from "../../../../config/page_type";


const meSelector = (state: RootState) => state.me;
const pressGroupSelector = (state: RootState) => state.group;
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const PressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;


const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props: MenuProps) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

const isDevelop = window.location.hostname === "localhost" ? true : false;

const useStyles = makeStyles({
	button: {
		padding: "0",
	},
	arrow: {
		borderLeft: "0.1rem solid rgba(255, 255, 255, 0.3);",
		padding: "5px 1rem",
	},
	buttonText: {
		padding: "5px 1rem",
	},
	textareaField: {
		width: 400,
		marginRight: 10
	},
	editIcon: {
		padding: 0,
		marginLeft: 10,
		minHeight: 10
	}
});

interface IProps {
	page: string
}


const HeaderMenu: React.FC<IProps> = ({ page }) => {

	const dispatch = useDispatch();
	const classes = useStyles();
	const [menu, setMenuEl] = React.useState<null | HTMLElement>(null);
	const [nameDialog, setNameDialog] = React.useState(false);
	const [editName, setEditName] = React.useState(false);

	const [previewDialog, setPreviewDialog] = React.useState(false);
	const [reviewPreviewDialog, setReviewPreviewDialog] = React.useState(false);

	const [reviewRequestDialog, setReviewRequestDialog] = React.useState(false);
	const [reviewResultDialog, setReviewResultDialog] = React.useState(false);

	const [reserveReviewRequestDialog, setReserveReviewRequestDialog] = React.useState(false);
	const [reserveReviewResultDialog, setReserveReviewResultDialog] = React.useState(false);

	const [shareDialog, setShareDialog] = React.useState(false);
	const [editAlertDialog, setEditAlertDialog] = React.useState(false);
	const [reviewAlertDialog, setReviewAlertDialog] = React.useState(false);
	const [reserveReviewAlertDialog, setReserveReviewAlertDialog] = React.useState(false);
	const [reserveDeleteAlertDialog, setReserveDeleteAlertDialog] = React.useState(false);

	const group = useSelector(pressGroupSelector);
	const pressRelease = useSelector(pressReleaseSelector);
	const pressReleaseReserve = useSelector(PressReleaseReserveSelector);

	const {auto, custom} = pressReleaseReserve.data

	const me = useSelector(meSelector);
	const status = pressRelease.detail.status;


	const handleOpenShareDialog = () => {
		setShareDialog(true);
	};

	const handleTemplateSave = () => {
		exportFile({
			body: pressRelease.detail.body,
		});
	};

	const handleOpenPreviewDialog = () => {
		setPreviewDialog(true);
	};

	const handleClosePreviewDialog = () => {
		setPreviewDialog(false);
	};

	// プレスリリース名変更
	const handleSaveName= (name) => {
		if (pressRelease.detail.press_id) {
			dispatch(PressReleaseActionCreators.patchPressReleaseInfo.request({name}));
			setNameDialog(false)
		} else {
			handleNewSave(name)
		}
	};

	// プレスリリース新規保存
	const handleNewSave = (name) => {
		dispatch(PressReleaseActionCreators.postPressReleaseDetails.request({name: name, isDiff:false, isReview:false}));
		setNameDialog(false)
	};

	// プレスリリース保存
	const handleSave = (isDiff, isReview) => {
		if (pressRelease.detail.press_id) {
			dispatch(PressReleaseActionCreators.postPressReleaseDetails.request({ isDiff, isReview }));
		} else {
			setNameDialog(true)
		}
	};

	// プレスリリース承認申請
	const handleRequestReview = (selectUser, date, comment) => {
		dispatch(PressReleaseActionCreators.postPressReleaseReviewRequest.request({
			members_list: selectUser,
			deadline_at: date,
			comment: comment,
		}));
		dispatch(push(`/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/`))
	};

	// プレスリリース承認申請取り下げ
	const handleDeleteRequestReview = () => {
		dispatch(PressReleaseActionCreators.deletePressReleaseReviewRequest.request());
		setReviewAlertDialog(false)
	};

	// 配信保存
	const handleReserveSave = () => {
		dispatch(ActionCreators.postPressReleaseReserve.request({
			reviewer: [],
			comment:  '',
		} ));
		dispatch(PressReleasePublishActionCreators.postPressReleasePublish.request());
		dispatch(PressReleasePublishActionCreators.postPressReleaseOgp.request());
	};

	// 配信承認申請
	const handleReserveReviewRequest = (selectUser:[], date:Date, comment:string) => {
		dispatch(ActionCreators.postPressReleaseReserve.request({
			reviewer: selectUser,
			deadline_at: date,
			comment: comment
		} ));
	};

	// 配信承認申請取り下げ
	const handleDeleteReserveReview = () => {
		dispatch(ActionCreators.deletePressReleaseReserve.request())
		setReserveReviewAlertDialog(false)
	};

	// 編集状態に戻す
	const handleEditRequest = () => {
		// TODO
		dispatch(ActionCreators.deletePressReleaseReserve.request())
		setReserveReviewAlertDialog(false)
	};


	let link = "";
	if (page === PAGE_DETAIL) {
		link = `/press_release/`;
	} else {
		link = pressRelease.detail.press_id ? `/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/` : `/create/press_release/`;
	}

	// プレスリリース編集権限
	let hasEdit =  checkEditAuthority(pressRelease, me)

	// 校閲権限
	let hasReview = (pressRelease.detail.review.member || []).filter(member => member.user.uuid === me.uuid);
	// 配信予約承認権限
	let hasReserveReview = (pressReleaseReserve.data.reviewer || []).filter(member => member.uuid === me.uuid);

	// 予約画面入力チェック
	const customDataErr = custom
		.filter(item => item.is_send).filter(data => {
			return !data.mail_title || !data.mail_body || !data.from_email
	})
	const DisabledCustomDataCheck = customDataErr.length ? true: false;
	let DisabledAutoDataCheck = false;
	if (auto.is_send && (auto.id_list.lenght === 0 || !auto.mail_title || !auto.mail_body || !auto.from_email)){
		DisabledAutoDataCheck = true
	}

	const createDetailAction = () => {
		let action: any = "";
		switch (status) {
			case 0:
			case 2:
				if (hasEdit) {
					action =
						<>
							<a href={`/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/edit/`}>
								<Button variant="outlined" size="large" color="primary">
									編集
								</Button>
							</a>
							<Button
								variant="contained"
								color="primary"
								size="large"
								onClick={()=>setReviewPreviewDialog(true)}>
								承認依頼
							</Button>
						</>;
				}
				break;
			case 1:
				if (hasReview.length && hasReview.status == null) {
					action =
						<a href={`/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}/review/`}>
							<Button variant="contained" size="large" color="primary">
								校閲
							</Button>
						</a>;
				}
				break;
			case 3:
			case 6:
				if (hasEdit) {
					action = <>
						<a href={`/press_release/${group.selectedId}/reserve/${pressRelease.detail.press_id}/`}>
							<Button variant="contained" size="large" color="primary">
								配信設定
							</Button>
						</a>
					</>;
				}
				break;
			case 5:
			case 7:
			case 8:
				action = <>
					<a href={`/press_release/${group.selectedId}/reserve/${pressRelease.detail.press_id}/`}>
						<Button variant="contained" size="large" color="primary">
							配信確認
						</Button>
					</a>
				</>;
				break;
			default:
				break;
		}

		return <>
			{action}
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="outlined"
				color="default"
				size="large"
				className={classes.button}
				onClick={event => setMenuEl(event.currentTarget)}
			>
				<img src={IconEllipsis}/>
			</Button>
		</>;
	};


	const createActions = () => {
		let act: any = "";

		switch (page) {
			case PAGE_DETAIL:
				act = createDetailAction();
				break;

			case PAGE_EDIT:
				act = <>
					{isDevelop &&
						<Button variant="outlined" size="large" color="primary" onClick={() => handleTemplateSave()}>
							<p className='js-fetchStore'>テンプレ保存(local)</p>
						</Button>
					}
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => handleSave(false, false)}
						className={classNames(classes.buttonText, "js-fetchStore")}
					>保存
					</Button>
					{pressRelease.detail.press_id ?
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={()=>setReviewPreviewDialog(true)}>
							承認依頼
						</Button>
						: null}
				</>;
				break;

			case PAGE_DIFF:
				if (hasEdit) {
					act = <>
						{/*<Button*/}
						{/*	variant="outlined"*/}
						{/*	color="primary"*/}
						{/*	size="large"*/}
						{/*	onClick={() => handleSave(true, false)}*/}
						{/*	className={classNames(classes.buttonText, "js-fetchStore")}>*/}
						{/*	保存*/}
						{/*</Button>*/}
					</>;
				}
				break;
			case PAGE_REVIEW:
				act = <>
						<Button
							variant="outlined"
							color="primary"
							size="large"
							onClick={() => handleSave(false, true)}
							className={classNames(classes.buttonText, "js-fetchStore")}
						>一時保存
						</Button>
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => {
								handleSave(false, true)
								setReviewResultDialog(true)}
							}
							className={classNames(classes.buttonText, "js-fetchStore")}
						>校閲終了する
						</Button>
					</>;
				break;
			case PAGE_RESERVE:
				if (hasEdit && (status === 3  || status === 6)) {
					act = <>
							<Button variant="outlined" size="large" color="primary" onClick={handleReserveSave}>
								保存
							</Button>
							<Button variant="contained" size="large" color="primary" onClick={
								()=>setReserveReviewRequestDialog(true)
							} disabled={DisabledCustomDataCheck || DisabledAutoDataCheck}>承認依頼
							</Button>
						</>
				} else if (hasReserveReview.length && status === 5) {
					act = <Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => setReserveReviewResultDialog(true)}
							className={classNames(classes.buttonText, "js-fetchStore")}>承認・差し戻し
						</Button>
				}
				act = <Box className={style.actions}>
							{act}
							<Button
								aria-controls="customized-menu"
								aria-haspopup="true"
								variant="outlined"
								color="default"
								size="large"
								className={classes.button}
								onClick={event => setMenuEl(event.currentTarget)}
							>
								<img src={IconEllipsis}/>
							</Button>
						</Box>
				break;
		}
		return act;
	};

	const createPageTitle = () => {
		let title: any = "";

		switch (page) {
			case PAGE_DETAIL:
				title = "プレスリリース";
				break;
			case PAGE_EDIT:
				title = "プレスリリース作成";
				break;
			case PAGE_DIFF:
				title = "校閲確認中";
				break;
			case PAGE_REVIEW:
				title = "校閲中";
				break;
			case PAGE_RESERVE:
				title = "配信設定";
				break;
		}
		return title;
	};

	return (
		<div>
			<Progress/>
			<header className={style.header}>
				<a href={link} className={style.info}/>
				<div className={style.inner}>
					<p className={style.title}>{createPageTitle()}</p>
					<div className={style.name}>
						{hasEdit &&
							pressRelease.detail.status < 2 ?
								<IconButton onClick={()=>setNameDialog(true)} className={classes.editIcon} size="small">
									<img src={IconEdit}/>
								</IconButton>
							: null
						}
						{pressRelease.detail.name}
					</div>
				</div>
				<div className={style.actions}>
					{createActions()}
				</div>
				<Avatar src={me.img} name={me.last_name} size="medium" color={me.color_cd}/>
			</header>

			<StyledMenu
				anchorEl={menu}
				keepMounted
				open={Boolean(menu)}
				onClose={() => setMenuEl(null)}
			>
				{status == 1 && hasEdit &&
					<MenuItem onClick={() => setReviewAlertDialog(true)}>
						<ListItemText primary="承認依頼取り下げ"/>
					</MenuItem>
				}
				{/*{status == 3 && hasEdit &&*/}
				{/*	<MenuItem onClick={() => setEditAlertDialog(true)}>*/}
				{/*		<ListItemText primary="編集状態に戻す"/>*/}
				{/*	</MenuItem>*/}
				{/*}*/}
				{status == 5 && hasEdit &&
					<MenuItem onClick={() => setReserveReviewAlertDialog(true)}>
						<ListItemText primary="承認依頼取り下げ"/>
					</MenuItem>
				}
				{/*{status == 7 && hasEdit &&*/}
				{/*	<MenuItem onClick={() => setReserveDeleteAlertDialog(true)}>*/}
				{/*		<ListItemText primary="配信予約取り下げ"/>*/}
				{/*	</MenuItem>*/}
				{/*}*/}
				{/*{status == 7 && hasEdit &&*/}
				{/*	<MenuItem onClick={() => setEditAlertDialog(true)}>*/}
				{/*		<ListItemText primary="編集状態に戻す"/>*/}
				{/*	</MenuItem>*/}
				{/*}*/}
				{/*{status >= 3  &&*/}
				{/*	<MenuItem onClick={handleOpenShareDialog}>*/}
				{/*		<ListItemText primary="URL共有"/>*/}
				{/*	</MenuItem>*/}
				{/*}*/}
				<MenuItem onClick={handleOpenPreviewDialog}>
					<ListItemText primary="プレビュー"/>
				</MenuItem>
			</StyledMenu>

			<PreviewDialog isRevew={true} isHistory={false} isOpen={reviewPreviewDialog} closeHandle={()=>setReviewPreviewDialog(false)}
						   handleAction={()=>{
							   setReviewPreviewDialog(false)
							   setReviewRequestDialog(true)
						   }} handleActionText="承認依頼"/>

			<PreviewDialog isHistory={false} isOpen={previewDialog} closeHandle={handleClosePreviewDialog}
						   handleAction={null} handleActionText=""/>

			{/* プレスリリース */}
			<ReviewResultDialog isReserve={false} isOpen={reviewResultDialog} closeHandle={() => setReviewResultDialog(false)}/>
			<ReviewRequestDialog
				isOpen={reviewRequestDialog}
				closeHandle={() => setReviewRequestDialog(false)}
				handleReview={handleRequestReview}/>

			{/* 配信 */}
			<ReviewResultDialog isReserve={true} isOpen={reserveReviewResultDialog} closeHandle={() => setReserveReviewResultDialog(false)}/>
			<ReviewRequestDialog
				isOpen={reserveReviewRequestDialog}
				closeHandle={()=>setReserveReviewRequestDialog(false)}
				handleReview={handleReserveReviewRequest}
			/>

			<NameDialog
				isOpen={nameDialog}
				handleClose={()=>setNameDialog(false)}
				handleSave={(name) => handleSaveName(name)}
			/>

			<ShareDialog isOpen={shareDialog} closeHandle={() => setShareDialog(false)}/>

			<AppDialog
				isOpen={editAlertDialog}
				closeHandle={()=> {
					setEditAlertDialog(false)
					setMenuEl(null)
				}}
				mainHandle={()=>handleDeleteRequestReview()}
				text="編集ステータスに戻す"
				content = {`ステータスが編集中に戻り、プレスリリースが編集可能になります。`}
				ButtonText="編集する"
			/>
			<AppDialog
				isOpen={reviewAlertDialog}
				closeHandle={()=> {
					setReviewAlertDialog(false)
					setMenuEl(null)
				}}
				mainHandle={()=>handleDeleteRequestReview()}
				text="承認依頼取り下げ"
				content = {`承認依頼を取り下げることができます。</br>承認者には、メールでお知らせされます。</br>ステータスが編集中に戻り、プレスリリースが編集可能になります。`}
				ButtonText="承認依頼を取り下げる"
			/>
			<AppDialog
				isOpen={reserveReviewAlertDialog}
				closeHandle={()=> {
					setReserveReviewAlertDialog(true)
					setMenuEl(null)
				}}
				mainHandle={()=>handleDeleteReserveReview()}
				text="承認依頼取り下げ"
				content = {`承認依頼を取り下げることができます。</br>承認者には、メールでお知らせされます。</br>ステータスが配信設定編集中に戻り、配信予約編集可能になります。`}
				ButtonText="承認依頼を取り下げる"
			/>
			{/*<AppDialog*/}
			{/*	isOpen={reserveDeleteAlertDialog}*/}
			{/*	closeHandle={()=> {*/}
			{/*		setReserveReviewAlertDialog(true)*/}
			{/*		setMenuEl(null)*/}
			{/*	}}*/}
			{/*	mainHandle={()=>handleDeleteReserveReview()}*/}
			{/*	text="配信予約の取り下げ"*/}
			{/*	content = {`配信予約を取り下げることができます。</br>ステータスが配信設定編集中に戻り、配信予約編集可能になります。`}*/}
			{/*	ButtonText="承認依頼を取り下げる"*/}
			{/*/>*/}
		</div>
	);
};

export default HeaderMenu;

