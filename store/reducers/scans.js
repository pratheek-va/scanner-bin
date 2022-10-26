import React from "react";
import { SCAN_RESULT, SET_RESULT, WITHDRAW } from "./../actions/scans";

initialState = {
  noItemsScanned: 0,
  moneyEarned: 0,
};

const scansReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULT:
      state.noItemsScanned = action.noItemsScanned;
      state.moneyEarned = action.moneyEarned;
      return state;
    case SCAN_RESULT:
      state.noItemsScanned = action.noItemsScanned;
      state.moneyEarned = action.moneyEarned;
      return state;
    case WITHDRAW:
      return {
        ...state,
        moneyEarned: action.moneyEarned,
      };

    default:
      return state;
  }
};
export default scansReducer;
