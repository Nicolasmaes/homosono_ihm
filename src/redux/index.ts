import { combineReducers } from 'redux';
import categorieReducer from '../redux/categorie/categorieReducer';
import userReducer from '../redux/user/userReducer';

const rootReducer = combineReducers({
      categorieReducer,
      userReducer,
});

export default rootReducer;
