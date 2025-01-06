import DefaultButton from '@/components/common/buttons/DefaultButton';
import { MdLightMode, MdDarkMode } from '@/utils';
import { useThemeStore, themeActions } from '@/store';

function ThemeMode() {
  const [themeState, themeDispatch] = useThemeStore();

  return (
    <DefaultButton
      variant="outlined"
      className="h-10 w-10 !p-0"
      onClick={() => themeDispatch(themeActions.toggleTheme())}>
      {themeState.theme === 'light' ? (
        <MdLightMode size={20} />
      ) : (
        <MdDarkMode size={20} />
      )}
    </DefaultButton>
  );
}

export default ThemeMode;
