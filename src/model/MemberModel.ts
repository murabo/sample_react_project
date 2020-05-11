export interface MemberModel {
	uuid :number
	last_name_kana? :string,
	first_name_kana? :string,
	last_name? :string,
	first_name? :string,
	department? :string,
	email? :string,
	tel? :string,
	img?:string,
	color_cd?: string,
	permission?: string
}

export interface MemberRequestModel {
	uuid:number[],
	email:string[],
	permission: number
}

export interface MemberListRequestModel {
	offset: number,
	limit?: number
}

export interface MemberListModel {
	results : MemberModel[],
	count: number,
	offset: number
}
