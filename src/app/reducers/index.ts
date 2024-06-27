import { combineReducers } from "redux";

// TODO Reducers
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userDetail: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
