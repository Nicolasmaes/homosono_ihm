import * as types from "../types";

const initialState = {};

export const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_MESSAGE:
      return { message: payload };
    case types.CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
};
export default messageReducer;
