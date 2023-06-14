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
  EMAIL_LOGIN: ({payload}) => {
    let payloadToken = {
      type: payload.type,
      accessToken: payload.token,
      refreshToken: payload.refreshToken,
      expires_at: payload.expires_at,
      createdAt: Date.now(),
    };
    const userProfile = {
      ...(state?.userProfile ?? {}),
      user: {...(state?.userProfile?.user ?? {}), email: state?.email},
    };
    state.loading = false;
    state.password = '';
    state.tokens = payloadToken;
    state.userProfile = userProfile;
    state.email = userProfile?.user?.email;
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
  EMAIL_SIGNUP: () => {
    return state;
  },
  PHONE_SIGNUP: () => {
    return state;
  },
  PHONE_LOGIN: () => {
    return state;
  },

  ME_PROFILE: ({payload}) => {
    const userProfile = {
      ...(state?.userProfile ?? {}),
      user: {
        ...(state?.userProfile?.user ?? {}),
        email: payload.email,
        phone: payload.phone,
        name:
          payload.username ??
          state?.userProfile?.user?.name ??
          R.pipe(
            R.path(['email']),
            R.defaultTo(''),
            R.split('@'),
            R.defaultTo(['']),
            R.path([0]),
          )(payload),
        is_email_verified: payload.is_email_verified,
        is_phone_verified: payload.is_phone_verified,
        avatar_url: payload.avatar_url,
        avatar_file_id: payload.avatar_file_id,
        language: payload.language,
        id: payload.id,
      },
    };

    state.userProfile = userProfile;
    state.email = userProfile?.user?.email;
    state.name =
      userProfile?.user?.name ??
      R.pipe(
        R.path(['user', 'email']),
        R.defaultTo(''),
        R.split('@'),
        R.defaultTo(['']),
        R.path([0]),
      )(userProfile);
    state.image = userProfile?.user?.photo;
    state.agreements = true;

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
