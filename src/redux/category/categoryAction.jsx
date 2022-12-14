import { HomesonoAPI } from "../../util/WsCaller";
import * as types from "./categoryType";

export const setCategoriesList = () => ({
  type: types.SET_CATEGORIES_LIST,
});
export const setCategoriesListSuccess = (data) => ({
  type: types.SET_CATEGORIES_LIST_SUCCESS,
  payload: data,
});
export const setCategoriesListError = (data) => ({
  type: types.SET_CATEGORIES_LIST_ERROR,
  payload: data,
});

export const setCategory = () => ({
  type: types.SET_CATEGORY,
});
export const setCategorySuccess = (data) => ({
  type: types.SET_CATEGORY_SUCCESS,
  payload: data,
});
export const setCategoryError = (data) => ({
  type: types.SET_CATEGORY_ERROR,
  payload: data,
});

export const setAddCategory = () => ({
  type: types.SET_ADD_CATEGORY,
});
export const setAddCategorySuccess = (data) => ({
  type: types.SET_ADD_CATEGORY_SUCCESS,
  payload: data,
});
export const setAddCategoryError = (data) => ({
  type: types.SET_ADD_CATEGORY_ERROR,
  payload: data,
});

export const setUpdateCategory = () => ({
  type: types.SET_UPDATE_CATEGORY,
});
export const setUpdateCategorySuccess = (data) => ({
  type: types.SET_UPDATE_CATEGORY_SUCCESS,
  payload: data,
});
export const setUpdateCategoryError = (data) => ({
  type: types.SET_UPDATE_CATEGORY_ERROR,
  payload: data,
});

export const setDeleteCategory = () => ({
  type: types.SET_DELETE_CATEGORY,
});
export const setDeleteCategorySuccess = (data) => ({
  type: types.SET_DELETE_CATEGORY_SUCCESS,
  payload: data,
});
export const setDeleteCategoryError = (data) => ({
  type: types.SET_DELETE_CATEGORY_ERROR,
  payload: data,
});

export const setUploadCategoryPicture = () => ({
  type: types.SET_UPLOAD_CATEGORY_PICTURE,
});
export const setUploadCategoryPictureSuccess = (data, id) => ({
  type: types.SET_UPLOAD_CATEGORY_PICTURE_SUCCESS,
  payload: { data, id },
});
export const setUploadCategoryPictureError = (data) => ({
  type: types.SET_UPLOAD_CATEGORY_PICTURE_ERROR,
  payload: data,
});

//=================================================================
//=========================== MIDDLEWARE ==========================
//=================================================================

export const getCategoriesList = () => (dispatch) => {
  dispatch(setCategoriesList());
  HomesonoAPI.get("/categories")
    .then((res) => {
      dispatch(setCategoriesListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setCategoriesListError(err.data));
    });
};

export const getCategorieById = (id) => (dispatch) => {
  dispatch(setCategoriesList());
  HomesonoAPI.get("/categories/" + id)
    .then((res) => {
      dispatch(setCategorySuccess(res.data));
    })
    .catch((err) => {
      dispatch(setCategoryError(err.data));
    });
};

export const getAddCategory = (body) => (dispatch) => {
  dispatch(setAddCategory());
  HomesonoAPI.post("/categories", body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setAddCategorySuccess(res.data));
    })
    .catch((err) => {
      dispatch(setAddCategoryError(err.data));
    });
};

export const getUpdateCategory = (id, name) => (dispatch) => {
  dispatch(setUpdateCategory());
  HomesonoAPI.put("/categories/" + id, name, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setUpdateCategorySuccess(res.data));
    })
    .catch((err) => {
      dispatch(setUpdateCategoryError(err.data));
    });
};

export const getDeleteCategory = (id) => (dispatch) => {
  dispatch(setDeleteCategory());
  HomesonoAPI.delete("/categories/" + id, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
  })
    .then((res) => {
      dispatch(setDeleteCategorySuccess(res.data));
    })
    .catch((err) => {
      dispatch(setDeleteCategoryError(err.data));
    });
};

export const getUploadCategoryPicture = (file, id, callback) => (dispatch) => {
  let formData = new FormData();
  formData.append("file", file);

  dispatch(setUploadCategoryPicture());
  HomesonoAPI.post("/upload/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      dispatch(setUploadCategoryPictureSuccess(res.data, id));
      callback(res);
    })
    .catch((err) => {
      dispatch(setUploadCategoryPictureError(`${err.response.status}`));
      callback(err.response);
    });
};
