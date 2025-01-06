import { SHOW_SIDE_BAR, HIDE_SIDE_BAR } from '../../constants';

export const showSideBar = () => {
  return {
    type: SHOW_SIDE_BAR,
  };
};

export const hiddenSideBar = () => {
  return {
    type: HIDE_SIDE_BAR,
  };
};
