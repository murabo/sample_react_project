import { all } from "redux-saga/effects";
import pressReleaseSaga from './PressReleaseSaga';
import pressReleaseListSaga from './PressReleaseListSaga';
import PressReleaseInviteSaga from './PressReleaseInviteSaga';
import PressReleaseReserveSaga from './PressReleaseReserveSaga';
import PressReleasePublishSaga from './PressReleasePublishSaga';
import PressReleaseAISaga from './PressReleaseAISaga';

import pressKitSaga from './PressKitSaga';
import BlockSaga from './BlockSaga';
import AssetSaga from './AssetSaga';
import SignSaga from './SignSaga';
import CompanySaga from './CompanySaga';
import MeSaga from './MeSaga';
import MemberSaga from './MemberSaga';
import MediaSaga from './MediaSaga';
import MovieSaga from './MovieSaga';
import GroupSaga from './GroupSaga';
import FeedbackSaga from './FeedbackSaga';

function* rootSaga() {
	yield all([
        ...AssetSaga,
		...pressReleaseSaga,
		...pressReleaseListSaga,
		...PressReleaseInviteSaga,
		...PressReleaseReserveSaga,
		...PressReleaseAISaga,
		...PressReleasePublishSaga,
		...pressKitSaga,
		...BlockSaga,
		...SignSaga,
		...CompanySaga,
		...MeSaga,
		...MemberSaga,
		...MediaSaga,
		...MovieSaga,
		...GroupSaga,
		...FeedbackSaga
	]);
}

export default rootSaga;
