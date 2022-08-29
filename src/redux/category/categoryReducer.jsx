import * as type from "./categoryType";

const initialState = {
  addCategorie: [],
  errorAddCategorie: "",
  isLoadingAddCategorie: false,

  categorie: [],
  errorCategorie: "",
  isLoadingCategorie: false,

  categorieList: [],
  errorCategorieList: "",
  isLoadingCategorieList: false,

  updateCategorie: [],
  errorUpdateCategorie: "",
  isLoadingUpdateCategorie: false,

  deleteCategorie: [],
  errorDeleteCategorie: "",
  isLoadingDeleteCategorie: false,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ADD_CATEGORY:
      return { ...state, isLoadingAddCategorie: true };
    case type.SET_ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoadingAddCategorie: false,
        categorieList: [...state.categorieList, action.payload],
        errorAddCategorie: "",
      };
    case type.SET_ADD_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingAddCategorie: false,
        addCategorie: [],
        errorAddCategorie: action.payload,
      };

    case type.SET_CATEGORY:
      return { ...state, isLoadingCategorie: true };
    case type.SET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoadingCategorie: false,
        categorie: action.payload,
        errorCategorie: "",
      };
    case type.SET_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingCategorie: false,
        categorie: [],
        errorCategorie: action.payload,
      };

    case type.SET_CATEGORIES_LIST:
      return { ...state, isLoadingCategorieList: true };
    case type.SET_CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        isLoadingCategorieList: false,
        categorieList: action.payload,
        errorCategorieList: "",
      };
    case type.SET_CATEGORIES_LIST_ERROR:
      return {
        ...state,
        isLoadingCategorieList: false,
        categorieList: [],
        errorCategorieList: action.payload,
      };

    case type.SET_UPDATE_CATEGORY:
      return { ...state, isLoadingUpdateCategorie: true };
    case type.SET_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categorieList: state.categorieList.map((categorie) =>
          action.payload.catIdCatPK === categorie.catIdCatPK
            ? { ...categorie, catNameCat: action.payload.catNameCat }
            : categorie
        ),
      };
    case type.SET_UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingUpdateCategorie: false,
        updateCategorie: [],
        errorUpdateCategorie: action.payload,
      };

    case type.SET_DELETE_CATEGORY:
      return { ...state, isLoadingDeleteCategorie: true };

    case type.SET_DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoadingDeleteCategorie: false,
        deleteCategorie: action.payload,
        errorDeleteCategorie: "",
        categorieList: state.categorieList.filter(
          (e) => e.catIdCatPK !== action.payload.catIdCatPK
        ),
      };
    case type.SET_DELETE_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingDeleteCategorie: false,
        deleteCategorie: [],
        errorDeleteCategorie: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;

export const getCatById = (state, id) => {
  return state.categorieList.find((el) => el.catIdCatPK === id);
};
