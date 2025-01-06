import { SHOW_SIDE_BAR, HIDE_SIDE_BAR } from '../../constants';

const sideBarInitialState = {
  isShow: false,
};

function sideBarReducer(state, action) {
  switch (action.type) {
    case SHOW_SIDE_BAR:
      return {
        isShow: true,
      };
    case HIDE_SIDE_BAR:
      return {
        isShow: false,
      };
    default:
      return state;
  }
}

export { sideBarReducer, sideBarInitialState };
