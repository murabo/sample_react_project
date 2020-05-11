import PressReleaseActionType from '../actions/PressRelease/ActionType';
import PressReleaseAction from '../actions/PressRelease/Action';
import {
	PressReleaseListModel,
	PressReleaseModel,
	PressReleaseRequestModel,
	PressReleasePDFModel,
	PressReleaseCommentModel,
	PressReleaseOneTimePasswordModel,
	PressReleaseCommentListModel,
	PressReleaseCreateModel,
	PressReleaseHistoryDetailModel,
	PressReleaseReviewModel,
	PressReleaseHistoryModel,
} from "../model/PressReleaseModel";

import {
    ListModel
} from "../model/ListModel";

import createReducer from "./createReducer";
import { combineReducers } from "redux";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 3);
tomorrow.setMinutes(0);

const initialStateDetail: PressReleaseModel = {
	press_id: "",
	body: {
		component: [],
		html: '',
		style: [],
		css: ''
	},
	create_user: {
		first_name: "",
		last_name: "",
        color_cd: "",
		img: "",
	},
	create_at: tomorrow,
	name: '',
	members: [],
	review: {
		member: [],
		history: '',
		deadline_at: tomorrow
	},
	review_status: '',
	status_label: '',
	status: null,
	creators: [],
    fetched: false,
	latestFetched: false
};

const detail = createReducer<PressReleaseModel>(initialStateDetail, {
	[PressReleaseActionType.GET_PRESS_RELEASE_LIST_SUCCEEDED](state: PressReleaseListModel[], action: PressReleaseAction) {
		//　一覧開いたときに初期化
		return initialStateDetail
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_DETAILS_REQUEST](state: PressReleaseModel, action: PressReleaseAction) {
		return {
			...state,
			fetched: false,
		}
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_DETAILS_SUCCEEDED](state: PressReleaseModel, action: PressReleaseAction) {
		const result:any = action.payload
		return {
            fetched: true,
			...result,
			body: result.history.body,
			create_at: result.history.created_at,
		}
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_LATEST_SUCCEEDED](state: PressReleaseModel, action: PressReleaseAction) {
		const result:any = action.payload
		return {
			...state,
			latestFetched: true,
			body: result.body,
		}
	},
	[PressReleaseActionType.POST_PRESS_RELEASE_DETAILS_REQUEST](state: PressReleaseRequestModel, action: PressReleaseAction) {
		return {
			...state,
			fetched: false
		}
	},
    [PressReleaseActionType.POST_PRESS_RELEASE_DETAILS_SUCCEEDED](state: PressReleaseRequestModel, action: PressReleaseAction) {
		const result:any = action.payload
        return {
            ...state,
            fetched: true,
			press_id: result.press_id,
			body: result.body,
			create_at: result.create_at,
        }
    },
    [PressReleaseActionType.POST_PRESS_RELEASE_REVERT_REQUEST](state: PressReleaseModel, action: PressReleaseAction) {
        return {
			...state,
            fetched: false,
        }
    },
	[PressReleaseActionType.POST_PRESS_RELEASE_REVERT_SUCCEEDED](state: PressReleaseModel, action: PressReleaseAction) {
		const result:any = action.payload
        return {
			...state,
            fetched: true,
			press_id: result.press_id,
			body: result.history.body,
			create_at: result.history.create_at,
			create_user: result.create_user,
			name: result.name,
			members: result.members,
        }
	},
	[PressReleaseActionType.SET_PRESS_RELEASE_DETAILS](state: PressReleaseModel, action: PressReleaseAction) {
		const result:any = action.payload
        return {
			...state,
			...result
        }
	},
	[PressReleaseActionType.SET_PRESS_RELEASE_TEMPLATE](state: PressReleaseModel, action: PressReleaseAction) {
		const result:any = action.payload
		return {
			...state,
			...result,
		}
	},
	[PressReleaseActionType.PATCH_PRESS_RELEASE_INFO_SUCCEEDED](state: PressReleaseModel, action: PressReleaseAction) {
		const result:any = action.payload
		return {
			...state,
			...result,
		}
	}
});



