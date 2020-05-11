import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type MenuAction = ActionType<typeof ActionCreators>;

export default MenuAction;
