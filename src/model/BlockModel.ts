export interface BlockModel {
	title: string,
	content: string,
	id?: string,
	category?: string,
	attributes?: {};
}

export interface BlockRequestModel {
	id?: number,
	title?: string,
	content?: string,
}

export interface BlockListRequestModel {
	offset: number
}

export interface BlockListModel {
	results : BlockModel[],
	count: number,
	offset: number
}
