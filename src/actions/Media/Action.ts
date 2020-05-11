import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type MediaAction = ActionType<typeof ActionCreators>;

export default MediaAction;
