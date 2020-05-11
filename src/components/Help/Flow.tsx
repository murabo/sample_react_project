import React from 'react';
import Typography from "@material-ui/core/Typography";

//style
import style from "./help.module.scss";
import {Divider} from "@material-ui/core";

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1"gutterBottom>
				プレスリリースの校閲・承認
			</Typography>
			<Divider/>

			<section className={style.box}>
				{/*<Typography variant="body1" gutterBottom>*/}
				{/*	コ<br/>*/}
				{/*	ドラッグ＆ドロップでHTMLメールを作成できる*/}
				{/*</Typography>*/}
				<Typography variant="h4" gutterBottom>
					1) 校閲、コメントをつけて、修正依頼をする
				</Typography>
				<Typography variant="body1" gutterBottom>
					承認依頼を受けた担当者は、テキスト内容の修正、コメントをつけて、修正依頼をだします。<br/>
					修正依頼を受けた担当者は、差分を確認することができます。
				</Typography>
				<div className={style.img}>
					<video src="https://storage.googleapis.com/harvest_site_front/help/flow.mov" autoPlay loop width="100%"></video>
				</div>
			</section>

			<section className={style.box}>
				{/*<Typography variant="body1" gutterBottom>*/}
				{/*	コ<br/>*/}
				{/*	ドラッグ＆ドロップでHTMLメールを作成できる*/}
				{/*</Typography>*/}
				<Typography variant="h4" gutterBottom>
					2) 承認
				</Typography>
				<Typography variant="body1" gutterBottom>
					承認すると、配信設定が可能になります。
				</Typography>
			</section>
		</>
	);
};

export default PressRelease
