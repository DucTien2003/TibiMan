import { LOGIN, LOGOUT, UPDATE } from "../../constants";

const authInitialState = {
  id: "",
  role: "",
  name: "",
  email: "",
  avatar: "",
  username: "",
  createdAt: "",
  updatedAt: "",
};

function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return {
        ...authInitialState,
      };
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export { authReducer, authInitialState };
