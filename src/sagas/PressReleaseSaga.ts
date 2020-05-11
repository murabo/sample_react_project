import { takeLatest, put, call, select } from 'redux-saga/effects';
import { PDF_HTML } from '../util/template/PDF_HTML'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { fetchPost, fetchPost2, fetchGet, fetchDelete, fetchPatch, getJson } from "./fetch";
import { push } from 'connected-react-router'
import { selectPressRelease, selectGroup, selectPressReleaseList } from "./selector";
import { createPDFDom } from "../util/CreatePDFDom";

// action
import PressReleaseActionType from '../actions/PressRelease/ActionType';
import * as ActionCreators from '../actions/PressRelease/ActionCreator';
import * as DialogActionCreators from '../actions/Dialog/ActionCreator';
import * as PressReleaseReserveActionCreators from '../actions/PressReleaseReserve/ActionCreator';
import { PressReleaseHistoryDetailRequestModel } from "../model/PressReleaseModel";


// 詳細取得
function* getPressReleaseDetails(action: ReturnType<typeof ActionCreators.getPressReleaseDetails.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${action.payload.press_id}/`);
        yield put(ActionCreators.getPressReleaseDetails.success(data))
        if (data.status >= 1) {
            yield put(ActionCreators.getPressReleaseReviewInfo.request({press_id: action.payload.press_id}))
        }
        // 配信　承認待ち以上のstatus場合、予約情報取得
        if (data.status >= 5) {
            yield put(PressReleaseReserveActionCreators.getPressReleaseReserve.request({press_id: data.press_id}))
        }
    } catch (e) {
        yield put(push('/press_release/'))
    }
}

// 保存
function* postPressReleaseDetails(action: ReturnType<typeof ActionCreators.postPressReleaseDetails.request>) {
    const { isDiff, isReview, name } = action.payload;
    try {
	    let newFlag = false
        const pressRelease = yield select(selectPressRelease);
	    if (!pressRelease.detail.body) return
        const group = yield select(selectGroup);
        let id  = pressRelease.detail.press_id

    	if (!id){
            const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/press_info`, {name: name});
            id = data.press_id
            newFlag = true
		}

    	let review_id = ''
    	if (isDiff || isReview) {
            review_id = pressRelease.detail.review.id
        }
        const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/press_info/${id}/history`,
            {press_id: id , body : pressRelease.detail.body, review_id: review_id});

    	// 前回との差分がある場合
        if (data.press_id) {
            yield put(ActionCreators.postPressReleaseDetails.success(data))
            // 校閲内容保存の場合はReviewのhistoy_idを更新する
            if (isReview) {
                yield put(ActionCreators.postPressReleaseReviewResult.request({history: data.id}))
            }
        }

        if (newFlag) {
            yield put(ActionCreators.getPressReleaseDetails.request({press_id: id}))
            yield put(push(`/press_release/${group.selectedId}/detail/${id}/edit/`))
        }

    } catch (e) {
        yield put(ActionCreators.postPressReleaseDetails.failure(e));
    }
}


// info更新
function* patchPressReleaseInfo(action: ReturnType<typeof ActionCreators.patchPressReleaseInfo.request>) {
    try {
        const { name } = action.payload;
        const pressRelease = yield select(selectPressRelease);
        const group = yield select(selectGroup);
        const [data,error]= yield call(fetchPatch, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}`, {name});
        yield put(ActionCreators.patchPressReleaseInfo.success(data))
    } catch (e) {
        yield put(ActionCreators.patchPressReleaseInfo.failure(e));
    }
}


