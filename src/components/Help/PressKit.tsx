import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Button, Divider} from "@material-ui/core";
import style from "./help.module.scss";
import ImageKit from "../../assets/help/kit.png";

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1"gutterBottom>
				プレスキット
			</Typography>
			<Divider/>

			<section className={style.box}>
				<Typography variant="h4" gutterBottom>
					1)　素材のアップロード
				</Typography>
				<Typography variant="body1" gutterBottom>
					記事に使用する画像やテキスト、動画をアップロードします。<br/>
					各種ロゴ画像や製品・サービス画像などを1箇所に集約します。<br/>
					メディアは、公開ページからダウンロードします。
				</Typography>
				<div className={style.img}>
					<img src={ImageKit} width="100%"/>
				</div>
			</section>

			<section className={style.box}>
				<Typography variant="body1" gutterBottom>
					プレスキット作成ページ
				</Typography>
				<Button variant={"outlined"} size={"large"} onClick={() => window.open(`/press_kit`)} color="primary">作成ページ</Button>
			</section>

			<section className={style.box}>
				<Typography variant="body1" gutterBottom>
					完成版のサンプルはこちら
				</Typography>
				<Button variant={"outlined"} size={"large"} onClick={() => window.open(`https://pr.harvest.site/press_kit/mlab`)} color="primary">プレスキット</Button>
			</section>
		</>
	);
};

export default PressRelease
