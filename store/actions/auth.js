import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (token, userId, fullName, email, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
      fullName: fullName,
      email: email,
    });
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

// const clearLogoutTimer = () => {
//   if (timer) clearTimeout(timer);
// };

// const setLogoutTimer = (expirationTime) => {
//   return (dispatch) => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };

export const signup = (fullName, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq4FMgP_RVcGAK9VEGEAMXiQT1v6Sh7kc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: fullName,
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errResData = await response.json();
      const errorId = errResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email already exists!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    // dispatch(
    //   authenticate(
    //     resData.token,
    //     resData.userId,
    //     resData.displayName,
    //     resData.email,
    //     parseInt(resData.expiresIn) * 1000
    //   )
    // );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.displayName,
      resData.email,
      expirationDate
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCq4FMgP_RVcGAK9VEGEAMXiQT1v6Sh7kc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errResData = await response.json();
      const errorId = errResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND" || errorId === "INVALID_PASSWORD") {
        message = "Invalid email or password";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.token,
        resData.userId,
        resData.displayName,
        resData.email,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.displayName,
      resData.email,
      expirationDate
    );
  };
};

const saveDataToStorage = (token, userId, fullName, email, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      fullName: fullName,
      email: email,
      expiryDate: expirationDate,
    })
  );
};
