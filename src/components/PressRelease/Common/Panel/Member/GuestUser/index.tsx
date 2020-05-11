import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { checkEditAuthority } from "../../../../../../util/checkAuthority";

// component
import InviteDialog from "./InviteDialog";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";


// style
import style from "./create_user.module.scss";

// state
import { RootState } from "../../../../../../reducers";
import AvatarChip from "../../../../../Common/AvatarChip";
import { useSelector } from "react-redux";
import ImageEllipsis from "../../../../../../assets/icon_ellipsis.svg";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const meSelector = (state: RootState) => state.me;

const GuestUser: React.FC = () => {

    const [addDialog, setAddDialog] = useState(false);
	const pressRelease = useSelector(pressReleaseSelector);
	const me = useSelector(meSelector);
	const hasEdit = checkEditAuthority(pressRelease, me)

    return (
		<>
			{pressRelease.detail.creators.length ?
				<ul className={style.list}>
					{pressRelease.detail.creators.map((user, index) =>
						<ListMenu user={user} key={index}/>
					)}
				</ul>
			: ''}
			{hasEdit &&
				<div className={style.add}>
					<Button variant="outlined" size="small" onClick={() => setAddDialog(true)}>
						追加
					</Button>
				</div>
			}
			<InviteDialog isOpen={addDialog} closeHandle={() => setAddDialog(false)}/>
		</>
	);
};

export default GuestUser;


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


