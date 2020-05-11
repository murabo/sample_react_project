import React from 'react';
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

//style
import style from "./help.module.scss";
import {Button, Divider, ListItem, Tooltip} from "@material-ui/core";

const PressRelease = () => {

	return (
		<>
			<Typography variant="h1"gutterBottom>
				メディアリストの管理
			</Typography>
			<Divider/>
			<section className={style.box}>
				<Typography variant="body1" gutterBottom>
					メディアを登録すると、プレスリリースの配信が簡単になります。<br/>
					登録したメディアにプレスリリースを配信すると、メールの開封確認ができます。
				</Typography>
				<Button variant={"outlined"} size={"large"} onClick={() => window.open(`/media`)} color="primary">登録画面</Button>
			</section>

		</>
	);
};

export default PressRelease
