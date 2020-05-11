import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type MovieAction = ActionType<typeof ActionCreators>;

export default MovieAction;
