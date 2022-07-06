import * as type from "./categorieType";

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

  selectedCategory: "",
};

export const categorieReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ADD_CATEGORIE:
      return { ...state, isLoadingAddCategorie: true };
    case type.SET_ADD_CATEGORIE_SUCCESS:
      return {
        ...state,
        isLoadingAddCategorie: false,
        categorieList: [...state.categorieList, action.payload],
        errorAddCategorie: "",
      };
    case type.SET_ADD_CATEGORIE_ERROR:
      return {
        ...state,
        isLoadingAddCategorie: false,
        addCategorie: [],
        errorAddCategorie: action.payload,
      };

    case type.SET_CATEGORIE:
      return { ...state, isLoadingCategorie: true };
    case type.SET_CATEGORIE_SUCCESS:
      return {
        ...state,
        isLoadingCategorie: false,
        categorie: action.payload,
        errorCategorie: "",
      };
    case type.SET_CATEGORIE_ERROR:
      return {
        ...state,
        isLoadingCategorie: false,
        categorie: [],
        errorCategorie: action.payload,
      };

    case type.SET_CATEGORIE_LIST:
      return { ...state, isLoadingCategorieList: true };
    case type.SET_CATEGORIE_LIST_SUCCESS:
      return {
        ...state,
        isLoadingCategorieList: false,
        categorieList: action.payload,
        errorCategorieList: "",
      };
    case type.SET_CATEGORIE_LIST_ERROR:
      return {
        ...state,
        isLoadingCategorieList: false,
        categorieList: [],
        errorCategorieList: action.payload,
      };

    case type.SET_UPDATE_CATEGORIE:
      return { ...state, isLoadingUpdateCategorie: true };
    case type.SET_UPDATE_CATEGORIE_SUCCESS:
      return {
        ...state,
        categorieList: state.categorieList.map((categorie) =>
          action.payload.catIdCatPK === categorie.catIdCatPK
            ? { ...categorie, catNameCat: action.payload.catNameCat }
            : categorie
        ),
      };
    case type.SET_UPDATE_CATEGORIE_ERROR:
      return {
        ...state,
        isLoadingUpdateCategorie: false,
        updateCategorie: [],
        errorUpdateCategorie: action.payload,
      };

    case type.SET_DELETE_CATEGORIE:
      return { ...state, isLoadingDeleteCategorie: true };

    case type.SET_DELETE_CATEGORIE_SUCCESS:
      return {
        ...state,
        isLoadingDeleteCategorie: false,
        deleteCategorie: action.payload,
        errorDeleteCategorie: "",
        categorieList: state.categorieList.filter(
          (e) => e.catIdCatPK !== action.payload.catIdCatPK
        ),
      };
    case type.SET_DELETE_CATEGORIE_ERROR:
      return {
        ...state,
        isLoadingDeleteCategorie: false,
        deleteCategorie: [],
        errorDeleteCategorie: action.payload,
      };
    case type.SELECT_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    default:
      return state;
  }
};

export default categorieReducer;

export const getCatById = (state, id) => {
  return state.categorieList.find((el) => el.catIdCatPK === id);
};
