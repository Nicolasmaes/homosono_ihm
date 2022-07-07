import * as types from "./userType";
import { HomesonoAPI } from "../../util/WsCaller";
import { todayOutline } from "ionicons/icons";

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
export const setLoginSuccess = (data) => ({
  type: types.SET_LOGIN_SUCCESS,
  payload: data,
});

//=================================================================
//=========================== MIDDLEWARE ==========================
//=================================================================

export const getAddUser = (body, callback) => (dispatch) => {
  dispatch(setAddUser());
  HomesonoAPI.post("/signup", body)
    .then((res) => {
      if (res.status === 200) {
        dispatch(setAddUserSuccess(res.data));
      }
      callback(res);
    })
    .catch((err) => {
      // dispatch(setAddUserError(err.data));
      callback(err.response);
    });
};

export const postLogUser = (body, callback) => (dispatch) => {
  dispatch(setAddUser());
  HomesonoAPI.post("/login", body)
    .then((res) => {
      if (res.status === 200) {
        // dispatch(setLoginSuccess(res));
      }
      callback(res);
    })
    .catch((err) => {
      // dispatch(setAddUserError(err.data));
      callback(err.response);
    });
};

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

export const getUpdateUser = (id, body) => (dispatch) => {
  dispatch(setUpdateUser());
  HomesonoAPI.put("/users/" + id, body)
    .then((res) => {
      dispatch(setUpdateUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setUpdateUserError(err.data));
    });
};

export const getDeleteUser = (id) => (dispatch) => {
  dispatch(setDeleteUser());
  HomesonoAPI.delete("/users/" + id)
    .then((res) => {
      dispatch(setDeleteUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setDeleteUserError(err.data));
    });
};
