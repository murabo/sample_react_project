import React from "react";
import classNames from 'classnames';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// style
import style from "./create_dialog_select.module.scss";

//img
import ImgContent from "../../../../../assets/layout/img_content.svg";
import ImgDesign from "../../../../../assets/layout/img_design.svg";
import ImgHistory from "../../../../../assets/layout/img_history.svg";
import { Typography } from "@material-ui/core";


const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: "column"
	},
	button: {
		width: "16rem",
		height: '20.6rem',
		display: 'block',
		borderRadius: '0.6rem',
		color: 'transparent'
	},
	active: {
		background: "#E3F5EA",
	}
});

export default function SelectLayout({ type, handleChange }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Typography align={"center"} gutterBottom variant={"h6"}>コンテンツ・デザインのいずれかを選択してください</Typography>
			<ul className={style.actions}>
				<li>
					<Button className={classNames(classes.button, type === 1? style.active:'')} onClick={()=>handleChange(1)}>
						<p className={style.title}>コンテンツ</p>
						<img src={ImgContent} className={style.img}/>
					</Button>
					<p className={style.sub}>プレスキットの内容に<br/>最適化されたテンプレート<br/>から作成します。</p>
				</li>
				<li>
					<Button className={classNames(classes.button, type === 2? style.active:'')} onClick={()=>handleChange(2)}>
						<p className={style.title}>デザイン</p>
						<img src={ImgDesign} className={style.img}/>
					</Button>
					<p className={style.sub}>デザインテンプレート<br/>から作成します。</p>
				</li>
				{/*<li>*/}
				{/*	<Button className={classNames(classes.button, type === 3? style.active:'')} onClick={()=>handleChange(3)}>*/}
				{/*		<p className={style.title}>履歴</p>*/}
				{/*		<img src={ImgHistory} className={style.img}/>*/}
				{/*	</Button>*/}
				{/*	<p className={style.sub}>選択した記事カテゴリーに<br/>最適化したコンテンツ内容<br/>をもとに作成します。</p>*/}
				{/*</li>*/}
			</ul>
		</div>
	);
}

