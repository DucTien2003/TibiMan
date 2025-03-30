import { TOGGLE_THEME, SET_THEME } from "../../constants";

const getStoredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme ? storedTheme : "light";
};

const themeInitialState = {
  theme: getStoredTheme(),
};

function themeReducer(state, action) {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return {
        theme: newTheme,
      };
    }
    case SET_THEME: {
      const newTheme = action.payload.themeMode;
      localStorage.setItem("theme", newTheme);
      return {
        theme: newTheme,
      };
    }
    default:
      return state;
  }
}

export { themeReducer, themeInitialState };
