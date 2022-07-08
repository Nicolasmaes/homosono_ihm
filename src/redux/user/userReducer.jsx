import * as type from "./userType";

const initialState = {
  addUser: [],
  errorAddUser: "",
  isLoadingAddUser: false,

  users: [],
  errorUser: "",
  isLoadingUser: false,

  updateUser: [],
  errorUpdateUser: "",
  isLoadingUpdateUser: false,

  deleteUser: [],
  errorDeleteUser: "",
  isLoadingDeleteUser: false,

  selectedUser: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ADD_USER:
      return { ...state, isLoadingAddUser: true };
    case type.SET_ADD_USER_SUCCESS:
      return {
        ...state,
        isLoadingAddUser: false,
        addUser: action.payload,
        users: [...state.users, action.payload.data],
        errorAddUser: "",
      };
    case type.SET_ADD_USER_ERROR:
      return {
        ...state,
        isLoadingAddUser: false,
        addUser: [],
        errorAddUser: action.payload,
      };

    case type.SET_USER:
      return { ...state, isLoadingUser: true };
    case type.SET_USER_SUCCESS:
      return {
        ...state,
        isLoadingUser: false,
        users: action.payload,
        errorUser: "",
      };
    case type.SET_USER_ERROR:
      return {
        ...state,
        isLoadingUser: false,
        users: [],
        errorUser: action.payload,
      };

    case type.SET_UPDATE_USER:
      return { ...state, isLoadingUpdateUser: true };
    case type.SET_UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoadingUpdateUser: false,
        updateUser: action.payload,
        errorUpdateUser: "",
        users: state.users.map((user) =>
          action.payload.usrIdUsrPK === user.usrIdUsrPK
            ? { ...user, usrLoginUsr: action.payload.usrLoginUsr }
            : user
        ),
      };
    case type.SET_UPDATE_USER_ERROR:
      return {
        ...state,
        isLoadingUpdateUser: false,
        updateUser: [],
        errorUpdateUser: action.payload,
      };

    case type.SET_DELETE_USER:
      return { ...state, isLoadingDeleteUser: true };
    case type.SET_DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoadingDeleteUser: false,
        deleteUser: action.payload,
        errorDeleteUser: "",
        users: state.users.filter(
          (e) => e.usrIdUsrPK !== action.payload.usrIdUsrPK
        ),
      };
    case type.SET_DELETE_USER_ERROR:
      return {
        ...state,
        isLoadingDeleteUser: false,
        deleteUser: [],
        errorDeleteUser: action.payload,
      };
    case type.SELECT_USER:
      return { ...state, selectedUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;

export const getUserById = (state, id) => {
  return state.users.find((el) => el.usrIdUsrPK === id);
};
