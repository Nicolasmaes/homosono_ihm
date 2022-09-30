import { combineReducers } from 'redux';
import categoryReducer from './category/categoryReducer';
import userReducer from './user/userReducer';
import authReducer from "./authorization/reducers/authReducer";
import messageReducer from "./authorization/reducers/messageReducer";
import { uploadReducer } from './upload/uploadReducer'

const rootReducer = combineReducers({
      categoryReducer,
      uploadReducer,
      userReducer,
      authReducer,
      messageReducer,
});

export default rootReducer;
