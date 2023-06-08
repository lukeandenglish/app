import * as R from 'ramda';
import {iGmailToken} from '../api/registerApi/type';

export const MODERATE_STYLE = state => ({
  IS_LOADING: () => {
    state.loading = true;
    return state;
  },
  GMAIL_LOGIN: (payload: iGmailToken, userProfile: any) => {
    state.loading = false;
    payload.modeRegister = 'GOOGLE_SIGN';
    payload.createdAt = Date.now();
    state.email = userProfile?.user?.email;
    state.userProfile = userProfile;
    state.tokens = payload as iGmailToken;
    state.name =
      userProfile?.user?.name ??
      R.pipe(
        R.path(['user', 'email']),
        R.defaultTo(''),
        R.split('@'),
        R.path([0]),
      )(userProfile);
    state.image = userProfile?.user?.photo;
    state.agreements = true;
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
    // state.password = '';
    return state;
  },
  EMAIL_SIGNUP_REJECT: () => {
    // state.password = '';
    return state;
  },
  PHONE_SIGNUP_REJECT: () => {
    // state.password = '';
    return state;
  },
  PHONE_LOGIN_REJECT: () => {
    // state.password = '';
    return state;
  },
  GMAIL_LOGIN_REJECT: () => {
    state.loading = false;
    return state;
  },
});
