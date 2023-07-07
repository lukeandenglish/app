import {ENPOINTS} from '../../../api/endpoints/register';
import {
  errorBuilderMessage,
  registerCallbackEndpoints,
} from '../../../api/registerCallbackEndpoints';
import {actionSignOut} from '../../action/register';
import {deckCard} from '../deckCard';
import {
  iGmailPassword,
  iResetPassword,
  iSignUpEmail,
  iTokenResieve,
  iVerifyPassword,
} from './type';

export const REGISTER_ENDPOINTS = {
  gmailAuth: {
    query: ({
      email,
      accountId,
      access_token,
      idToken,
    }: iGmailPassword): iTokenResieve => ({
      url: ENPOINTS.AUTH.GOOGLE.ROUTE,
      method: ENPOINTS.AUTH.GOOGLE.METHOD,
      body: {email, accountId, access_token, idToken},
    }),
  },
  resetPassword: {
    query: ({userId, token, password}: iResetPassword) => ({
      url: ENPOINTS.AUTH.RESET_PASSWORD.ROUTE,
      method: ENPOINTS.AUTH.RESET_PASSWORD.METHOD,
      body: {userId, token, password},
    }),
  },
  forgotPassword: {
    query: ({type, phone, email}: iSignUpEmail) => ({
      url: ENPOINTS.AUTH.FORGOT.ROUTE,
      method: ENPOINTS.AUTH.FORGOT.METHOD,
      body: {type, phone, email},
    }),
  },
  refreshToken: {
    query: ({accessToken, refreshToken}: iTokenResieve) => ({
      url: ENPOINTS.AUTH.REFRESH.ROUTE,
      method: ENPOINTS.AUTH.REFRESH.METHOD,
      body: {accessToken, refreshToken},
    }),
  },
  phoneVerify: {
    query: ({userId, token}: iVerifyPassword): iTokenResieve => ({
      url: ENPOINTS.AUTH.VERIFY.ROUTE,
      method: ENPOINTS.AUTH.VERIFY.METHOD,
      body: {userId, token},
    }),
  },
  signUp: {
    query: ({
      email,
      password,
      type,
      phone,
    }: iSignUpEmail): {
      id: string;
      email: string;
      phone: string;
    } => ({
      url: ENPOINTS.AUTH.SIGN_UP.ROUTE,
      method: ENPOINTS.AUTH.SIGN_UP.METHOD,
      body: {email, password, type, phone},
    }),
  },
  login: {
    query: ({email, password, type, phone}: iSignUpEmail): iTokenResieve => ({
      url: ENPOINTS.AUTH.LOGIN.ROUTE,
      method: ENPOINTS.AUTH.LOGIN.METHOD,
      body: {type, phone, email, password},
    }),
    async onQueryStarted(args, {dispatch, queryFulfilled}) {
      queryFulfilled.then(() => {
        registerCallbackEndpoints({
          dispatch,
          endpoints: deckCard.endpoints.myProfile,
          args: {},
        });
      });
    },
  },
  deleteUser: {
    async queryFn(_args, queryApi) {
      try {
        queryApi.dispatch(actionSignOut());
        return {data: 'success'};
      } catch (e) {
        return errorBuilderMessage({
          args: {},
          extra: {
            apple: {
              error: false,
              value: e.message,
            },
          },
        });
      }
    },
  },
  logOutUser: {
    async queryFn(_args, queryApi) {
      try {
        queryApi.dispatch(actionSignOut());
        return {data: 'success'};
      } catch (e) {
        return errorBuilderMessage({
          args: {},
          extra: {
            apple: {
              error: false,
              value: e.message,
            },
          },
        });
      }
    },
  },
} as Record<iStack, any>;

type iStack =
  | 'logOutUser'
  | 'deleteUser'
  | 'gmailAuth'
  | 'resetPassword'
  | 'forgotPassword'
  | 'refreshToken'
  | 'phoneVerify'
  | 'signUp'
  | 'login';
