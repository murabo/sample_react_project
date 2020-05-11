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
import NewWindow from "react-new-window";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
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

	return (
		<div className={classes.root}>
			{pressRelease.detail.review.id ?
				<ul className={style.list}>
					{pressRelease.review.members.map((item, index) => (
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

	const pressRelease = useSelector(pressReleaseSelector);
	const group = useSelector(pressGroupSelector);
	const [modalOpen, setModalOpen] = React.useState<Boolean>(false);

	return (
		<li>
			<div className={style.user}>
				<AvatarChip user={member.user} component={null}/>
			</div>
			{member.status === true &&
				<div className={style.accept}>
					<p className={style.title}><img src={IconCheck}/>承認済み</p>
					{member.comment && <p className={style.comment}>コメント: {member.comment}</p>}
				</div>
			}
			{member.status === false &&
				<div className={style.reviewed}>
					{/*{member.history ?*/}
					{/*	<a href={`/press_release/${group.selectedId}/diff/${pressRelease.detail.press_id}/${member.history}`}*/}
					{/*	   className={style.link}>*/}
					{/*		<p className={style.title}><img src={IconInfo}/>校閲済み</p>*/}
					{/*		{member.comment && <p className={style.comment}>{member.comment}</p>}*/}
					{/*	</a>*/}
					{/*	:*/}
					{/*	<div className={style.text}>*/}
					{/*		<p className={style.title}>校閲済み</p>*/}
					{/*		{member.comment && <p className={style.comment}>{member.comment}</p>}*/}
					{/*	</div>*/}
					{/*}*/}

					{member.history ?
						<div className={style.link} onClick={()=>setModalOpen(true)}>
							<p className={style.title}><img src={IconInfo}/>校閲済み</p>
							{member.comment && <p className={style.comment}>{member.comment}</p>}
						</div>
						:
						<div className={style.text}>
							<p className={style.title}>校閲済み</p>
							{member.comment && <p className={style.comment}>{member.comment}</p>}
						</div>
					}

					{modalOpen &&
						<NewWindow
							url={`//${window.location.host}/press_release/${group.selectedId}/diff/${pressRelease.detail.press_id}/${member.history}`}
							onUnload={() => setModalOpen(false)}
							features={{ width: 1280, height: 500 }}
						/>
					}
				</div>
			}
		</li>
	);
};

