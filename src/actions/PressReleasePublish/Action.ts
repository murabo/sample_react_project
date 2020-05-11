import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type PressReleasePublish = ActionType<typeof ActionCreators>;

export default PressReleasePublish;
