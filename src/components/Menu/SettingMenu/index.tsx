import React from "react";
import { NavLink } from "react-router-dom";

// component
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// img
import ImageBuilding from "../../../assets/menu/building.svg";
import ImageSetting from "../../../assets/menu/group_setting.svg";
import ImagePlan from "../../../assets/menu/plan.svg";
import ImageCard from "../../../assets/menu/card.svg";

// style
import style from "../menu.module.scss";

const HomeMenu: React.FC = () => {

	return (
		<section>
			<List>
				<ListItem button>
					<NavLink to={`/setting/company`} className={style.link} activeClassName={style.active}>
						<ListItemIcon>
							<img src={ImageBuilding}/>
						</ListItemIcon>
						<ListItemText primary="企業情報"/>
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink exact={true} to={`/setting/group/`} className={style.link} activeClassName={style.active}>
						<ListItemIcon>
							<img src={ImageSetting}/>
						</ListItemIcon>
						<ListItemText primary="グループ設定"/>
					</NavLink>
				</ListItem>
				{/*<ListItem button>*/}
				{/*	<NavLink to={`/setting/plan`} className={style.link} activeClassName={style.active}>*/}
				{/*		<ListItemIcon>*/}
				{/*			<img src={ImagePlan}/>*/}
				{/*		</ListItemIcon>*/}
				{/*		<ListItemText primary="プラン"/>*/}
				{/*	</NavLink>*/}
				{/*</ListItem>*/}
				{/*<ListItem button>*/}
				{/*	<NavLink to={`/setting/payment/`} className={style.link} activeClassName={style.active}>*/}
				{/*		<ListItemIcon>*/}
				{/*			<img src={ImageCard}/>*/}
				{/*		</ListItemIcon>*/}
				{/*		<ListItemText primary="お支払い"/>*/}
				{/*	</NavLink>*/}
				{/*</ListItem>*/}
			</List>
		</section>
	);
};

export default HomeMenu;
