import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchGet, fetchPostForm, fetchDelete } from "./fetch";

import MovieActionType from '../actions/Movie/ActionType';
import * as ActionCreators from '../actions/Movie/ActionCreator';
import { selectMovie, selectGroup } from "./selector";
import { MovieListRequestModel } from "../model/MovieModel";

function* getMovie(action: ReturnType<typeof ActionCreators.getMovie.request>) {
    try {
        const group = yield select(selectGroup);
        const request:MovieListRequestModel = action.payload
        let offset = request.offset
        offset = offset <= 1 ? 0 : (offset * 10) - 10
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/movie/?offset=${offset}&limit=10`);
        yield put(ActionCreators.getMovie.success(Object.assign({}, {offset: request.offset}, data)))

    } catch (e) {
        yield put(ActionCreators.getMovie.failure(e));
    }
}

function* postMovie(action: ReturnType<typeof ActionCreators.postMovie.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchPostForm, `groups/${group.selectedId}/movie`, action.payload);
        const movie = yield select(selectMovie);
        yield put(ActionCreators.getMovie.request({offset: movie.offset}))
    } catch (e) {
        yield put(ActionCreators.postMovie.failure(e));
    }
}

function* deleteMovie(action: ReturnType<typeof ActionCreators.deleteMovie.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/movie/${action.payload.id}`);
        const movie = yield select(selectMovie);
        yield put(ActionCreators.getMovie.request({offset: movie.offset}))
    } catch (e) {
        yield put(ActionCreators.deleteMovie.failure(e));
    }
}


const movieSaga = [
	takeLatest(MovieActionType.GET_MOVIE_REQUEST, getMovie),
	takeLatest(MovieActionType.POST_MOVIE_REQUEST, postMovie),
    takeLatest(MovieActionType.DELETE_MOVIE_REQUEST, deleteMovie),
	];

export default movieSaga;
