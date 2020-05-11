import ActionType from './ActionType';
import {
	PressReleaseReserveRequestModel,
	PressReleaseReserveModel,
    PressReleaseReserveReviewModel,
	PressReleaseReserveReviewResultModel,
	ReserveMediaRecommendModel
} from "../../model/PressReleaseReserveModel";
import { createAsyncAction } from 'typesafe-actions';


export const postPressReleaseMediaRecommend = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_MEDIA_RECOMMEND_REQUEST,
	ActionType.POST_PRESS_RELEASE_MEDIA_RECOMMEND_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_MEDIA_RECOMMEND_FAILED
)<ReserveMediaRecommendModel, ReserveMediaRecommendModel, Error>();

export const getPressReleaseReserve = createAsyncAction(
    ActionType.GET_PRESS_RELEASE_RESERVE_REQUEST,
    ActionType.GET_PRESS_RELEASE_RESERVE_SUCCEEDED,
    ActionType.GET_PRESS_RELEASE_RESERVE_FAILED
)<PressReleaseReserveRequestModel, PressReleaseReserveModel, Error>();

export const postPressReleaseReserve = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_RESERVE_REQUEST,
	ActionType.POST_PRESS_RELEASE_RESERVE_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_RESERVE_FAILED
)<PressReleaseReserveReviewModel, void, Error>();

export const deletePressReleaseReserve = createAsyncAction(
	ActionType.DELETE_PRESS_RELEASE_RESERVE_REQUEST,
	ActionType.DELETE_PRESS_RELEASE_RESERVE_SUCCEEDED,
	ActionType.DELETE_PRESS_RELEASE_RESERVE_FAILED
)<void, void, Error>();


export const getPressReleaseCustomMedia = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_CUSTOM_MEDIA_REQUEST,
	ActionType.GET_PRESS_RELEASE_CUSTOM_MEDIA_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_CUSTOM_MEDIA_FAILED
)<void, PressReleaseReserveModel, Error>();

export const getPressReleaseAutoMedia = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_AUTO_MEDIA_REQUEST,
	ActionType.GET_PRESS_RELEASE_AUTO_MEDIA_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_AUTO_MEDIA_FAILED
)<void, PressReleaseReserveModel, Error>();


export const postPressReleaseReserveReviewResult = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_RESERVE_REVIEW_RESULT_REQUEST,
	ActionType.POST_PRESS_RELEASE_RESERVE_REVIEW_RESULT_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_RESERVE_REVIEW_RESULT_FAILED
)<PressReleaseReserveReviewResultModel, PressReleaseReserveModel, Error>();


export const setPressReleaseReserveCustom = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_RESERVE_CUSTOM,
	'',
	'',
)<any, void, void>();


export const setPressReleaseReserveAuto = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_RESERVE_AUTO,
	'',
	'',
)<any, void, void>();


export const setPressReleaseReserveDatetime = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_RESERVE_DATETIME,
	'',
	'',
)<Date, void, void>();


export const setPressReleaseReserveCopy = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_RESERVE_COPY,
	'',
	'',
)<any, void, void>();

export const setPressReleaseReserveActive = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_RESERVE_ACTIVE,
	'',
	'',
)<string, void, void>();


export const setPressReleaseReserveReview = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_RESERVE_REVIEW,
	'',
	'',
)<PressReleaseReserveReviewModel, void, Error>();

export const setPressReleaseReserveAutoMedia = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_RESERVE_AUTO_MEDIA,
	'',
	'',
)<PressReleaseReserveReviewModel, void, Error>();
