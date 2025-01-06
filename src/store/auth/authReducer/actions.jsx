import { LOGIN, LOGOUT, UPDATE } from "../../constants";

export const login = (useInfo) => {
  return {
    type: LOGIN,
    payload: useInfo,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const update = (useInfo) => {
  return {
    type: UPDATE,
    payload: useInfo,
  };
};
