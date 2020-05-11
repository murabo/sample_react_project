import { PressReleaseBodyModel, PressReleaseHistoryListModel } from "./PressReleaseModel";

export interface PressKitListRequestModel {
	offset: number
}

export interface PressKitRequestModel {
	id: string,
	is_public?: boolean,
	is_archive?: boolean,
}

export interface PressKitRequestUserModel {
    first_name: string,
    last_name: string
    color_cd: string,
    src: string
}

export interface PressKitCloneModel {
	id?: string,
	body: PressKitBodyModel,
	name: string
}

export interface PressKitModel {
	id?: string,
	body?: PressKitBodyModel,
	create_user?: PressKitRequestUserModel,
	create_at?: Date
	name?: string
	fetched?: boolean,
}

export interface PressKitBodyModel {
	component: [],
	html: HTMLElement | string,
	style: any[],
	css: string
}

export interface PressKitListModel {
	id: string,
	body: PressKitBodyModel,
	created_at: Date,
	name: string,
	number?: number,
	is_public?: number,
	is_archive?: boolean,
}

export interface PressKitCreateModel {
	dialog: boolean,
	template: {
		body: PressKitBodyModel,
		name: string
	},
	historyList: PressReleaseHistoryListModel[]
}

