import React from "react";
import { NavLink } from "react-router-dom";

// component
import { List, ListItem, ListItemIcon, ListItemText, Button } from "@material-ui/core";

// img
import ImageGroup from "../../../assets/menu/group.svg";
import ImageNewMember from "../../../assets/menu/new_member.svg";

// style
import style from "../menu.module.scss";
import InvideDialog from "../../Member/InviteDialog";


const HomeMenu: React.FC = () => {

	const [invideDialog, setInvideDialog] = React.useState(false);

	return (
		<section>
			<List>
				<ListItem>
					<Button variant="outlined" size="large" color="primary" className={style.button} onClick={(event)=>setInvideDialog(true)}>
						<img src={ImageNewMember}/>メンバー招待
					</Button>
				</ListItem>
				<ListItem>
					<NavLink exact to={`/member/`} className={style.link} activeClassName={style.active}>
						<ListItemIcon>
							<img src={ImageGroup}/>
						</ListItemIcon>
						<ListItemText primary="メンバー一覧"/>
					</NavLink>
				</ListItem>
			</List>
			<InvideDialog isOpen={invideDialog} closeHandle={()=> setInvideDialog(false)}/>
		</section>
	);
};

export default HomeMenu;
