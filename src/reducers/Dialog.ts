import ActionType from '../actions/Dialog/ActionType';
import Action from '../actions/Dialog/Action';
import createReducer from "./createReducer";
import { DialogModel } from "../model/DialogModel";

const initialState: DialogModel = {
	isOpen: false,
	text: ""
};

export const dialog = createReducer<DialogModel>(initialState, {
	[ActionType.SET_DIALOG](state: DialogModel, action: Action) {
		return {
			...state,
			...action.payload
		}
	}
});
