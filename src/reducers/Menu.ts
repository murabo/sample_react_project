import MenuActionType from '../actions/Menu/ActionType';
import MenuAction from '../actions/Menu/Action';
import { MenuModel } from "../model/MenuModel";
import createReducer from "./createReducer";

const initialState: MenuModel = {
	isOpen: false,
};

export const menu = createReducer<MenuModel>(initialState, {
	[MenuActionType.SET_MENU](state: MenuModel, action: MenuAction) {
		return { isOpen :!state.isOpen }
	}
});
