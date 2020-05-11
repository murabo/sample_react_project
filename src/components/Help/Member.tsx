import React from 'react';
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

//style
import style from "./help.module.scss";
import {Button, Divider} from "@material-ui/core";

import ImageMember from '../../assets/help/member.png';

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1"gutterBottom>
				メンバー管理
			</Typography>
			<Divider/>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					1) 一覧
				</Typography>
				<Typography variant="body1" gutterBottom>
					表示されているメンバーは、プレスリリースの閲覧が可能になります。
				</Typography>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					2)　権限管理
				</Typography>
				<Typography variant="body1" gutterBottom>
					企業メンバーは全ての内容を閲覧することができます。<br/>
					パートナーは、メディアリストのメールアドレスを閲覧することができません。
				</Typography>
				<div className={style.img}>
					<img src={ImageMember} width="100%"/>
				</div>
			</section>

		</>
	);
};

export default PressRelease
