import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import style from "./help.module.scss";

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1" component="h1" gutterBottom>
				プレスキット
			</Typography>

			<Typography variant="h3" component="h1" gutterBottom>
				メディアに提供すべき企業やサービスの画像をひとつに集約
			</Typography>

			<Typography variant="body1" gutterBottom>
				各種ロゴ画像や製品・サービス画像などのファイルをプレスキットとして社外に共有できるため、必要な画像ファイルやデータを都度メールで送付する手間がかからず、常に最新のデータを提供できます。
			</Typography>

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
