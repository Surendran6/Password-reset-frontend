import loginReducer from "./loginAuth";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    accessLogin:loginReducer,
})

export default allReducers