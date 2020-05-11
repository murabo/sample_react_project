export interface ListRequestModel {
    offset: number
}

export interface ListModel {
    results : [],
    count: number,
    offset: number,
    next?: string,
    previous?: string,
    displayCount?: number,
}
