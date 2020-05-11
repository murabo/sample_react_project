// actions
import MediaActionType from '../actions/Media/ActionType';
import MediaAction from '../actions/Media/Action';

// models
import { MediaModel, MediaListModel } from "../model/MediaModel";

// state
import createReducer from "./createReducer";
import { combineReducers } from "redux";

const initialStateMediaList: MediaListModel = {
	results : [],
	offset: 0,
	count: 0,
	fetched: false,
};
export const list = createReducer<MediaListModel>(initialStateMediaList, {
	[MediaActionType.GET_MEDIA_LIST_SUCCEEDED](state: MediaListModel, action: MediaAction) {
		const result:any = action.payload
		return {
			results : result.results,
			offset : result.offset,
			count: result.count,
		}
	}
});

export const allList = createReducer<MediaListModel>(initialStateMediaList, {
	[MediaActionType.GET_MEDIA_LIST_REQUEST](state: MediaListModel, action: MediaAction) {
		const result:any = action.payload
		return {
			...state,
			fetched: false,
		}
	},
	[MediaActionType.GET_MEDIA_ALL_LIST_REQUEST](state: MediaListModel, action: MediaAction) {
		return {
			...state,
			fetched: false,
		}
	},
	[MediaActionType.GET_MEDIA_ALL_LIST_SUCCEEDED](state: MediaListModel, action: MediaAction) {
		const result:any = action.payload
		return {
			fetched: true,
			results : result.results,
			offset : result.offset,
			count: result.count,
		}
	}
});

const initialState: MediaModel = {
	name: "",
	publisher: "",
	department: "",
	position: "",
	last_name: "",
	first_name: "",
	last_name_kana: "",
	email: "",
	media_type: "",
	tel: "",
	fax: "",
	memo: "",
};

export const detail = createReducer<MediaModel>(initialState, {
	[MediaActionType.GET_MEDIA_DETAIL_SUCCEEDED](state: MediaModel, action: MediaAction) {
		return action.payload
	}
});



export const media = combineReducers({
	list,
	allList,
	detail,
});