const initialStateHistoryModel: PressReleaseHistoryDetailModel = {
	press_id: "",
	body: {
		component: [],
		html: '',
		style: [],
		css: ''
	},
	fetched: false,
};


const diff = createReducer<PressReleaseHistoryDetailModel>(initialStateHistoryModel, {
	[PressReleaseActionType.GET_PRESS_RELEASE_DIFF_HISTORY_DETAILS_REQUEST](state: PressReleaseHistoryDetailModel, action: PressReleaseAction) {
		return {
			...state,
			fetched: false,
		}
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_DIFF_HISTORY_DETAILS_SUCCEEDED](state: PressReleaseHistoryDetailModel, action: PressReleaseAction) {
		const result:any = action.payload
		return {
			...result,
			fetched: true,
		}
	},
	[PressReleaseActionType.SET_PRESS_RELEASE_DETAILS_DIFF](state: PressReleaseHistoryDetailModel, action: PressReleaseAction) {
		const result:any = action.payload
		return {
			...state,
			body: result.body,
			name: result.name,
		}
	}
});

const initialStateOneTimePassword: PressReleaseOneTimePasswordModel = {
	password: '',
	url: '',
};

const oneTimePassword = createReducer<PressReleaseOneTimePasswordModel>(initialStateOneTimePassword, {
    [PressReleaseActionType.GET_PRESS_RELEASE_ONETIME_PASSWORD_SUCCEEDED](state: PressReleaseOneTimePasswordModel, action: PressReleaseAction) {
        return action.payload
    }
});

const initialStatePDF: PressReleasePDFModel = {
	url: '',
};

const PDF = createReducer<PressReleasePDFModel>(initialStatePDF, {
	[PressReleaseActionType.POST_PRESS_RELEASE_PDF_REQUEST](state: PressReleasePDFModel, action: PressReleaseAction) {
		return {url :''}
	},
	[PressReleaseActionType.POST_PRESS_RELEASE_PDF_SUCCEEDED](state: PressReleasePDFModel, action: PressReleaseAction) {
		return action.payload
	}
});

const initialStateHistory: PressReleaseHistoryModel = {
	list: [],
	body: {
		component: [],
		html: '',
		style: [],
		css: ''
	},
	id: "",
	fetched: false
};


const history = createReducer<PressReleaseHistoryModel>(initialStateHistory, {
	[PressReleaseActionType.GET_PRESS_RELEASE_HISTORY_LIST_SUCCEEDED](state: PressReleaseModel[], action: PressReleaseAction) {
		return {
			...state,
			list: action.payload
		}
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_SUCCEEDED](state: PressReleaseModel[], action: PressReleaseAction) {
		let result:any = action.payload
		return {
			...state,
			body: result.body,
			id: result.press_id,
			fetched: true
		}
	}
});


const initialStateComments: PressReleaseCommentModel = {
	list: {
		done: [],
		unDone: []
	},
	form: {
		position: '',
		quote: '',
		isDisplayForm: false
	},
	select: {
		id: ''
	},
	done: {
        position: ''
	},
	sort: []
};


