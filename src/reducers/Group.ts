// actions
import GroupActionType from '../actions/Group/ActionType';
import GrouprAction from '../actions/Group/Action';
// models
import { GroupModel, GroupListModel } from "../model/GroupModel";
// state
import createReducer from "./createReducer";
import { combineReducers } from "redux";

import store from 'store'
import { PressReleaseReserveModel } from "../model/PressReleaseReserveModel";

const initialState: GroupModel = {
	results: [],
	selectedId: "",
	fetched: false,
};

export const group = createReducer<GroupModel>(initialState, {
	[GroupActionType.GET_GROUP_LIST_SUCCEEDED](state: GroupListModel[], action: GrouprAction) {
		let groupId = store.get('groupId')
		const result:any = action.payload
		if (!groupId  && result.length){
			groupId = result[0].uuid
			store.set('groupId', groupId)
		}
		return {
			results: action.payload,
			selectedId: groupId,
			fetched: true,
		}
	},
	[GroupActionType.SET_SELECTED_ID](state: GroupModel, action: GrouprAction) {
		store.set('groupId', action.payload)
		return {
			...state,
			selectedId: action.payload,
		}
	}
});
