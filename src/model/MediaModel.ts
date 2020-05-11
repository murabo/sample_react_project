export interface MediaModel {
	id?: string,
	name?: string,
	publisher?: string,
	department?: string,
	position?: string,
	last_name?: string,
	first_name?: string,
	last_name_kana?: string,
	first_name_kana?: string,
	email?: string,
	media_type?: string,
	tel?: string,
	fax?: string,
	memo?: string,
}

export interface MediaRequestModel{
	id: string | undefined
}

export interface MediaListRequestModel {
	offset: number,
	limit?: number
}

export interface MediaListModel {
	results: any,
	count?: number,
	offset: number,
	fetched?: boolean
}

