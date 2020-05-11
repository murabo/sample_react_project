// actions
import MemberActionType from '../actions/Member/ActionType';
import MemberAction from '../actions/Member/Action';
// models
import { MemberListModel, MemberModel } from "../model/MemberModel";
// state
import createReducer from "./createReducer";
import { combineReducers } from "redux";
import { BlockListModel } from "../model/BlockModel";

const initialStateMemberList: MemberListModel = {
	results : [],
	offset: 0,
	count: 0
};

export const list = createReducer<MemberListModel>(initialStateMemberList, {
	[MemberActionType.GET_MEMBER_LIST_SUCCEEDED](state: MemberModel[], action: MemberAction) {
		const result:any = action.payload
		return {
			results : result.results,
			offset : result.offset,
			count: result.count,
		}
	}
});

export const searchUsers = createReducer<MemberModel[]>([], {
	[MemberActionType.GET_MEMBER_SEARCH_SUCCEEDED](state: MemberModel[], action: MemberAction) {
		return action.payload
	}
});


export const member = combineReducers({
	list,
	searchUsers,
});

