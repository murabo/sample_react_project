import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type PressKitAction = ActionType<typeof ActionCreators>;

export default PressKitAction;
