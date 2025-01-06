import { SHOW_ALERT, HIDE_ALERT } from '../../constants';

export const showAlert = (message, severity) => {
  return {
    type: SHOW_ALERT,
    payload: { message, severity },
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};
