import * as type from './uploadType';

const initialState = {
	uploadCategoryPicture : [],
	errorUploadCategoryPicture : '',
	isLoadingUploadCategoryPicture : false,

	deleteCategoryPicture : [],
	errorDeleteCategoryPicture : '',
	isLoadingDeleteCategoryPicture : false,

};

export const uploadReducer = (state = initialState, action) => {
	switch (action.type){
		case(type.SET_UPLOAD_CATEGORY_PICTURE):
			return {...state,
				isLoadingUploadCategoryPicture : true
		}
		case(type.SET_UPLOAD_CATEGORY_PICTURE_SUCCESS):
			return {...state,
				isLoadingUploadCategoryPicture : false,
				uploadCategoryPicture : action.payload,
				errorUploadCategoryPicture : '',
		}
		case(type.SET_UPLOAD_CATEGORY_PICTURE_ERROR):
			return {...state,
				isLoadingUploadCategoryPicture : false,
				uploadCategoryPicture : [],
				errorUploadCategoryPicture : action.payload,
		}

		case(type.SET_DELETE_CATEGORY_PICTURE):
			return {...state,
				isLoadingDeleteCategoryPicture : true
		}
		case(type.SET_DELETE_CATEGORY_PICTURE_SUCCESS):
			return {...state,
				isLoadingDeleteCategoryPicture : false,
				deleteCategoryPicture : action.payload,
				errorDeleteCategoryPicture : '',
		}
		case(type.SET_DELETE_CATEGORY_PICTURE_ERROR):
			return {...state,
				isLoadingDeleteCategoryPicture : false,
				deleteCategoryPicture : [],
				errorDeleteCategoryPicture : action.payload,
		}

		default :
			return state
	}
}

export default uploadReducer