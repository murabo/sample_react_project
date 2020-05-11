import React from "react";
import { useSelector } from "react-redux";

// component
import AvatarChip from "../../../../../Common/AvatarChip";

import { makeStyles} from "@material-ui/core/";

// style
import style from "./reviewer.module.scss";

// img
import IconCheck from "../../../../../../assets/icon_check_blue.svg";
import IconInfo from "../../../../../../assets/icon_info_orange.svg";

// state
import { RootState } from "../../../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;
const pressGroupSelector = (state: RootState) => state.group;

const useStyles = makeStyles({
	root: {
		height: '100%',
	},
	button: {
		marginTop: '1rem',
		width: '72px',
		borderRadius: '6.2rem'
	}
});


interface IProps {}

const Reviewer: React.FC<IProps> = () => {

	const classes = useStyles();
    const pressRelease = useSelector(pressReleaseSelector);
	const pressReleaseReserve = useSelector(pressReleaseReserveSelector);

	return (
		<div className={classes.root}>
			{pressReleaseReserve.data.reviewer ?
				<ul className={style.list}>
					{pressReleaseReserve.data.reviewer.map((item, index) => (
						<Member member={item} key={index}/>
					))}
				</ul>
			:''}
		</div>
	);
};

export default Reviewer;

interface ReviewProps {
	member,
}

const Member: React.FC<ReviewProps> = ({member}) => {

	return (
		<li>
			<div className={style.user}>
				<AvatarChip user={member} component={null}/>
			</div>
			{member.status === true &&
				<div className={style.accept}>
					<p className={style.title}><img src={IconCheck}/>承認済み</p>
					{member.comment && <p className={style.comment}>コメント: {member.comment}</p>}
				</div>
			}
			{member.status === false &&
				<div className={style.reviewed}>
					<div className={style.text}>
						<p className={style.title}>修正依頼</p>
						{member.comment && <p className={style.comment}>{member.comment}</p>}
					</div>
				</div>
			}
		</li>
	);
};

