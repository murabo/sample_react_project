import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./detail_info.module.scss";
import { push } from 'connected-react-router'

// components
import Reviewer from "./Reviewer";
import ReserveReviewer from "./ReserveReviewer";
import Status from "../../Status";

// state
import { RootState } from "../../../../../reducers";
import DeadLine from "../../DeadLine";
import { ListItemIcon, Button, Typography } from "@material-ui/core";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;

const Info: React.FC = () => {

	const dispatch = useDispatch();
	const pressRelease = useSelector(pressReleaseSelector);
	const pressReleaseReserve = useSelector(pressReleaseReserveSelector);

	const inReview = pressRelease.detail.status >= 1;　//承認申請済み
	const inReviewReserve = pressRelease.detail.status >= 5;　//配信承認申請済み

	return (
		<div className={style.wrap}>

			<section className={style.item}>
				<Status type={"bar"} review={pressRelease.detail.review} status={pressRelease.detail.status}/>
			</section>

			{inReviewReserve &&
			<section className={style.item}>
				<p className={style.title}>配信承認</p>
				<div className={style.inner}>
					<>
						{pressRelease.detail.status === 5 &&
						<>
							<p className={style.subTitle}>承認期限</p>
							<div className={style.deadline}>
								<DeadLine date={pressReleaseReserve.data.deadline_at}
										  member={pressReleaseReserve.data.reviewer}
										  min={false}/>
							</div>
							<p className={style.title}>承認依頼コメント</p>
							<div className={style.date}>
								{pressReleaseReserve.data.comment? pressReleaseReserve.data.comment: "設定なし"}
							</div>
						</>
						}
						<p className={style.subTitle}>承認者</p>
						<ReserveReviewer/>
					</>
				</div>
			</section>
			}

			{inReview &&
				<section className={style.item}>
					<p className={style.title}>プレスリリース承認</p>
					<div className={style.inner}>
						{!inReviewReserve &&
						<>
							<p className={style.subTitle}>承認期限</p>
							<div className={style.deadline}>
								<DeadLine date={pressRelease.review.deadline_at}
										  member={pressRelease.review.member}
										  min={false}/>
							</div>
							<p className={style.subTitle}>承認依頼コメント</p>
							<div className={style.date}>
								{pressRelease.review.comment ? pressRelease.review.comment : "設定なし"}
							</div>
						</>
						}
						<p className={style.subTitle}>承認者</p>
						<Reviewer/>
					</div>
				</section>
			}
		</div>
	);
};

export default Info;

