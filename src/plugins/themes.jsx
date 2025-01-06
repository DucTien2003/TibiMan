import { createTheme } from "@mui/material/styles";
import { hexToRgb } from "@/utils";

// Light mode theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff6740",
      light: "#ff9e7a",
      dark: "#EF5000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
    success: {
      main: "#28C76F",
      light: "#4CD964",
      dark: "#009624",
      contrastText: "#fff",
    },
    info: {
      main: "#00CFE8",
      light: "#64E4FF",
      dark: "#00AEEF",
      contrastText: "#fff",
    },
    warning: {
      main: "#FF9F43",
      light: "#ffcc80",
      dark: "#f57c00",
      contrastText: "#fff",
    },
    error: {
      main: "#EA5455",
      light: "#FF7172",
      dark: "#D32F2F",
      contrastText: "#fff",
    },
    gray: {
      100: "#252525",
      200: "#424242",
      300: "#616161",
      400: "#757575",
      500: "#9e9e9e",
      600: "#bdbdbd",
      700: "#e0e0e0",
      800: "#eeeeee",
      900: "#f5f5f5",
    },
  },
});

// Dark mode theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6740",
      light: "#ff9e7a",
      dark: "#d04600",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
    success: {
      main: "#28C76F",
      light: "#4CD964",
      dark: "#009624",
      contrastText: "#fff",
    },
    info: {
      main: "#00CFE8",
      light: "#64E4FF",
      dark: "#00AEEF",
      contrastText: "#fff",
    },
    warning: {
      main: "#FF9F43",
      light: "#ffcc80",
      dark: "#f57c00",
      contrastText: "#fff",
    },
    error: {
      main: "#EA5455",
      light: "#FF7172",
      dark: "#D32F2F",
      contrastText: "#fff",
    },
    gray: {
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#252525",
    },
  },
});

const generateCSSVariables = (theme, prefix = "theme") => {
  const cssVariables = [];

  function traversePalette(palette, path = []) {
    for (const key in palette) {
      const value = palette[key];
      const newPath = [...path, key];
      if (typeof value === "object" && value !== null) {
        traversePalette(value, newPath);
      } else {
        const variableName = `--${prefix}-${newPath.join("-")}`;
        const processedValue = hexToRgb(value); // Chuyển giá trị HEX sang RGB nếu cần
        cssVariables.push(`${variableName}: ${processedValue};`);
      }
    }
  }

  traversePalette(theme.palette);
  return cssVariables.join("\n");
};

const ThemeVariables = ({ theme }) => {
  const cssVariables = generateCSSVariables(theme);

  return <style>{`:root { ${cssVariables} }`}</style>;
};

export { lightTheme, darkTheme, ThemeVariables };
