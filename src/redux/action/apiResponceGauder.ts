import {registerApi} from '../api/registerApi';
import * as R from 'ramda';
import jwt_decode from 'jwt-decode';
import {homeApi} from '../api/homeCard';

const tokenDecode = (state, accessToken) => {
  const [f_name, l_name, phoneToken, emailToken] = R.pipe(
    R.defaultTo({}),
    R.paths([['f_name'], ['l_name'], ['phone'], ['email']]),
  )(jwt_decode(accessToken));

  state.name = f_name;
  state.surname = l_name;
  state.phone = phoneToken;
  state.email = emailToken;

  return state;
};

export const apiResponceGauder = builder =>
  builder
    .addMatcher(
      registerApi.endpoints.login.matchFulfilled,
      (state, responce) => {
        const payload = responce?.payload;
        state.token = payload;
        return tokenDecode(state, payload?.accessToken);
      },
    )
    .addMatcher(
      homeApi.endpoints.setLevelStart.matchFulfilled,
      (state, responce) => {
        const payload = responce?.payload;
        state.token = payload?.tokens;
        return tokenDecode(state, payload?.tokens?.accessToken);
      },
    )
    .addMatcher(
      registerApi.endpoints.phoneVerify.matchFulfilled,
      (state, responce) => {
        const payload = responce?.payload;
        state.token = payload;

        return tokenDecode(state, payload?.accessToken);
      },
    )
    .addMatcher(
      registerApi.endpoints.signUp.matchFulfilled,
      (state, responce) => {
        const payload = responce?.payload;
        state.email = payload.email ?? null;
        state.userId = payload.id;
        state.phone = payload.phone ?? null;

        return state;
      },
    )
    .addMatcher(
      registerApi.endpoints.handleSignGoogle.matchFulfilled,
      (state, responce) => {
        state.hame = responce?.data ?? {};

        return state;
      },
    )
    .addMatcher(
      registerApi.endpoints.signUp.matchRejected,
      (state, responce) => {
        const payload = responce?.payload;
        state.id = payload?.id;
        state.email = payload?.email;
        state.phone = payload?.phone;

        return state;
      },
    );
