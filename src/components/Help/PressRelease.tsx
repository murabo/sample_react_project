import React from 'react';
import Typography from "@material-ui/core/Typography";

//style
import style from "./help.module.scss";
import {NavLink} from "react-router-dom";
import {Divider, List, ListItem, Tooltip} from "@material-ui/core";
import ImagePressReleaseAi from '../../assets/help/press_release_ai.png';
import ImageHistory from '../../assets/help/history.png';
import ImageHistory2 from '../../assets/help/history2.png';
import ImageHistory3 from '../../assets/help/history3.png';
import ImageEdit1 from '../../assets/help/edit1.png';
import ImageEdit2 from '../../assets/help/edit2.png';
import ImageContact from '../../assets/help/contact.png';

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1"gutterBottom>
				プレスリリース作成方法
			</Typography>
			<Divider/>

			<section className={style.box}>
				{/*<Typography variant="body1" gutterBottom>*/}
				{/*	コ<br/>*/}
				{/*	ドラッグ＆ドロップでHTMLメールを作成できる*/}
				{/*</Typography>*/}
				<Typography variant="h4" gutterBottom>
					1) コンテンツから作成(初級者)
				</Typography>
				<Typography variant="body1" gutterBottom>
					プレスリリースのテーマに応じたテンプレートを用意しています。<br/>
					対象のテンプレートを選んで作成しましょう。
				</Typography>
				<div className={style.img}>
					<video src="https://storage.googleapis.com/harvest_site_front/help/content_template.mp4" autoPlay loop width="100%"></video>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					2) デザインから作成(上級者)
				</Typography>
				<Typography variant="body1" gutterBottom>
					お好きなデザインのテンプレートを選んで作成しましょう。
				</Typography>
				<div className={style.img}>
					<video src="https://storage.googleapis.com/harvest_site_front/help/design_template.mp4" autoPlay loop width="100%"></video>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					3) レイアウトの修正
				</Typography>
				<Typography variant="body1" gutterBottom>
					ドラッグ＆ドロップで作成できます<br/>
					パーツの複製、なんども使うパーツは、オリジナルパーツとして登録すると便利。<br/>また画像のリサイズも簡単です。
				</Typography>
				<div className={style.img}>
					<video src="https://storage.googleapis.com/harvest_site_front/help/layout.mp4" autoPlay loop width="100%"></video>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					4) お問い合わせ先
				</Typography>
				<Typography variant="body1" gutterBottom>
					一般窓口は公開ページで表示されます。
					メディア専用は、配信メールに添付されます。<br/>
					どちらも詳細ページからダウンロード可能です。
				</Typography>
				<div className={style.img}>
					<img src={ImageContact} width="100%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					5) AIで文章チェック
				</Typography>
				<Typography variant="body1" gutterBottom>
					ですます。表記揺れのチェック、タイトルに入れた方がよいパワーワードをレコメンドします。
				</Typography>
				<div className={style.img}>
					<img src={ImagePressReleaseAi} width="100%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					6) 履歴の管理
				</Typography>
				<Typography variant="body1" gutterBottom>
					保存履歴を管理しています。以前の内容に戻すことが可能です。
				</Typography>
				<div className={style.img}>
					<img src={ImageHistory} width="50%"/>
					<img src={ImageHistory2} width="50%"/>
				</div>
				<div className={style.img}>
					<img src={ImageHistory3} width="100%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					7) 共同編集
				</Typography>
				<Typography variant="body1" gutterBottom>
					複数人で編集することが可能です。メンバーの中から、
				</Typography>
				<div className={style.img}>
					<img src={ImageEdit1} width="50%"/>
					<img src={ImageEdit2} width="50%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					8) 承認依頼
				</Typography>
				<Typography variant="body1" gutterBottom>
					関係者に承認依頼を出して、内容をチェックしてもらいましょう。
				</Typography>
			</section>
		</>
	);
};

export default PressRelease
