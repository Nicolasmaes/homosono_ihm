import { combineReducers } from 'redux';
import categorieReducer from './categorie/categorieReducer';
import userReducer from './user/userReducer';
import authReducer from "./authorization/reducers/authReducer";
import messageReducer from "./authorization/reducers/messageReducer";


const rootReducer = combineReducers({
      categorieReducer,
      userReducer,
      authReducer,
      messageReducer,
});

export default rootReducer;
