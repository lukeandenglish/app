import {
  iCurrentUserId,
  iCurrentToken,
  iSignUpEmail,
  iSignUpPhone,
} from './type';
import {ENPOINTS} from '../../../api/endpoints/register';
import {actionSignOut} from '../../action/register';
import {
  errorBuilderMessage,
  registerCallbackEndpoints,
} from '../../../api/registerCallbackEndpoints';
import {deckCard} from '../deckCard';

export const REGISTER_ENDPOINTS = {
  emailToken: {
    query: ({user_id}: iCurrentUserId) => ({
      url: ENPOINTS.EMAIL_TOKEN,
      method: ENPOINTS.POST,
      body: {user_id},
    }),
  },
  phoneToken: {
    query: ({user_id}: iCurrentUserId) => ({
      url: ENPOINTS.PHONE_TOKEN,
      method: ENPOINTS.POST,
      body: {user_id},
    }),
  },
  phoneVerify: {
    query: ({token}: iCurrentToken) => ({
      url: ENPOINTS.PHONE_VERIFY,
      method: ENPOINTS.POST,
      body: {token},
    }),
  },
  passwordReset: {
    query: ({email}: {email: iSignUpEmail['email']}) => ({
      url: ENPOINTS.PASSWORD_RESET,
      method: ENPOINTS.POST,
      body: {email},
    }),
  },
  smsPassword: {
    query: ({phone}: {phone: iSignUpPhone['phone']}) => ({
      url: ENPOINTS.PASSWORD_RESET,
      method: ENPOINTS.POST,
      body: {phone},
    }),
  },
  emailSignUp: {
    query: ({email, password}: iSignUpEmail) => ({
      url: ENPOINTS.EMAIL_SIGNUP,
      method: ENPOINTS.POST,
      body: {email, password},
    }),
  },
  emailLogin: {
    query: ({email, password}: iSignUpEmail) => ({
      url: ENPOINTS.EMAIL_LOGIN,
      method: ENPOINTS.POST,
      body: {email, password},
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
  phoneSignUp: {
    query: ({phone, password}: iSignUpPhone) => ({
      url: ENPOINTS.PHONE_SIGNUP,
      method: ENPOINTS.POST,
      body: {phone, password},
    }),
  },
  phoneLogin: {
    query: ({phone, password}: iSignUpPhone) => ({
      url: ENPOINTS.PHONE_LOGIN,
      method: ENPOINTS.POST,
      body: {phone, password},
    }),
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
};
