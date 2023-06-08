import {registerApi} from '../api/registerApi';
import {MODERATE_STYLE} from '../extraReducer/helper';

export const apiResponceGauder = builder =>
  builder
    .addMatcher(
      registerApi.endpoints.emailLogin.matchFulfilled,
      (state, responce) => {
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).EMAIL_LOGIN(
          responce,
        );
      },
    )
    .addMatcher(
      registerApi.endpoints.emailSignUp.matchFulfilled,
      (state, responce) => {
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).EMAIL_SIGNUP(
          responce,
        );
      },
    )
    .addMatcher(
      registerApi.endpoints.phoneSignUp.matchFulfilled,
      (state, responce) => {
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).PHONE_LOGIN(
          responce,
        );
      },
    )
    .addMatcher(
      registerApi.endpoints.phoneLogin.matchFulfilled,
      (state, responce) => {
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).PHONE_SIGNUP(
          responce,
        );
      },
    )
    .addMatcher(
      registerApi.endpoints.emailLogin.matchRejected,
      (state, responce) => {
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).EMAIL_LOGIN(
          responce,
        );
      },
    )
    .addMatcher(
      registerApi.endpoints.emailSignUp.matchRejected,
      (state, responce) => {
        return MODERATE_STYLE(
          MODERATE_STYLE(state).DIS_LOADING(),
        ).EMAIL_SIGNUP_REJECT(responce);
      },
    )
    .addMatcher(
      registerApi.endpoints.phoneSignUp.matchRejected,
      (state, responce) => {
        return MODERATE_STYLE(
          MODERATE_STYLE(state).DIS_LOADING(),
        ).PHONE_SIGNUP_REJECT(responce);
      },
    )
    .addMatcher(
      registerApi.endpoints.phoneLogin.matchRejected,
      (state, responce) => {
        return MODERATE_STYLE(
          MODERATE_STYLE(state).DIS_LOADING(),
        ).PHONE_LOGIN_REJECT(responce);
      },
    );
