export interface AssetModel {
    id?: number,
    name?: string,
    file?: string,
}

export interface AssetListRequestModel {
    offset: number
}

export interface AssetListModel {
    results : AssetModel[],
    count: number,
    offset: number
}
