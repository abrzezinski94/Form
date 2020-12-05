import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import formReducer from "./features/form/formSlice";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
  });
export default createRootReducer;
