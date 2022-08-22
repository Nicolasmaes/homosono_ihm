import * as types from "./userType";
import { HomesonoAPI } from "../../util/WsCaller";

export const setAddUser = () => ({
  type: types.SET_ADD_USER,
});
export const setAddUserSuccess = (data, status) => ({
  type: types.SET_ADD_USER_SUCCESS,
  payload: { data, status },
});
export const setAddUserError = (data) => ({
  type: types.SET_ADD_USER_ERROR,
  payload: data,
});

export const setUser = () => ({
  type: types.SET_USER,
});
export const setUserSuccess = (data) => ({
  type: types.SET_USER_SUCCESS,
  payload: data,
});
export const setUserError = (data) => ({
  type: types.SET_USER_ERROR,
  payload: data,
});

export const setUpdateUser = () => ({
  type: types.SET_UPDATE_USER,
});
export const setUpdateUserSuccess = (data) => ({
  type: types.SET_UPDATE_USER_SUCCESS,
  payload: data,
});
export const setUpdateUserError = (data) => ({
  type: types.SET_UPDATE_USER_ERROR,
  payload: data,
});

export const setDeleteUser = () => ({
  type: types.SET_DELETE_USER,
});
export const setDeleteUserSuccess = (data) => ({
  type: types.SET_DELETE_USER_SUCCESS,
  payload: data,
});
export const setDeleteUserError = (data) => ({
  type: types.SET_DELETE_USER_ERROR,
  payload: data,
});
export const selectUser = (data) => ({
  type: types.SELECT_USER,
  payload: data,
});

//=================================================================
//=========================== MIDDLEWARE ==========================
//=================================================================

export const getUsers = () => (dispatch) => {
  dispatch(setUser());
  HomesonoAPI.get("/users")
    .then((res) => {
      dispatch(setUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setUserError(err.data));
    });
};

export const getAddUser = (body) => (dispatch) => {
  dispatch(setAddUser());
  HomesonoAPI.post("/signup", body)
    .then((res) => {
      dispatch(setAddUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setAddUserError(err.data));
    });
};

export const register = (userToAdd, callback) => (dispatch) => {
  HomesonoAPI.post("/signup", userToAdd)
    .then((response) => {
      console.log(response);
      dispatch(setAddUserSuccess(response.data));
      console.log("dans le then");
      callback(response);
    })
    .catch((err) => {
      console.log("dans le catch");
      callback(err.response);
      dispatch(setAddUserError(err.data));
    });
};

export const getUpdateUser = (id, body) => (dispatch) => {
  dispatch(setUpdateUser());
  HomesonoAPI.put("/users/" + id, body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setUpdateUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setUpdateUserError(err.data));
    });
};
/* https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios
cette doc est utile pour envoyer le token lors de chaque appel */

export const getDeleteUser = (id) => (dispatch) => {
  dispatch(setDeleteUser());
  HomesonoAPI.delete("/users/" + id, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setDeleteUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setDeleteUserError(err.data));
    });
};
