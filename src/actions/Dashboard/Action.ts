import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type DashboardAction = ActionType<typeof ActionCreators>;

export default DashboardAction;