// 過去のバージョンに戻す
function* postPressReleaseRevert(action: ReturnType<typeof ActionCreators.postPressReleaseRevert.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        const group = yield select(selectGroup);
        const request = {
            press_id: pressRelease.history.id,
            body: pressRelease.history.body
        };
        const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/press_info/${request.press_id}/history`, request);
        yield put(ActionCreators.getPressReleaseHistory.request())
        yield put(ActionCreators.getPressReleaseDetails.request({press_id: pressRelease.detail.press_id}))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseRevert.failure(e));
    }
}

// アーカイブ
function* patchPressReleaseArchive(action: ReturnType<typeof ActionCreators.patchPressReleaseArchive.request>) {
    let request = action.payload
    try {
        const group = yield select(selectGroup);
        const [data,error]= yield call(fetchPatch, `groups/${group.selectedId}/press_info/${action.payload.press_id}`, {is_archive: action.payload.archive});
        yield put(ActionCreators.getPressReleaseList.request({offset: 0}))
    } catch (e) {
        yield put(ActionCreators.patchPressReleaseArchive.failure(e));
    }
}

// 複製
function* postPressReleaseClone(action: ReturnType<typeof ActionCreators.postPressReleaseClone.request>) {
    let request = action.payload
    try {
        const group = yield select(selectGroup);
        const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/press_info`, {name: request.name});
        request.press_id = data.press_id
        yield call(fetchPost, `groups/${group.selectedId}/press_info/${request.press_id}/history`, request);
        yield put(ActionCreators.getPressReleaseList.request({offset: 0}))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseDetails.failure(e));
    }
}

// 削除
function* deletePressReleaseDetails(action: ReturnType<typeof ActionCreators.deletePressReleaseDetails.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/press_info/${action.payload.press_id}/`);
        yield put(ActionCreators.deletePressReleaseDetails.success(data))
        yield put(ActionCreators.getPressReleaseList.request({offset: 0}))
    } catch (e) {
        yield put(ActionCreators.deletePressReleaseDetails.failure(e));
    }
}

// 過去のプレスリリース取得
function* getPressReleaseDiffHistoryDetails(action: ReturnType<typeof ActionCreators.getPressReleaseDiffHistoryDetails.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${action.payload.press_id}/history/${action.payload.history_id}/`);
        yield put(ActionCreators.getPressReleaseDiffHistoryDetails.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseDiffHistoryDetails.failure(e));
    }
}

// ワンタイムパスワード取得
function* getPressReleaseOneTimePassword(action: ReturnType<typeof ActionCreators.getPressReleaseOneTimePassword.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        //const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}`);
        yield put(ActionCreators.getPressReleaseOneTimePassword.success({
            url: 'aaa',
            password: 'bbb'
        }))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseOneTimePassword.failure(e));
    }
}

// PDF生成
function* postPressReleasePDF(action: ReturnType<typeof ActionCreators.postPressReleasePDF.request>) {
    const pressRelease = yield select(selectPressRelease);
    const {isDownload} = action.payload
    if ( !pressRelease.detail.press_id )  {
        yield put(DialogActionCreators.setDialog.request({
            isOpen: true,
            text: '保存してください'
        }))
        return
    }

    const { body } = pressRelease.detail
    const request = yield createPDFDom(body.html, body.css)

    try {
        const [data,error] = yield call(fetchPost2, `make-pdf/${pressRelease.detail.press_id}`, {...request});
        yield put(ActionCreators.postPressReleasePDF.success(data))

        if (isDownload) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.href = data.mail_url;
            link.target = '_blank';
            link.click();
            document.body.removeChild(link);
        }

    } catch (e) {
        yield put(ActionCreators.postPressReleasePDF.failure(e));
    }
}


// 履歴取得
function* getPressReleaseHistoryList(action: ReturnType<typeof ActionCreators.getPressReleaseHistory.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        if (!pressRelease.detail.press_id) return
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/history/`);
        yield put(ActionCreators.getPressReleaseHistory.success(data.results))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseHistory.failure(e));
    }
}

// プレスリリース最新取得
function* getPressReleaseHistoryDetailsLatest(action: ReturnType<typeof ActionCreators.getPressReleaseHistoryDetailsLatest.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const request:PressReleaseHistoryDetailRequestModel = action.payload
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${request.press_id}/history/latest/`);
        yield put(ActionCreators.getPressReleaseHistoryDetailsLatest.success(data))
    } catch (e) {
        yield put(push('/press_release/'))
    }
}

