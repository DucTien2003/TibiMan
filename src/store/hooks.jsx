import { useContext } from "react";

import SideBarContext from "./sideBar";
import AlertContext from "./alert";
import ThemeContext from "./theme";
import AuthContext from "./auth";

export const useSideBarStore = () => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);

  return [sideBarState, sideBarDispatch];
};

export const useAlertStore = () => {
  const [alertState, alertDispatch] = useContext(AlertContext);

  return [alertState, alertDispatch];
};

export const useThemeStore = () => {
  const [themeState, themeDispatch] = useContext(ThemeContext);

  return [themeState, themeDispatch];
};

export const useAuthStore = () => {
  const [authState, authDispatch] = useContext(AuthContext);

  return [authState, authDispatch];
};
