import * as types from "../types";

const token = localStorage.getItem("user");

const initialState = token
  ? {
      isLoggedIn: true,
      currentUserLoggedIn: {},
    }
  : {
      isLoggedIn: false,
      currentUserLoggedIn: {},
    };

export const authReducer = (state = initialState, action: any) => {
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
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        currentUserLoggedIn: null,
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
        currentUserLoggedIn: action.payload.data,
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        currentUserLoggedIn: "",
      };
    default:
      return state;
  }
};

export default authReducer;
