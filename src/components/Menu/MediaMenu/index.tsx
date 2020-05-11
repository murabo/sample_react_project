import React from "react";
import { NavLink } from "react-router-dom";

// component
import { Button, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// img
import ImagePressRelease from "../../../assets/menu/press_release.svg";

// style
import style from "../menu.module.scss";

const HomeMenu: React.FC = () => {

	return (
		<section>
			<List>
				<ListItem>
					<NavLink exact to={`/media/create/`} className={style.button}>
						<Button variant="outlined" size="large" color="primary" className={style.button}>
							新規追加
						</Button>
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink exact to={`/media/`} className={style.link} activeClassName={style.active}>
						<ListItemIcon>
							<img src={ImagePressRelease}/>
						</ListItemIcon>
						<ListItemText primary="メディアリスト"/>
					</NavLink>
				</ListItem>
			</List>
		</section>
	);
};

export default HomeMenu;
