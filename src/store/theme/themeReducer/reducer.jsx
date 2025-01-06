import { TOGGLE_THEME, SET_THEME } from '../../constants';

const themeInitialState = {
  theme: 'light',
};

function themeReducer(state, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case SET_THEME:
      return {
        theme: action.payload.themeMode,
      };
    default:
      return state;
  }
}

export { themeReducer, themeInitialState };
