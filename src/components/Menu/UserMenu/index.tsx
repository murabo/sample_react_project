import React from "react";
import { NavLink } from "react-router-dom";

// component
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// img
import ImageUser from "../../../assets/menu/user.svg";
import ImageKey from "../../../assets/menu/key.svg";
import ImageGroup from "../../../assets/menu/group.svg";
// style
import style from "../menu.module.scss";

const HomeMenu: React.FC = () => {

	return (
		<section>
			<List>
				<ListItem button>
					<NavLink to={`/user/me/`} className={style.link} activeClassName={style.active}>
						<ListItemIcon>
							<img src={ImageUser}/>
						</ListItemIcon>
						<ListItemText primary="個人設定"/>
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink to={`/user/password/edit`} className={style.link} activeClassName={style.active}>
						<ListItemIcon>
							<img src={ImageKey}/>
						</ListItemIcon>
						<ListItemText primary="パスワード設定"/>
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink to={`/user/group/`} className={style.link} activeClassName={style.active}>
						<ListItemIcon>
							<img src={ImageGroup}/>
						</ListItemIcon>
						<ListItemText primary="参加グループ"/>
					</NavLink>
				</ListItem>
			</List>
		</section>
	);
};

export default HomeMenu;
