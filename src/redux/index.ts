import { combineReducers } from 'redux';
import categoryReducer from './category/categoryReducer';
import userReducer from './user/userReducer';
import authReducer from "./authorization/reducers/authReducer";
import messageReducer from "./authorization/reducers/messageReducer";


const rootReducer = combineReducers({
      categoryReducer,
      userReducer,
      authReducer,
      messageReducer,
});

export default rootReducer;
