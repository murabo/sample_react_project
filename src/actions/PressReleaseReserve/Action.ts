import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type PressReleaseReserveAction = ActionType<typeof ActionCreators>;

export default PressReleaseReserveAction;
