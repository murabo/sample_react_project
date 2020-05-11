import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type PressReleaseInviteAction = ActionType<typeof ActionCreators>;

export default PressReleaseInviteAction;
