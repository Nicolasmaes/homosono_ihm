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

export const setRefresh = () => ({
  type: types.SET_REFRESH,
});
export const setRefreshSuccess = (data) => ({
  type: types.SET_REFRESH_SUCCESS,
  payload: data,
});
export const setRefreshError = (data) => ({
  type: types.SET_REFRESH_ERROR,
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
      console.log("dans le then");
      callback(response);
    })
    .catch((err) => {
      console.log("dans le catch");
      callback(err.response);
    });
};
export const login = (userToLog, callback) => (dispatch) => {
  HomesonoAPI.post("/auth/login", userToLog)
    .then((response) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: response },
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

export const whoami = () => (dispatch) => {
  dispatch(setWhoAmI());
  HomesonoAPI.get("/auth/whoami", {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setWhoAmISuccess(res.data));
    })
    .catch((err) => {
      dispatch(setWhoAmIError(err.data));
    });
};
export const refresh = () => (dispatch) => {
  dispatch(setRefresh());
  HomesonoAPI.get("/auth/refresh", {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setRefreshSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setRefreshError(err.data));
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: types.LOGOUT,
  });
};
