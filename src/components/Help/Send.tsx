import React from 'react';
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

//style
import style from "./help.module.scss";
import {Divider} from "@material-ui/core";

import ImageSend from '../../assets/help/send.png';
import ImageSend2 from '../../assets/help/send2.png';

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1"gutterBottom>
				プレスリリースの配信
			</Typography>
			<Divider/>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					1) カテゴリ選択
				</Typography>
				<Typography variant="body1" gutterBottom>
					プレスリリースの内容に関係のある、種類、タグをつけます。<br/>
					選択した内容と、プレスリリースの文章から、配信先メディアが自動選定されます。
				</Typography>
				<div className={style.img}>
					<img src={ImageSend} width="100%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					2) 配信メディアのチェック
				</Typography>
				<Typography variant="body1" gutterBottom>
					配信したいメディアにチェックをつけます。<br/>
					自動選定したメディア、メディアリストに登録されているメディアに配信が可能です。
				</Typography>
				<div className={style.img}>
					<img src={ImageSend2} width="100%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					3) 配信日時の入力
				</Typography>
				<Typography variant="body1" gutterBottom>
					配信したい日時を入力してください。
					12時間後から選択できます。<br/>
				</Typography>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					4) 送信元メールアドレスの選択
				</Typography>
				<Typography variant="body1" gutterBottom>
					会社用メールアドレスか、メンバーのメールアドレスを選択します。
				</Typography>
				<div className={style.img}>
					<img src={ImageSend2} width="100%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					5) 配信メールを作成します。
				</Typography>
				<Typography variant="body1" gutterBottom>
					1件作成し、メニューからその他のメールにコピーも可能です。
				</Typography>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					6) 配信承認依頼
				</Typography>
				<Typography variant="body1" gutterBottom>
					承認されると配信待ちとなります。<br/>
					配信時間を過ぎても承認されない場合は、配信が行われません。
				</Typography>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					7) 配信
				</Typography>
				<Typography variant="body1" gutterBottom>
					時間になると配信が行われます。<br/>

				</Typography>
			</section>
		</>
	);
};

export default PressRelease
