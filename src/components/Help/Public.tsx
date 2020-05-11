import React from 'react';
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

//style
import style from "./help.module.scss";
import {Button} from "@material-ui/core";

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1" component="h1" gutterBottom>
				公開用ページ
			</Typography>
			<section className={style.box}>
				<Typography variant="body1" gutterBottom>
					プレスリリースを作成すると同時に、webのリリースページを生成します。<br/>
					自社のプレスリリースページとしてご活用いただけます。
				</Typography>
			</section>
			<section className={style.box}>
				<Typography variant="body1" gutterBottom>
					すでにリリースページをお持ちの場合など、不要な場合は非公開にすることも可能です。
				</Typography>
				<Button variant={"outlined"} size={"large"} onClick={() => window.open(`/setting/company/edit/`)} color="primary">設定</Button>
			</section>

			<section className={style.box}>
				<Typography variant="body1" gutterBottom>
					サンプル
				</Typography>
				<Button variant={"outlined"} size={"large"} onClick={() => window.open(`https://pr.harvest.site/press_release/mlab/`)} color="primary">m-Labプレスリリースページ</Button>
			</section>
		</>
	);
};

export default PressRelease
