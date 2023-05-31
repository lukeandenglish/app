export const MODERATE_STYLE = state => ({
  IS_LOADING: () => {
    state.loading = true;
    return state;
  },
  DIS_LOADING: () => {
    state.loading = false;
    return state;
  },
  EMAIL_LOGIN: () => {
    return state;
  },
  EMAIL_SIGNUP: () => {
    return state;
  },
  PHONE_SIGNUP: () => {
    return state;
  },
  PHONE_LOGIN: () => {
    return state;
  },
  EMAIL_LOGIN_REJECT: () => {
    state.password = '';
    return state;
  },
  EMAIL_SIGNUP_REJECT: () => {
    state.password = '';
    return state;
  },
  PHONE_SIGNUP_REJECT: () => {
    state.password = '';
    return state;
  },
  PHONE_LOGIN_REJECT: () => {
    state.password = '';
    return state;
  },
});