// 過去のプレスリリース取得
function* getPressReleaseHistoryDetails(action: ReturnType<typeof ActionCreators.getPressReleaseHistoryDetails.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${action.payload.press_id}/history/${action.payload.history_id}/`);
        yield put(ActionCreators.getPressReleaseHistoryDetails.success(data))
    } catch (e) {
        yield put(push('/press_release/'))
    }
}


// コメント一覧取得
function* getPressReleaseCommentList(action: ReturnType<typeof ActionCreators.getPressReleaseCommentList.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        if (!pressRelease.detail.press_id) return
        const [data,error] = yield call(fetchGet, `press_info/${pressRelease.detail.press_id}/comments?is_done=0`);
        yield put(ActionCreators.getPressReleaseCommentList.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseCommentList.failure(e));
    }
}

// 解決済みコメント一覧取得
function* getPressReleaseCommentDoneList(action: ReturnType<typeof ActionCreators.getPressReleaseCommentDoneList.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        if (!pressRelease.detail.press_id) return
        const [data,error] = yield call(fetchGet, `press_info/${pressRelease.detail.press_id}/comments?is_done=1`);
        yield put(ActionCreators.getPressReleaseCommentDoneList.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseCommentDoneList.failure(e));
    }
}

// コメント投稿
function* postPressReleaseComment(action: ReturnType<typeof ActionCreators.postPressReleaseComment.request>) {
    try {
        yield put(startSubmit('COMMENT'));
        const pressRelease = yield select(selectPressRelease);
        let  request = action.payload
        const { position } = pressRelease.comment.form
        if (position) {
            request = Object.assign(request, { position });
        }
        yield call(fetchPost, `press_info/${pressRelease.detail.press_id}/comments`, request );
        yield put(stopSubmit('COMMENT'));
        yield put(reset('COMMENT'));
        yield put(ActionCreators.postPressReleaseComment.success())
        yield put(ActionCreators.postPressReleaseDetails.request({isDiff: false}))
        yield put(ActionCreators.getPressReleaseCommentList.request())
    } catch (e) {
        yield put(ActionCreators.postPressReleaseComment.failure(e));
    }
}

// 解決済み、コメント変更
function* patchPressReleaseComment(action: ReturnType<typeof ActionCreators.patchPressReleaseComment.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        const { text, is_done, id } = action.payload
        let send: { [key: string]: any; } = {}
        if (text) send = {text}
        if (is_done) send = {is_done:true}
        const [data,error] = yield call(fetchPatch, `press_info/${pressRelease.detail.press_id}/comments/${action.payload.id}`, send);
        const target = pressRelease.comment.list.unDone.filter(item => item.id === id);
        yield put(ActionCreators.patchPressReleaseComment.success(''));
        yield put(ActionCreators.getPressReleaseCommentList.request())
    } catch (e) {
        yield put(ActionCreators.postPressReleaseComment.failure(e));
    }
}

// リプライ
function* postPressReleaseReply(action: ReturnType<typeof ActionCreators.postPressReleaseReply.request>) {
    try {
        yield put(startSubmit('REPLY'));
        if (!action.payload.text) return
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchPost, `press_info/${pressRelease.detail.press_id}/comments/${action.payload.id}/reply`, {text: action.payload.text} );
        yield put(stopSubmit('REPLY'));
        yield put(reset('REPLY'));
        yield put(ActionCreators.getPressReleaseCommentList.request())
    } catch (e) {
        yield put(ActionCreators.postPressReleaseReply.failure(e));
    }
}



// テンプレート取得
function* getPressReleaseTemplate(action: ReturnType<typeof ActionCreators.getPressReleaseTemplate.request>) {
    try {
        const data = yield call(getJson, action.payload);
        yield put(ActionCreators.getPressReleaseTemplate.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseTemplate.failure(e));
    }
}

// テンプレート一覧取得
function* getPressReleaseTemplateList(action: ReturnType<typeof ActionCreators.getPressReleaseTemplateList.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/`);
        yield put(ActionCreators.getPressReleaseTemplateList.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseTemplateList.failure(e));
    }
}

// 承認依頼
function* postPressReleaseReviewRequest(action: ReturnType<typeof ActionCreators.postPressReleaseReviewRequest.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchPost, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/reviews`, action.payload);
        yield put(ActionCreators.getPressReleaseDetails.request({press_id: pressRelease.detail.press_id}))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseReviewRequest.failure(e));
    }
}


// 承認依頼取り下げ
function* deletePressReleaseReviewRequest(action: ReturnType<typeof ActionCreators.deletePressReleaseReviewRequest.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/reviews/${pressRelease.detail.review.id}/`);
        yield put(ActionCreators.getPressReleaseDetails.request({press_id: pressRelease.detail.press_id}))
    } catch (e) {
        yield put(ActionCreators.deletePressReleaseReviewRequest.failure(e));
    }
}

