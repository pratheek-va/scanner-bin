import Scan from "../../models/scan";
import { POST_RESULT, SET_RESULTS } from "../actions/results";

initialState = {
  scans: [],
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_RESULT:
      const newScan = new Scan(
        action.scanData.id,
        action.scanData.moneyEarned,
        action.scanData.date
      );
      return {
        ...state,
        scans: state.scans.concat(newScan),
      };
    case SET_RESULTS:
      return {
        scans: action.scans,
      };
    default:
      return state;
  }
};

export default resultReducer;
