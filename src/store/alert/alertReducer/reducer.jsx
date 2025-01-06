import { SHOW_ALERT, HIDE_ALERT } from '../../constants';

const alertInitialState = {
  isShow: false,
  message: '',
  severity: 'success',
};

function alertReducer(state, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        isShow: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case HIDE_ALERT:
      return {
        isShow: false,
      };
    default:
      return state;
  }
}

export { alertReducer, alertInitialState };