// 承認結果
function* postPressReleaseReviewResult(action: ReturnType<typeof ActionCreators.postPressReleaseReviewResult.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchPost, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/reviews/${pressRelease.detail.review.id}/status`, action.payload);
        // yield put(push(`/press_release/${group.selectedId}/detail/${pressRelease.detail.press_id}`))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseReviewResult.failure(e));
    }
}

// レビュー一覧取得
function* getPressReleaseReviewList(action: ReturnType<typeof ActionCreators.getPressReleaseReviewList.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/reviews/?offset=0&limit=100`);
        yield put(ActionCreators.getPressReleaseReviewList.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseReviewList.failure(e));
    }
}

// レビュー詳細取得
function* getPressReleaseReviewInfo(action: ReturnType<typeof ActionCreators.getPressReleaseReviewInfo.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        if (!pressRelease.detail.review.id) return
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/reviews/${pressRelease.detail.review.id}/`);
        yield put(ActionCreators.getPressReleaseReviewInfo.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseReviewInfo.failure(e));
    }
}

// 編集者追加
function* postPressReleaseCreator(action: ReturnType<typeof ActionCreators.postPressReleaseCreator.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchPost, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/creators`, action.payload);
        yield put(ActionCreators.getPressReleaseDetails.request({press_id: pressRelease.detail.press_id}))

    } catch (e) {
        yield put(ActionCreators.postPressReleaseCreator.failure(e));
    }
}

const pressReleaseSaga = [
	takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_DETAILS_REQUEST, getPressReleaseDetails),
	takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_DETAILS_REQUEST, postPressReleaseDetails),
    takeLatest(PressReleaseActionType.PATCH_PRESS_RELEASE_INFO_REQUEST, patchPressReleaseInfo),
    takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_REVERT_REQUEST, postPressReleaseRevert),
    takeLatest(PressReleaseActionType.PATCH_PRESS_RELEASE_ARCHIVE_REQUEST, patchPressReleaseArchive),
    takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_CLONE_REQUEST, postPressReleaseClone),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_DIFF_HISTORY_DETAILS_REQUEST, getPressReleaseDiffHistoryDetails),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_ONETIME_PASSWORD_REQUEST, getPressReleaseOneTimePassword),
    takeLatest(PressReleaseActionType.DELETE_PRESS_RELEASE_DETAILS_REQUEST, deletePressReleaseDetails),
    takeLatest(PressReleaseActionType.PATCH_PRESS_RELEASE_COMMENT_REQUEST, patchPressReleaseComment),
	takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_PDF_REQUEST, postPressReleasePDF),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_HISTORY_LIST_REQUEST, getPressReleaseHistoryList),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_LATEST_REQUEST, getPressReleaseHistoryDetailsLatest),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_REQUEST, getPressReleaseHistoryDetails),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_COMMENT_LIST_REQUEST, getPressReleaseCommentList),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_COMMENT_DONE_LIST_REQUEST, getPressReleaseCommentDoneList),
    takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_COMMENT_REQUEST, postPressReleaseComment),
    takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_REPLY_REQUEST, postPressReleaseReply),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_TEMPLATE_REQUEST, getPressReleaseTemplate),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_TEMPLATE_LIST_REQUEST, getPressReleaseTemplateList),
    takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_REVIEW_REQUEST_REQUEST, postPressReleaseReviewRequest),
    takeLatest(PressReleaseActionType.DELETE_PRESS_RELEASE_REVIEW_REQUEST, deletePressReleaseReviewRequest),
    takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_REVIEW_RESULT_REQUEST, postPressReleaseReviewResult),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_REVIEW_LIST_REQUEST, getPressReleaseReviewList),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_REVIEW_INFO_REQUEST, getPressReleaseReviewInfo),
    takeLatest(PressReleaseActionType.POST_PRESS_RELEASE_CREATOR_REQUEST, postPressReleaseCreator),
];

export default pressReleaseSaga;
