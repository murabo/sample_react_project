import React, { useEffect } from "react";
import { useState } from "react";
import { checkEditAuthority } from "../../../../../../util/checkAuthority";

// component
import AddDialog from "./AddDialog";
import { Button, Divider, IconButton, Menu, MenuItem } from "@material-ui/core";

// style
import style from "./create_user.module.scss";

// state
import { RootState } from "../../../../../../reducers";
import AvatarChip from "../../../../../Common/AvatarChip";
import { useSelector } from "react-redux";
import ImageEllipsis from "../../../../../../assets/icon_ellipsis.svg";
import { push } from "connected-react-router";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const meSelector = (state: RootState) => state.me;

const CreateUser: React.FC = () => {

    const [addDialog, setAddDialog] = useState(false);
	const pressRelease = useSelector(pressReleaseSelector);
	const me = useSelector(meSelector);
    const hasEdit = checkEditAuthority(pressRelease, me)

    return (
		<>
			<ul className={style.list}>
				<li>
					<AvatarChip user={pressRelease.detail.create_user}　component={<span className={style.creator}>作成者</span>}/>
				</li>
				{pressRelease.detail.creators.map( (user, index) =>
					<ListMenu  user={user} key={index} />

				)}
			</ul>
			{hasEdit &&
				<div className={style.add}>
					<Button variant="outlined" size="small" onClick={() => setAddDialog(true)}>
						追加
					</Button>
				</div>
			}
			<AddDialog isOpen={addDialog} closeHandle={() => setAddDialog(false)}/>
		</>
	);
};

export default CreateUser;


interface ListLayoutItemProps {
	user
}

const ListMenu: React.FC<ListLayoutItemProps> = ({ user }) => {

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<li>
			<AvatarChip user={user} component={<IconButton onClick={handleClick} className={style.iconMenu}>
				<img src={ImageEllipsis}/>
			</IconButton>}/>
			<Menu
				elevation={1}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className={style.popupMenu}
			>
				<MenuItem onClick={()=> {
					handleClose();
				}}>
					削除
				</MenuItem>
			</Menu>
		</li>
	);
}


