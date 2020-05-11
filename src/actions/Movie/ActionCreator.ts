import ActionType from './ActionType';
import { MovieModel, MovieListRequestModel } from '../../model/MovieModel';
import { createAsyncAction } from 'typesafe-actions';

export const getMovie = createAsyncAction(
	ActionType.GET_MOVIE_REQUEST,
	ActionType.GET_MOVIE_SUCCEEDED,
	ActionType.GET_MOVIE_FAILED,
)<MovieListRequestModel, MovieModel[], Error>();

export const postMovie = createAsyncAction(
	ActionType.POST_MOVIE_REQUEST,
	ActionType.POST_MOVIE_SUCCEEDED,
	ActionType.POST_MOVIE_FAILED,
)<MovieModel, void, Error>();

export const deleteMovie = createAsyncAction(
    ActionType.DELETE_MOVIE_REQUEST,
    ActionType.DELETE_MOVIE_SUCCEEDED,
    ActionType.DELETE_MOVIE_FAILED
)<MovieModel, void, Error>();

