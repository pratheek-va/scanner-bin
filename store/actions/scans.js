import React from "react";

export const SCAN_RESULT = "SCAN_RESULT";
export const SET_RESULT = "SET_RESULT";
export const WITHDRAW = "WITHDRAW";

export const fetchInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    let noItemsScanned = 0;
    let moneyEarned = 0;
    const response = await fetch(
      `https://scannerbin-e625f-default-rtdb.firebaseio.com/userinfo/${userId}/user-data.json?auth=${token}`
    );

    const resData = await response.json();

    if (resData) {
      noItemsScanned = resData.noItemsScanned;
      moneyEarned = resData.moneyEarned;
    }

    console.log(resData);

    dispatch({ type: SET_RESULT, noItemsScanned, moneyEarned });
  };
};

export const scanResult = (reward) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    let noItemsScanned = getState().scans.noItemsScanned;
    let moneyEarned = getState().scans.moneyEarned;

    noItemsScanned += 1;
    moneyEarned += reward;

    const response = await fetch(
      `https://scannerbin-e625f-default-rtdb.firebaseio.com/userinfo/${userId}/user-data.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noItemsScanned,
          moneyEarned,
        }),
      }
    );
    const resData = await response.json();

    console.log(resData);
    dispatch({ type: SCAN_RESULT, noItemsScanned, moneyEarned });
  };
};

export const withdraw = (withdrawalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const noItemsScanned = getState().scans.noItemsScanned;
    let moneyEarned = getState().scans.moneyEarned;

    moneyEarned -= withdrawalAmount;

    const response = await fetch(
      `https://scannerbin-e625f-default-rtdb.firebaseio.com/userinfo/${userId}/user-data.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noItemsScanned,
          moneyEarned,
        }),
      }
    );
    const resData = await response.json();

    console.log(resData);
    dispatch({ type: WITHDRAW, moneyEarned });
  };
};
