import { combineReducers } from "redux";
import categorysReducer from "src/reducer/categoryReducer";

const rootReducer = combineReducers({
    categorys: categorysReducer
})

export default rootReducer