import * as types from "../types";
import { HomesonoAPI } from "../../../util/WsCaller";

export const register = (userToAdd, callback) => (dispatch) => {
  HomesonoAPI.post("/auth/signup", userToAdd)
    .then((response) => {
      console.log(response);
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
export const whoami = (callback) => (dispatch) => {
  HomesonoAPI.get("/auth/whoami", {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((response) => {
      dispatch({
        type: types.WHOAMI_SUCCESS,
        payload: { user: response },
      });
      console.log("dans le then");
      callback(response);
    })
    .catch((err) => {
      console.log("dans le catch");
      callback(err.response);
    });
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: types.LOGOUT,
  });
};
