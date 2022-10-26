import Scan from "../../models/scan";

export const POST_RESULT = "POST_RESULT";
export const SET_RESULTS = "SET_RESULTS";

export const postResult = (reward) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const dateScanned = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    let noItemsScanned = getState().scans.noItemsScanned;

    noItemsScanned += 1;

    const response = await fetch(
      `https://scannerbin-e625f-default-rtdb.firebaseio.com/userinfo/${userId}/scans.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noItemsScanned,
          reward,
          date: dateScanned,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: POST_RESULT,
      scanData: {
        id: resData.name,
        moneyEarned: reward,
        date: dateScanned,
      },
    });
  };
};

export const fetchResults = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://scannerbin-e625f-default-rtdb.firebaseio.com/userinfo/${userId}/scans.json?auth=${token}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedScans = [];

    console.log(resData);

    for (const key in resData) {
      loadedScans.unshift(
        new Scan(key, resData[key].reward, resData[key].date)
      );
    }

    dispatch({ type: SET_RESULTS, scans: loadedScans });
  };
};