const comment = createReducer<PressReleaseCommentModel>(initialStateComments, {
	[PressReleaseActionType.GET_PRESS_RELEASE_COMMENT_LIST_SUCCEEDED](state: PressReleaseCommentModel, action: PressReleaseAction) {
		let unDone:any = action.payload
		if (state.sort.length) {
            const list:PressReleaseCommentListModel[] = []
            state.sort.map((value) => {
                const result = unDone.filter(item => item.position === value);
                if (result.length) list.push(result[0])
			})
            unDone = list
		} else {
			unDone = action.payload
		}
		return {
			...state,
			list: {
				done: state.list.done,
				unDone: unDone
			}
		}
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_COMMENT_DONE_LIST_SUCCEEDED](state: PressReleaseCommentModel, action: PressReleaseAction) {
		return {
			...state,
			list: {
				done: action.payload,
				unDone: state.list.unDone
			}
		}
	},
    [PressReleaseActionType.SET_PRESS_RELEASE_COMMENT_SORT](state: PressReleaseCommentModel, action: PressReleaseAction) {
		let sort:any = action.payload
		const list:PressReleaseCommentListModel[] = []
		sort.map((value) => {
			const result = state.list.unDone.filter(item => item.position === value);
			if (result.length) list.push(result[0])
		})
        return {
            ...state,
			list: {
				done: state.list.done,
				unDone: list
			},
            sort: action.payload
        }
    },
    [PressReleaseActionType.POST_PRESS_RELEASE_COMMENT_SUCCEEDED](state: PressReleaseCommentModel, action: PressReleaseAction) {
        return {
            ...state,
            form: {
                position: '',
                quote: '',
                isDisplayForm: false
            }
        }
    },
	[PressReleaseActionType.PATCH_PRESS_RELEASE_COMMENT_SUCCEEDED](state: PressReleaseCommentModel, action: PressReleaseAction) {
		return {
			...state,
			done: {
                position: action.payload
			}
		}
	},
    [PressReleaseActionType.SET_PRESS_RELEASE_COMMENT_DONE](state: PressReleaseCommentModel, action: PressReleaseAction) {
        return {
            ...state,
            done: {
                position: ''
            }
        }
    },
	[PressReleaseActionType.SET_PRESS_RELEASE_COMMENT_POSITION](state: PressReleaseCommentModel, action: PressReleaseAction) {
		let request:any = action.payload
		return {
			...state,
            select: {
                id: ''
            },
			form : request
		}
	},
    [PressReleaseActionType.SET_PRESS_RELEASE_COMMENT_HOVER](state: PressReleaseCommentModel, action: PressReleaseAction) {
        return {
            ...state,
            select: {
            	id: action.payload
			}
        }
    }
});

const initialStateCreate:  PressReleaseCreateModel = {
	dialog: false,
	template: {
		body: {
			component: [],
			html: '',
			style: [],
			css: '',
		},
		name: ''
	},
	historyList: []
};

const create = createReducer<PressReleaseCreateModel>(initialStateCreate, {
	[PressReleaseActionType.SET_PRESS_RELEASE_CREATE_DIALOG](state: PressReleaseCreateModel, action: PressReleaseAction) {
		return {
			...state,
			dialog :action.payload
		}
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_TEMPLATE_SUCCEEDED](state: PressReleaseCreateModel, action: PressReleaseAction) {
		return {
			...state,
			template :action.payload
		}
	},
	[PressReleaseActionType.GET_PRESS_RELEASE_TEMPLATE_LIST_SUCCEEDED](state: PressReleaseCreateModel, action: PressReleaseAction) {
		return {
			...state,
			template :action.payload[0].history,
			historyList :action.payload
		}
	}
});

const initialStateReview:  PressReleaseReviewModel = {
	id: "",
	members: [],
	deadline_at: tomorrow,
	comment: "",
	history: {
		id: "",
		body: {
			component: [],
			html: '',
			style: [],
			css: '',
		},
		is_manual: false,
		created_at: tomorrow,
	},
};

const review = createReducer<PressReleaseReviewModel>(initialStateReview, {
	[PressReleaseActionType.GET_PRESS_RELEASE_REVIEW_INFO_SUCCEEDED](state: PressReleaseReviewModel, action: PressReleaseAction) {
		return action.payload
	}
});


const initialStateReviewList: ListModel = {
    results : [],
    offset: 0,
    count: 0
};

const reviewList = createReducer<ListModel>(initialStateReviewList, {
    [PressReleaseActionType.GET_PRESS_RELEASE_REVIEW_LIST_SUCCEEDED](state: ListModel, action: PressReleaseAction) {
        const result:any = action.payload
    	return action.payload
    }
});

export const pressRelease = combineReducers({
	detail,
	diff,
	PDF,
	history,
	comment,
    oneTimePassword,
	create,
	review,
    reviewList
});
