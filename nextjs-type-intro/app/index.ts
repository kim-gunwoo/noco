import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./couter/couter.slice";

const reducer = (state: CombinedState<any>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }

  return combineReducers({
    counter,
  })(state, action);
};

export default reducer;
