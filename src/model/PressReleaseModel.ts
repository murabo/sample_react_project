import { string } from "prop-types";

export interface PressReleasePostRequestModel {
    isDiff?: boolean,
	isReview?: boolean,
	name?: string,
}

export interface PressReleaseListRequestModel {
	offset: number,
}

export interface PressReleasePDFRequestModel {
	isDownload?: boolean,
}

export interface PressReleaseRequestModel {
    press_id: string,
	history_id?: string
	archive?: boolean,
}

export interface PressReleaseHistoryDetailRequestModel {
	press_id: string,
	history_id?: string
}

export interface PressReleaseRequestUserModel {
    first_name: string,
    last_name: string
    color_cd: string,
	img: string
}

export interface PressReleaseCloneModel {
	press_id?: string,
	body: PressReleaseBodyModel,
	name: string
}

export interface PressReleaseModel {
	press_id?: string,
	body: PressReleaseBodyModel,
	create_user?: PressReleaseRequestUserModel,
	create_at?: Date
	name?: string,
	members?: PressReleaseMemberModel[],
	review?: {
		member: [],
		history: '',
		deadline_at: Date
	},
	review_status?: string,
	is_archive?: boolean,
	status: boolean | null,
	status_label: string,
	creators: PressReleaseRequestUserModel[]
	fetched?: Boolean,
	latestFetched?: Boolean,
}

export interface PressReleaseReviewModel {
	id: string,
	members: PressReleaseMemberModel[],
	deadline_at: Date,
	comment: string,
	history: {
		id: string,
		body: PressReleaseBodyModel,
		created_at: Date,
		is_manual: false
	}
}

export interface PressReleaseReviewResultModel {
	history?: string,
	comment?: string,
	status?: number
}

export interface PressReleaseHistoryDetailModel {
	press_id: string,
	body: PressReleaseBodyModel,
	fetched?: Boolean,
}


export interface PressReleaseBodyModel {
	component: [],
	html: HTMLElement | string,
	style: any[],
	css: string
}

export interface PressReleaseMemberModel {
	permission: number,
	user: {
		uuid: string,
		first_name: string,
		last_name: string,
		first_name_kana: string,
		last_name_kana: string,
		email: string
	}
}


export interface PressReleaseHistoryModel {
	list: PressReleaseHistoryListModel[],
	body: PressReleaseBodyModel,
	id: string,
	fetched: Boolean
}

export interface PressReleaseHistoryListModel {
	id: string,
	created_at: string,
	user: PressReleaseRequestUserModel,
}

export interface PressReleaseListModel {
	press_id: string,
	history: {
		body: PressReleaseBodyModel,
		created_at: Date
	},
	name: string,
	members?: PressReleaseMemberModel[],
	review?: {
		member: [],
		history: '',
		deadline_at: Date
	},
	review_status?: string,
	status: number | null,
	status_label: string,
	is_archive: boolean,
	create_user: any,
}

export interface PressReleaseOneTimePasswordModel {
    url: string,
    password: string
}


export interface PressReleasePDFModel {
	url: string
}


// コメント
export interface PressReleaseCommentModel {
    list: {
        done: PressReleaseCommentListModel[],
        unDone: PressReleaseCommentListModel[]
    },
    form: PressReleaseCommentFormModel,
    select: {
        id: string
    },
    done: {
        position: string
    },
	sort: []
}
export interface PressReleaseCommentListModel {
	id?: number,
	text?: string,
	is_done?: boolean,
	user?: PressReleaseRequestUserModel,
	reply?: [],
    position?: string
}

export interface PressReleaseCommentFormModel {
	position: string,
	quote: string,
	isDisplayForm: boolean
}


export interface PressReleaseCreateModel {
	dialog: boolean,
	template: {
		body: PressReleaseBodyModel,
		name: string
	},
	historyList: PressReleaseHistoryListModel[]
}


export interface PressReleaseRequestCreatorModel {
    user: []
}

