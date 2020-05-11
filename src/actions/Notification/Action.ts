import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type NotificationAction = ActionType<typeof ActionCreators>;

export default NotificationAction;
