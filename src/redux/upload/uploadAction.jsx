import * as types from "./uploadType";
import { HomesonoAPI } from "../../util/WsCaller";

export const setUploadCategoryPicture = () => ({
  type: types.SET_UPLOAD_CATEGORY_PICTURE,
});
export const setUploadCategoryPictureSuccess = (data) => ({
  type: types.SET_UPLOAD_CATEGORY_PICTURE_SUCCESS,
  payload: data,
});
export const setUploadCategoryPictureError = (data) => ({
  type: types.SET_UPLOAD_CATEGORY_PICTURE_ERROR,
  payload: data,
});

export const setDeleteCategoryPicture = () => ({
  type: types.SET_DELETE_CATEGORY_PICTURE,
});
export const setDeleteCategoryPictureSuccess = (data) => ({
  type: types.SET_DELETE_CATEGORY_PICTURE_SUCCESS,
  payload: data,
});
export const setDeleteCategoryPictureError = (data) => ({
  type: types.SET_DELETE_CATEGORY_PICTURE_ERROR,
  payload: data,
});

//=================================================================
//=========================== MIDDLEWARE ==========================
//=================================================================

export const getUploadCategoryPicture = (id) => (dispatch) => {
  dispatch(setUploadCategoryPicture());
  HomesonoAPI.get("/upload/" + id)
    .then((res) => {
      dispatch(setUploadCategoryPictureSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setUploadCategoryPictureError(err.data));
    });
};

export const getDeleteCategoryPicture = () => (dispatch) => {
  dispatch(setDeleteCategoryPicture());
  HomesonoAPI.get("/ENDPOINT")
    .then((res) => {
      dispatch(setDeleteCategoryPictureSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setDeleteCategoryPictureError(err.data));
    });
};
