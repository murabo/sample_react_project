import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { push } from 'connected-react-router'
import store from 'store'

//component
import {Divider, Menu, MenuItem} from '@material-ui/core/';
import Avatar from "../../Common/Avatar";
import AppDialog from "../../Common/AppDialog";

// style
import style from "./setting.module.scss";

// state
import { RootState } from "../../../reducers";
const routerSelector = (state: RootState) => state.router;
const meSelector = (state: RootState) => state.me;

interface MenuProps {
    isOpen: null | HTMLElement,
    closeHandle
}

const UserSettingModalMenu: React.FC<MenuProps> = ({ isOpen, closeHandle }) => {

    const me = useSelector(meSelector);
    const dispatch = useDispatch();
    const [logout, setLogout] = React.useState(false);

    const handleOpenDialog = () => {
        closeHandle()
        setLogout(true)
    };

	const handleLogout = () => {
        closeHandle()
        setLogout(false)
        dispatch(push('/sign_in/'));
    };

    const handleSetting = () => {
        dispatch(push('/user/me/'));
        closeHandle()
    };

    return (
		<div>
			<Menu
				anchorEl={isOpen}
				keepMounted
				open={Boolean(isOpen)}
				onClose={closeHandle}
			>
                <MenuItem>
				<div className={style.profile}>
					<Avatar src={me.img} name={me.last_name} size="large" color={me.color_cd}/>
					<p className={style.name}>{me.last_name} {me.first_name}</p>
					<p className={style.email}>{me.email}</p>
				</div>
                </MenuItem>
                <Divider component="li" variant="middle"/>
				<MenuItem onClick={handleSetting}>設定</MenuItem>
				<MenuItem onClick={handleOpenDialog}>ログアウト</MenuItem>
			</Menu>
			<AppDialog isOpen={logout} closeHandle={()=>setLogout(false)} mainHandle={handleLogout} text='ログアウトしますか' ButtonText="ログアウト"/>
		</div>
    );
}
export default UserSettingModalMenu;
