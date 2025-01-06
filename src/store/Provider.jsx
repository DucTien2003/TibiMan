import { useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme, ThemeVariables } from "@/plugins/themes";

import ThemeContext from "./theme";
import AlertContext from "./alert";
import SideBarContext from "./sideBar";
import AuthContext from "./auth";

import {
  sideBarReducer,
  sideBarInitialState,
} from "./sideBar/sideBarReducer/reducer";
import { alertReducer, alertInitialState } from "./alert/alertReducer/reducer";
import { themeReducer, themeInitialState } from "./theme/themeReducer/reducer";
import { authReducer, authInitialState } from "./auth/authReducer/reducer";

function Provider({ children }) {
  // SideBar State
  const [sideBarState, sideBarDispatch] = useReducer(
    sideBarReducer,
    sideBarInitialState
  );

  // Alert State
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );

  // Theme State
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );

  // Auth State
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <ThemeProvider
      theme={themeState.theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <ThemeContext.Provider value={[themeState, themeDispatch]}>
        <ThemeVariables
          theme={themeState.theme === "light" ? lightTheme : darkTheme}
        />
        <AuthContext.Provider value={[authState, authDispatch]}>
          <SideBarContext.Provider value={[sideBarState, sideBarDispatch]}>
            <AlertContext.Provider value={[alertState, alertDispatch]}>
              {children}
            </AlertContext.Provider>
          </SideBarContext.Provider>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default Provider;
