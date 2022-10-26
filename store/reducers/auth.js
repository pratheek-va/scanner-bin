import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";

initialState = {
  email: null,
  fullName: null,
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...initialState,
        email: action.email,
        fullName: action.fullName,
        token: action.token,
        userId: action.userId,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};

export default authReducer;
// const initialState = {
//   token: null,
//   userId: null,
//   didTryAutoLogin: false,
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case AUTHENTICATE:
//       return {
//         token: action.token,
//         userId: action.userId,
//         didTryAutoLogin: true,
//       };
//     case SET_DID_TRY_AL:
//       return {
//         ...state,
//         didTryAutoLogin: true,
//       };
//     case LOGOUT:
//       return {
//         ...initialState,
//         didTryAutoLogin: true,
//       };
//     // case SIGNUP:
//     //   return {
//     //     token: action.token,
//     //     userId: action.userId
//     //   };
//     default:
//       return state;
//   }
// };
