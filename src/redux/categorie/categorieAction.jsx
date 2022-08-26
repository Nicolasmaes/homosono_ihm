import * as types from "./categorieType";
import { HomesonoAPI } from "../../util/WsCaller";

export const setAddCategorie = () => ({
  type: types.SET_ADD_CATEGORIE,
});
export const setAddCategorieSuccess = (data) => ({
  type: types.SET_ADD_CATEGORIE_SUCCESS,
  payload: data,
});
export const setAddCategorieError = (data) => ({
  type: types.SET_ADD_CATEGORIE_ERROR,
  payload: data,
});

export const setCategorie = () => ({
  type: types.SET_CATEGORIE,
});
export const setCategorieSuccess = (data) => ({
  type: types.SET_CATEGORIE_SUCCESS,
  payload: data,
});
export const setCategorieError = (data) => ({
  type: types.SET_CATEGORIE_ERROR,
  payload: data,
});

export const setCategorieList = () => ({
  type: types.SET_CATEGORIE_LIST,
});
export const setCategorieListSuccess = (data) => ({
  type: types.SET_CATEGORIE_LIST_SUCCESS,
  payload: data,
});
export const setCategorieListError = (data) => ({
  type: types.SET_CATEGORIE_LIST_ERROR,
  payload: data,
});

export const setUpdateCategorie = () => ({
  type: types.SET_UPDATE_CATEGORIE,
});
export const setUpdateCategorieSuccess = (data) => ({
  type: types.SET_UPDATE_CATEGORIE_SUCCESS,
  payload: data,
});
export const setUpdateCategorieError = (data) => ({
  type: types.SET_UPDATE_CATEGORIE_ERROR,
  payload: data,
});

export const setDeleteCategorie = () => ({
  type: types.SET_DELETE_CATEGORIE,
});
export const setDeleteCategorieSuccess = (data) => ({
  type: types.SET_DELETE_CATEGORIE_SUCCESS,
  payload: data,
});
export const setDeleteCategorieError = (data) => ({
  type: types.SET_DELETE_CATEGORIE_ERROR,
  payload: data,
});
export const selectCategory = (data) => ({
  type: types.SELECT_CATEGORY,
  payload: data,
});

//=================================================================
//=========================== MIDDLEWARE ==========================
//=================================================================

export const getAddCategorie = (body) => (dispatch) => {
  dispatch(setAddCategorie());
  HomesonoAPI.post("/categories", body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setAddCategorieSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setAddCategorieError(err.data));
    });
};

export const getCategorieById = (id) => (dispatch) => {
  dispatch(setCategorie());
  HomesonoAPI.get("/categories/" + id)
    .then((res) => {
      dispatch(setCategorieSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setCategorieError(err.data));
    });
};

export const getCategorieList = () => (dispatch) => {
  dispatch(setCategorieList());
  HomesonoAPI.get("/categories", {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setCategorieListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setCategorieListError(err.data));
    });
};

export const getUpdateCategorie = (id, name) => (dispatch) => {
  dispatch(setUpdateCategorie());
  HomesonoAPI.put("/categories/" + id, name, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setUpdateCategorieSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setUpdateCategorieError(err.data));
    });
};

export const getDeleteCategorie = (id) => (dispatch) => {
  dispatch(setDeleteCategorie());
  HomesonoAPI.delete("/categories/" + id, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setDeleteCategorieSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setDeleteCategorieError(err.data));
    });
};
