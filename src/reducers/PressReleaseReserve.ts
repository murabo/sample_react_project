import ActionType from '../actions/PressReleaseReserve/ActionType';
import Action from '../actions/PressReleaseReserve/Action';
import {
	PressReleaseReserveReviewModel,
	PressReleaseReserveModel
} from "../model/PressReleaseReserveModel";

import createReducer from "./createReducer";
import { combineReducers } from "redux";

const _d = new Date();
const tomorrow = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate() + 3, 0, 0, 0);
const nextweek = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate() + 10, 0, 0, 0);


const initialState: PressReleaseReserveModel = {
	custom: [],
	auto: {
		mail_title: "",
		mail_body: "",
		id_list: [],
		from_email: "",
		is_send: false
	},
	categories: [],
	type: '',
	released_at: tomorrow,
	deadline_at: tomorrow,
	reviewer: [],
	comment: "",
	fetched: false
};

const data = createReducer<PressReleaseReserveModel>(initialState, {
	[ActionType.GET_PRESS_RELEASE_CUSTOM_MEDIA_SUCCEEDED](state: PressReleaseReserveModel, action: Action) {
		return {
			...state,
			custom: action.payload
		}
	},
	[ActionType.GET_PRESS_RELEASE_RESERVE_REQUEST](state: PressReleaseReserveModel, action: Action) {
		return {
			...state,
			fetched: false
		}
	},
	[ActionType.GET_PRESS_RELEASE_RESERVE_SUCCEEDED](state: PressReleaseReserveModel, action: Action) {
		let reserve:any = action.payload
		const {custom_medias, auto_media, categories} = action.payload
        // カスタムメディア
		const custom = state.custom
		let customList:any = []
		let autoMedia:any = {}

		if (!categories || !categories.length) {
			// 予約情報なし
			customList = custom
			autoMedia = Object.assign(state.auto, {is_send: true}, )
		} else {
			// 予約情報あり
			if (auto_media && auto_media.id_list.length) {
				autoMedia = Object.assign(reserve.auto_media, {is_send: true}, )
			} else {
				autoMedia = reserve.auto_media
			}

			if (custom_medias) {
				custom.forEach(media => {
					let item = media;
					let target = custom_medias && custom_medias.filter(item => item.custom_media.id == media.id)
					if (target.length) {
						item = Object.assign(item, {...target[0]}, {is_send: true}, {id: item.id})
					}
					customList.push(item)
				})
			} else {
				// 予約情報なし
				customList = custom
			}
		}

		return {
			...state,
			...reserve,
			deadline_at: reserve.deadline_at || tomorrow,
			released_at: reserve.released_at || nextweek,
			reviewer: reserve.reviewer,
			custom: customList,
			auto: autoMedia,
			fetched: true
		}
	},
	[ActionType.POST_PRESS_RELEASE_MEDIA_RECOMMEND_SUCCEEDED](state: PressReleaseReserveModel, action: Action) {
		return {
			...state,
			auto: {
				...state.auto,
				id_list:action.payload.id_list,
				is_send: true
			},
			categories:action.payload.categories,
			type:action.payload.type,
		}
	},
	[ActionType.SET_PRESS_RELEASE_RESERVE_CUSTOM](state: PressReleaseReserveModel, action: Action) {
		const result:any = action.payload
		const custom = state.custom.concat()
		const list = custom.map(item => {
			if (item.id == result.id){
				return {
					...item,
					...result
				}
			} else {
				return item
			}
		})
		return {
			...state,
			custom: list
		}
	},
	[ActionType.SET_PRESS_RELEASE_RESERVE_COPY](state: PressReleaseReserveModel, action: Action) {
		const result:any = action.payload
        const list = state.custom.map(item => {
            return {
                ...item,
                [result.key]: result.value
            }
        })
		return {
			...state,
			custom: list,
			auto: {
				...state.auto,
				[result.key]: result.value
			}
		}
	},
	[ActionType.SET_PRESS_RELEASE_RESERVE_AUTO_MEDIA](state: PressReleaseReserveModel, action: Action) {
		let list = state.auto.id_list
		if (state.auto.id_list.indexOf(action.payload) >= 0) {
			list = list.filter(item => item !== action.payload);
		}else {
			list.push(action.payload)
		}
		return {
			...state,
			auto: {
				...state.auto,
				id_list: list
			}
		}
	},
	[ActionType.GET_PRESS_RELEASE_AUTO_MEDIA_SUCCEEDED](state: PressReleaseReserveModel, action: Action) {
		return {
			...state,
			auto: action.payload
		}
	},
	[ActionType.SET_PRESS_RELEASE_RESERVE_AUTO](state: PressReleaseReserveModel, action: Action) {
		return {
			...state,
			auto: {
				...state.auto,
				...action.payload
			}
		}
	},
	[ActionType.SET_PRESS_RELEASE_RESERVE_DATETIME](state: Date, action: Action) {
		return {
			...state,
			released_at: action.payload,
		}
	},
});


const initialStateReview: PressReleaseReserveReviewModel = {
	deadline_at : tomorrow,
	reviewer: [],
	comment: ""
};

const review = createReducer<PressReleaseReserveReviewModel>(initialStateReview, {
	[ActionType.SET_PRESS_RELEASE_RESERVE_REVIEW](state: Date, action: Action) {
		return action.payload
	},
});

const active = createReducer<string | undefined>('0', {
	[ActionType.SET_PRESS_RELEASE_RESERVE_ACTIVE](state: string, action: Action) {
		return action.payload
	},
});


export const pressReleaseReserve = combineReducers({
    data,
	review,
	active
});


