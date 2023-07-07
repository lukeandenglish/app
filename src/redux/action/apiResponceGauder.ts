import {registerApi} from '../api/registerApi';
import {MODERATE_STYLE} from '../extraReducer/helper';

export const apiResponceGauder = builder =>
  builder
    .addMatcher(
      registerApi.endpoints.login.matchFulfilled,
      (state, responce) => {
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).EMAIL_LOGIN(
          responce,
        );
      },
    )
    .addMatcher(
      registerApi.endpoints.signUp.matchRejected,
      (state, responce) => {
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).EMAIL_SIGNUP(
          responce,
        );
      },
    );
