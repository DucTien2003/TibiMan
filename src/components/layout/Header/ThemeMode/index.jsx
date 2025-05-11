import { themeActions, useThemeStore } from "@/store";
import { MdDarkMode, MdLightMode } from "@/utils";

function ThemeMode() {
  const [themeState, themeDispatch] = useThemeStore();

  return (
    <div
      className="hover-theme-white-20-bg hover-theme-primary-text flex w-full cursor-pointer items-center rounded p-3"
      onClick={() => themeDispatch(themeActions.toggleTheme())}>
      {/* Theme mode */}
      <div className="flex items-center gap-2">
        {themeState.theme === "light" ? <MdLightMode /> : <MdDarkMode />}
        <span>Mode: </span>
        <span className="theme-primary-text font-medium">
          {themeState.theme === "light" ? "Light" : "Dark"}
        </span>
      </div>
    </div>
  );
}

export default ThemeMode;
