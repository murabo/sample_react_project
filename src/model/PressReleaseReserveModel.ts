import { MediaModel } from "./MediaModel";

export interface ReserveMediaRecommendModel {
	uuid?: string,
	categories: string[],
	type:number,
	id_list?: []
}

export interface PressReleaseReserveRequestModel {
	press_id: string,

}


export interface PressReleaseReserveModel {
	auto: ReserveAutoModel,
	custom: ReserveCustomModel[],
	released_at: Date | null,
	deadline_at,
	reviewer: [],
	comment: string,
	categories:[],
	type,
	fetched: boolean
}

export interface ReserveAutoModel {
	mail_title: string,
	mail_body: string,
    id_list: number[],
    from_email :string,
    is_send: boolean
}

export interface ReserveCustomModel {
	mail_title: string,
	mail_body: string,
	id: string | undefined,
	from_email :string,
	is_send: boolean,
	publisher?: string,
	department?: string,
	position?: string,
	name?: string,
	last_name?: string,
	first_name?: string,
	last_name_kana?: string,
	first_name_kana?: string,
	custom_media: {
		id?: string,
	}
}

export interface PressReleaseReserveReviewModel {
	deadline_at? :Date,
	reviewer: [],
    comment: string
}

export interface PressReleaseReserveReviewResultModel {
	comment?: string,
	status: number
}
