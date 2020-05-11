import React from "react";
import { NavLink } from 'react-router-dom'

// component
import {createStyles, List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@material-ui/core";

// img
import ImagePublic from "../../../assets/menu/public.svg";

// style
import style from "../menu.module.scss";
import ImageLogoIcon from "../../../assets/menu/logo_icon.svg";
import ImageMedia from "../../../assets/menu/media.svg";
import ImageMember from "../../../assets/menu/members.svg";
import ImageBell from "../../../assets/menu/bell.svg";
import ImageBuilding from "../../../assets/menu/building.svg";
import Avatar from "../../Common/Avatar";
import Notification from "../Notification";
import UserSettingModalMenu from "../UserSettingModalMenu";
import GroupSelect from "../GroupSelect";
import {makeStyles} from "@material-ui/core/styles";
import ImageHome from "../../../assets/menu/home.svg";
import ImagePressRelease from "../../../assets/menu/press_release.svg";
import ImagePressKit from "../../../assets/menu/press_kit.svg";

const HomeMenu: React.FC = () => {
	const classes = useStyles();
	return (
		<section className={style.homeMin}>
				<div className={style.top}>
					<List className={classes.root} component="nav">
						<NavLink to={`/`} className={style.mainLink}>
							<Tooltip title="ホーム" arrow>
								<ListItem button className={classes.list}>
									<img src={ImageHome}/>
								</ListItem>
							</Tooltip>
						</NavLink>
						{/*<NavLink to={`/create/`} activeClassName={style.active} className={style.mainLink}>*/}
						{/*    <ListItem button className={classes.list}>*/}
						{/*        <img src={ImagePlus}/>*/}
						{/*    </ListItem>*/}
						{/*</NavLink>*/}
						<NavLink to={`/press_release`} activeClassName={style.active} className={style.mainLink}>
							<Tooltip title="プレスリリース" arrow>
								<ListItem button className={classes.list}>
									<img src={ImagePressRelease}/>
								</ListItem>
							</Tooltip>
						</NavLink>
						<NavLink to={`/press_kit`} activeClassName={style.active} className={style.mainLink}>
							<Tooltip title="プレスキット" arrow>
								<ListItem button className={classes.list}>
									<img src={ImagePressKit}/>
								</ListItem>
							</Tooltip>
						</NavLink>
					</List>
				</div>
		</section>
	);
}

export default HomeMenu;


const useStyles = makeStyles(() =>
	createStyles({
		root: {
			padding: 0,
		},
		list: {
			width: 54,
			height:  54,
			display: "flex",
			justifyContent: "center"
		}
	}),
);
