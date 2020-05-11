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

