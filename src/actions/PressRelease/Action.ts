import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type PressReleaseAction = ActionType<typeof ActionCreators>;

export default PressReleaseAction;
