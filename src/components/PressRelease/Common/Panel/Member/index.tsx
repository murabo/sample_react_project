import React, { useEffect } from "react";
import { useState } from "react";
import { checkEditAuthority } from "../../../../../util/checkAuthority";

// component
import CreateUser from "./CreateUser";
import GuestUser from "./GuestUser";
import { Button, Divider, IconButton, Menu, MenuItem } from "@material-ui/core";


// style
import style from "./member.module.scss";

// state
import { RootState } from "../../../../../reducers";
import AvatarChip from "../../../../Common/AvatarChip";
import {useDispatch, useSelector} from "react-redux";
import ImageEllipsis from "../../../../../assets/icon_ellipsis.svg";
import { push } from "connected-react-router";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const meSelector = (state: RootState) => state.me;


const Member: React.FC = () => {

	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<section className={style.item}>
				<p className={style.title}>編集者</p>
				<div className={style.inner}>
					<CreateUser/>
				</div>
			</section>

			<section className={style.item}>
				<p className={style.title}>メンバー</p>
				<div className={style.inner}>
					<p className={style.subTitle}>グループメンバー</p>
					<div className={style.action}>
						<Button variant="outlined" size="small" onClick={()=>dispatch(push(`/member`))}>
							メンバー一覧
						</Button>
					</div>
				</div>
				{/*<div className={style.inner}>*/}
				{/*	<p className={style.subTitle}>ゲストメンバー</p>*/}
				{/*	<Typography variant="caption" gutterBottom>当プレスリリースのみ閲覧可能となります、また承認申請を出すことができます。</Typography>*/}
				{/*	<GuestUser/>*/}
				{/*</div>*/}
			</section>
		</>
	);
}


export default Member;
