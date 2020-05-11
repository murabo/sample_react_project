export interface MovieModel {
    id?: number,
    name?: string,
    file?: string,
}

export interface MovieListRequestModel {
    offset: number
}

export interface MovieListModel {
    results : MovieModel[],
    count: number,
    offset: number
}
