import { HomesonoAPI } from "../../../util/WsCaller";
import * as types from "../types";

export const setWhoAmI = () => ({
  type: types.SET_WHOAMI,
});
export const setWhoAmISuccess = (data) => ({
  type: types.SET_WHOAMI_SUCCESS,
  payload: data,
});
export const setWhoAmIError = (data) => ({
  type: types.SET_WHOAMI_ERROR,
  payload: data,
});

//=================================================================
//=========================== MIDDLEWARE ==========================
//=================================================================

export const register = (userToAdd, callback) => (dispatch) => {
  HomesonoAPI.post("/auth/signup", userToAdd)
    .then((response) => {
      dispatch({
        type: types.REGISTER_SUCCESS,
      });
      console.log("then");
      callback(response);
    })
    .catch((err) => {
      console.log("catch");
      callback(err.response);
    });
};

export const login = (userToLog, callback) => (dispatch) => {
  HomesonoAPI.post("/auth/login", userToLog)
    .then((response) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response.data,
      });
      if (response.data) {
        localStorage.setItem("user", response.data);
      }
      callback(response);
    })
    .catch((err) => {
      callback(err.response);
    });
};

export const whoami = (callback) => (dispatch) => {
  HomesonoAPI.get("/auth/whoami", {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((response) => {
      dispatch({
        type: types.SET_WHOAMI_SUCCESS,
        payload: response.data,
      });
      console.log("then");
      callback(response);
    })
    .catch((err) => {
      dispatch({
        type: types.SET_WHOAMI_ERROR,
        payload: err.response.status,
      });
      console.log("catch");
      callback(err.response);
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: types.LOGOUT,
  });
};
