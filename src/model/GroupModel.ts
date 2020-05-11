export interface GroupListModel {
    uuid: string,
    name: string
}

export interface GroupRequestModel {
    name: string
}

export interface GroupModel {
    results:[],
    fetched: boolean,
    selectedId?: string
}
