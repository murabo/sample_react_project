import { History } from "history";
import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { RouterState, connectRouter } from 'connected-react-router'
import * as Asset from "./Asset";
import * as pressRelease from "./PressRelease";
import * as pressReleaseList from "./PressReleaseList";
import * as pressReleaseReserve from "./PressReleaseReserve";
import * as pressReleasePublish from "./PressReleasePublish";
import * as pressReleaseAI from "./PressReleaseAI";
import * as pressKit from "./PressKit";
import * as block from "./Block";
import * as Menu from "./Menu";
import * as Me from "./Me";
import * as Member from "./Member";
import * as Media from "./Media";
import * as Movie from "./Movie";
import * as Company from "./Company";
import * as Group from "./Group";
import * as Dialog from "./Dialog";
import * as SagaMonitor from "./SagaMonitor";
import * as Preview from "./Preview";

const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    ...pressRelease,
    ...pressReleaseList,
    ...pressReleaseReserve,
    ...pressReleasePublish,
    ...pressReleaseAI,
    ...pressKit,
    ...Asset,
    ...block,
    ...Menu,
    ...Me,
    ...Member,
    ...Media,
    ...Movie,
    ...Company,
    ...Group,
    ...Dialog,
    ...SagaMonitor,
    ...Preview,
})
export default rootReducer

export interface RootState {
    router: RouterState,
    form: any,
    pressRelease: any,
    pressReleaseList: any,
    pressReleaseReserve: any,
    pressReleasePublish: any,
    pressReleaseAI: any,
    pressKit: any,
    asset: any,
    block: any,
    menu: any,
    me: any,
    member: any,
    movie: any,
    media: any,
    company: any,
    group: any,
    dialog: any,
    sagaMonitor: any,
    preview: any
}
