import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formValueSelector } from "redux-form";
import classNames from "classnames";
import _ from "lodash";
import style from "./comment.module.scss";

// models
import {
	PressReleaseCommentListModel,
	PressReleaseListModel,
	PressReleaseModel,
} from "../../../../../model/PressReleaseModel";

// components
import CommentForm from "../../../../Form/Comment";
import ReplyForm from "../../../../Form/Reply";
import Avatar from "../../../../Common/Avatar";
import DateTime from "../../../../Common/DateTime";
import { Button, Tabs, Tab, makeStyles } from "@material-ui/core";

//action
import * as PressReleaseActionCreators from "../../../../../actions/PressRelease/ActionCreator";

// img
import IconComment from "../../../../../assets/icon_comment_green.svg";

// state
import { RootState } from "../../../../../reducers";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const stateSelector = (state: RootState) => state;

const useStyles = makeStyles({
	tabs: {
		height: "4rem",
	},
	tab: {
		fontSize: "1.2rem",
		minWidth: "10rem",
		height: "4rem",
	},
});


interface SortList {
	index: string,
	comment: PressReleaseCommentListModel
}

const Comment: React.FC = () => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const [tabIndex, setTabIndex] = React.useState(0);
	const [commentList, setCommentList] = React.useState<SortList[]>([]);
	const pressRelease = useSelector(pressReleaseSelector);
	const selector = formValueSelector("COMMENT");
	const state = useSelector(stateSelector);

	const handleNewComment = () => {
		dispatch(PressReleaseActionCreators.setPressReleaseCommentForm.request({
			position: "",
			quote: "",
			isDisplayForm: true,
		}));
	};

	// tab
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setTabIndex(newValue);
		if (newValue === 0) {
			dispatch(PressReleaseActionCreators.getPressReleaseCommentList.request());
		} else {
			dispatch(PressReleaseActionCreators.getPressReleaseCommentDoneList.request());
		}
	};

	useEffect(() => {
		let list:SortList[] = [];
		pressRelease.comment.list.unDone.map(comment => {
			const index = pressRelease.detail.body.html.indexOf(`id="${comment.position}"`);
			list.push({ index, comment });
		})
		const sort:SortList[] = _.orderBy(list, ['index'], ['asc']);
		setCommentList(sort);
	}, [pressRelease.comment.list.unDone]);


	return (
		<div className={style.root}>
			<Tabs
				classes={{ root: classes.tabs }}
				value={tabIndex}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
			>
				<Tab label="全て" classes={{ root: classes.tab }}/>
				<Tab label="解決済み" classes={{ root: classes.tab }}/>
			</Tabs>

			{/*<div className={style.actions}>*/}
			{/*    <IconButton onClick={handleNewComment} className={style.iconMenu}>*/}
			{/*        <img src={IconNewComment}/>*/}
			{/*    </IconButton>*/}
			{/*    <IconButton onClick={handleNewComment} className={style.iconMenu}>*/}
			{/*        <img src={ImageEllipsis}/>*/}
			{/*    </IconButton>*/}
			{/*</div>*/}

			{pressRelease.comment.form.isDisplayForm &&
			<>
				<div className={style.form}><CommentForm/></div>
				<div className={style.overlay}/>
			</>
			}

			{tabIndex === 0 ?
				<ul className={style.list}>
					{commentList.map((row:{comment}, index) => {
						const item = row.comment
						return <li key={index}>
							<CommentItem
								comment={item}
								handleSubmit={""}
								isDone={item.is_done}/>
						</li>;

					})}
				</ul>
				:
				<ul className={style.list}>
					{pressRelease.comment.list.done.map((row, index) => (
						<li key={index}>
							<CommentItem
								comment={row}
								handleSubmit={""}
								isDone={row.is_done}/>
						</li>
					))}
				</ul>
			}
		</div>
	);
};

export default Comment;


interface CommentItemProps {
	comment,
	handleSubmit,
	isDone: boolean
}


const CommentItem: React.FC<CommentItemProps> = ({ comment, handleSubmit, isDone }) => {

	const dispatch = useDispatch();
	const [display, setDisplay] = React.useState(false);
	const [done, setDone] = React.useState(isDone);
	const pressRelease = useSelector(pressReleaseSelector);
	const selectId = pressRelease.comment.select.id;

	const handleChange = () => {
		dispatch(PressReleaseActionCreators.patchPressReleaseComment.request({
			id: comment.id,
			is_done: !isDone,
		}));
		setDone(!done);
	};

	const handleHighlight = () => {
		if (comment.position !== selectId || !selectId) {
			dispatch(PressReleaseActionCreators.setPressReleaseCommentHover.request(comment.position));
		}
	};
	const handleHighlightOut = () => {
		dispatch(PressReleaseActionCreators.setPressReleaseCommentHover.request(""));
	};

	return (
		<div className={classNames(style.items, comment.position === selectId ? style.select : "")}
			 onMouseOver={() => handleHighlight()}
			 onMouseLeave={() => handleHighlightOut()}>
			{display ?
				<div>
					<div className={style.header}>
						{!isDone &&
						<div className={style.button}>
							<Button color="primary" onClick={handleChange} size="medium">
								解決する
							</Button>
						</div>}
					</div>
					<div className={style.body} onClick={() => setDisplay(false)}>
						<div className={style.bodyImage}>
							<Avatar src={comment.user.img} name={comment.user.last_name} size="small"
									color={comment.user.color_cd}/>
						</div>
						<div className={style.bodyContent}>
							<div className={style.info}>
								<span className={style.name}>{comment.user.first_name} {comment.user.last_name}</span>
								<span className={style.date}><DateTime datetime={comment.created_at}/></span>
							</div>
							{/*<p className={style.text}>*/}
							{/*	{comment.text}*/}
							{/*</p>*/}
							<div className={style.text} dangerouslySetInnerHTML={{__html: `${comment.text}`}}></div>
						</div>
					</div>
					{comment.reply.map((item, index) => (
						<ReplyItem
							key={index}
							item={item}/>
					))}
					{!isDone &&
					<div className={classNames(style.body, style.replyForm)}>
						<div className={style.bodyImage}>
							<Avatar src={comment.user.img} name={comment.user.first_name} size="small"
									color={comment.user.color_cd}/>
						</div>
						<div className={style.bodyContent}>
							<ReplyForm onSubmit={handleSubmit} id={comment.id}/>
						</div>
					</div>
					}
				</div>
				:
				<div onClick={() => setDisplay(true)}>
					<div className={style.body}>
						<div className={style.bodyImage}>
							<Avatar src={comment.user.img} name={comment.user.first_name} size="small"
									color={comment.user.color_cd}/>
						</div>
						<div className={style.bodyContent}>
							<div className={style.text} dangerouslySetInnerHTML={{__html: `${comment.text}`}}></div>
						</div>
					</div>
					{(comment.reply.length > 0) &&
					<p className={style.reply}><img src={IconComment}/>{comment.reply.length}</p>}
				</div>}
		</div>
	);
};


const ReplyItem = ({ item }) => {

	return (
		<div className={style.body}>
			<div className={style.bodyImage}>
				<Avatar src="" name={item.user.first_name} size="small" color={item.user.color_cd}/>
			</div>
			<div className={style.bodyContent}>
				<div className={style.info}>
					<span className={style.name}>{item.user.first_name} {item.user.last_name}</span>
					<span className={style.date}><DateTime datetime={item.created_at}/></span>
				</div>
				<p className={style.text}>{item.text}</p>
			</div>
		</div>
	);
};
