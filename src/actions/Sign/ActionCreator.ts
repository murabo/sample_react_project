import ActionType from './ActionType';
import { SignUpModel, SignInModel, SignUpActivateModel } from '../../model/SignModel';
import { createAsyncAction } from 'typesafe-actions';

export const postSignUp = createAsyncAction(
	ActionType.POST_SIGN_UP_REQUEST,
	ActionType.POST_SIGN_UP_SUCCEEDED,
	ActionType.POST_SIGN_UP_FAILED
)<SignUpModel, void, Error>();

export const postSignIn = createAsyncAction(
	ActionType.POST_SIGN_IN_REQUEST,
	ActionType.POST_SIGN_IN_SUCCEEDED,
	ActionType.POST_SIGN_IN_FAILED,
)<SignInModel, void, Error>();

export const getSignUpActivate = createAsyncAction(
	ActionType.GET_SIGN_UP_ACTIVATE_REQUEST,
	ActionType.GET_SIGN_UP_ACTIVATE_SUCCEEDED,
	ActionType.GET_SIGN_UP_ACTIVATE_FAILED,
)<SignUpActivateModel, void, Error>();
