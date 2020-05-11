import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ja";

//style
import style from "./deadLine.module.scss";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

//state
import { RootState } from "../../../../reducers";
const meSelector = (state: RootState) => state.me;

const DeadLine = ({ date, min, member }) => {
	const me = useSelector(meSelector);
	const referenceDate = dayjs(date);
	const datetime = referenceDate.format("YYYY年MM月DD日 HH:mm");
	const fromDate2 = dayjs(date);
	const today = dayjs();
	const diff = dayjs(today).diff(fromDate2, "d");
	let result = <></>;

	///const hasReview = member? member.filter(item => item.user.uuid === me.uuid) : false
	const hasReview = []

	if (min) {
		result = <DeadLineMin diff={diff} date={datetime} hasReview={Boolean(hasReview.length)}/>;
	} else {
		result = <DeadLineLarge diff={diff} date={datetime} hasReview={Boolean(hasReview.length)}/>;
	}
	return <div className={style.root}>{result}</div>;
};

const DeadLineMin = ({ diff, date, hasReview }) => {

	let text = "";
	let classname = "";

	if (diff === 0) {
		classname = style.today;
		text = "本日期限";
	} else if (diff < 0) {
		classname = style.any;
		text = `${date}期限`;
	} else {
		classname = style.over;
		text = `${diff}日の期限超過`;
	}

	const html =
			<>
				{hasReview && <Typography color={"primary"} variant={"caption"}>校閲依頼がきてます</Typography>}
				<div className={style.list}>
					<p className={classname}>
						{text}
					</p>
				</div>
			</>;
	return html;
};

const DeadLineLarge = ({ diff, date, hasReview }) => {

	let text = "";
	let classname = "";

	if (diff === 0) {
		classname = style.today;
		text = "本日";
	} else if (diff < 0) {
		classname = style.any;
	} else {
		classname = style.over;
		text = `${diff}日超過`;
	}

	const html =
		<div className={style.panel}>
			<div className={style.inner}>
				{/*{hasReview && <Typography color={"primary"} variant={"caption"}>校閲依頼がきてます</Typography>}*/}
				<div className={classname}>
					<p>{text}</p>
				</div>
				<p className={style.date}>{date}</p>
			</div>
		</div>;

	return html;
};

export default DeadLine;
