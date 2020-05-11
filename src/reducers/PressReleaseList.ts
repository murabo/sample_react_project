import PressReleaseActionType from '../actions/PressRelease/ActionType';
import PressReleaseAction from '../actions/PressRelease/Action';
import {
	PressReleaseListModel
} from "../model/PressReleaseModel";

import {
    ListModel
} from "../model/ListModel";

import createReducer from "./createReducer";
import { combineReducers } from "redux";

const initialStateList: ListModel = {
	results : [],
	offset: 0,
	count: 0,
};

const search = createReducer<ListModel>(initialStateList, {
    [PressReleaseActionType.GET_PRESS_RELEASE_LIST_SUCCEEDED](state: PressReleaseListModel[], action: PressReleaseAction) {
        return action.payload
    }
});

const publicList = createReducer<ListModel>(initialStateList, {
	[PressReleaseActionType.GET_PRESS_RELEASE_LIST_PUBLIC_SUCCEEDED](state: PressReleaseListModel[], action: PressReleaseAction) {
		return action.payload
	}
});

const archive = createReducer<ListModel>(initialStateList, {
	[PressReleaseActionType.GET_PRESS_RELEASE_LIST_ARCHIVE_SUCCEEDED](state: PressReleaseListModel[], action: PressReleaseAction) {
		return action.payload
	}
});

export const pressReleaseList = combineReducers({
    search,
	publicList,
	archive
});
