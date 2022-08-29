import * as types from "../types";

const user = localStorage.getItem("user");

const initialState = user
  ? { isLoggedIn: true, currentUserLoggedIn: "", user }
  : { isLoggedIn: false, currentUserLoggedIn: "", user: null };

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        currentUserLoggedIn: "",
      };
    case types.SET_WHOAMI:
      return { ...state };
    case types.SET_WHOAMI_SUCCESS:
      return {
        ...state,
        currentUserLoggedIn: action.payload,
      };
    case types.SET_WHOAMI_ERROR:
      return {
        ...state,
        currentUserLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
