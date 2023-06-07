/* eslint-disable @typescript-eslint/no-shadow */
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import * as R from 'ramda';
import {Alert} from 'react-native';
import {GOOGLE_ID} from '../../../../cred';
import {registerCallbackEndpoints} from '../../../api/store';
import REDUCER_PATH from '../../../config/reducer';
import {isCheckElement} from '../../../helper';
import {actionSignOut, iGmailToken} from '../../action/register';

export interface iSignUpEmail {
  email: string;
  password: string;
}
export interface iCurrentUserId {
  user_id: number;
}
export interface iCurrentToken {
  token: string;
}
export interface iSignUpPhone {
  phone: string;
  password: string;
  å;
}

export const registerApi = createApi({
  reducerPath: REDUCER_PATH.REGISTER,

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.lukeandenglish.com/',
    prepareHeaders: headers => {
      headers.set(
        'x-api-key',
        'a5de976afb69939cd1e0bfc0da797ca5ab10047ecc0a54301dcc01f2bc2a7142',
      );
      headers.set('Access-Control-Allow-Origin', '*');

      return headers;
    },
  }),
  endpoints: builder => ({
    emailToken: builder.query<iCurrentUserId, any>({
      query: ({user_id}: iCurrentUserId) => ({
        url: 'email-token',
        method: 'POST',
        body: {user_id},
      }),
    }),
    phoneToken: builder.query<iCurrentUserId, any>({
      query: ({user_id}: iCurrentUserId) => ({
        url: 'phone-token',
        method: 'POST',
        body: {user_id},
      }),
    }),

    phoneVerify: builder.query<iCurrentToken, any>({
      query: ({token}: iCurrentToken) => ({
        url: 'phone-verify',
        method: 'POST',
        body: {token},
      }),
    }),
    passwordReset: builder.query<{email: iSignUpEmail['email']}, any>({
      query: ({email}: {email: iSignUpEmail['email']}) => ({
        url: 'password-reset',
        method: 'POST',
        body: {email},
      }),
    }),
    smsPassword: builder.query<{phone: iSignUpPhone['phone']}, any>({
      query: ({phone}: {phone: iSignUpPhone['phone']}) => ({
        url: 'password-reset',
        method: 'POST',
        body: {phone},
      }),
    }),

    emailSignUp: builder.query<iSignUpEmail, any>({
      query: ({email, password}: iSignUpEmail) => ({
        url: 'email-signup',
        method: 'POST',
        body: {email, password},
      }),
    }),
    emailLogin: builder.query<iSignUpEmail, any>({
      query: ({email, password}: iSignUpEmail) => ({
        url: 'email-login',
        method: 'POST',
        body: {email, password},
      }),
    }),
    phoneSignUp: builder.query<iSignUpPhone, any>({
      query: ({phone, password}: iSignUpPhone) => ({
        url: 'phone-signup',
        method: 'POST',
        body: {phone, password},
      }),
    }),
    phoneLogin: builder.query<iSignUpPhone, any>({
      query: ({phone, password}: iSignUpPhone) => ({
        url: 'phone-login',
        method: 'POST',
        body: {phone, password},
      }),
    }),
    logOutUser: builder.query<iSignUpEmail, any>({
      async queryFn(_args, queryApi) {
        try {
          queryApi.dispatch(actionSignOut());

          return {data: 'success'};
        } catch (e) {
          return e.message;
        }
      },
    }),
    deleteUser: builder.query<iSignUpEmail, any>({
      async queryFn(_args, queryApi) {
        try {
          queryApi.dispatch(actionSignOut());

          return {data: 'success'};
        } catch (e) {
          return e.message;
        }
      },
    }),
    initialGoogleSignUp: builder.query<iSignUpEmail, any>({
      queryFn(_args) {
        try {
          GoogleSignin.configure({
            webClientId: GOOGLE_ID,
          });
          // console.log(firebase.auth().currentUser);
          return {data: 'success'};
        } catch (e) {
          return e.message;
        }
      },
    }),
    handleSignGoogle: builder.query<iSignUpEmail, any>({
      async queryFn(_args) {
        try {
          await auth().signOut().catch(console.log);
          await GoogleSignin.hasPlayServices();
          const userProfile = await GoogleSignin.signIn();
          const tokens: iGmailToken = await GoogleSignin.getTokens();
          return new Promise((res, reject) => {
            try {
              auth().onAuthStateChanged(() => {
                const responce = {data: {tokens, userProfile}};
                res(responce);
              });
            } catch (e) {
              reject({error: e?.message});
            }
          });
        } catch (e) {
          return e.message;
        }
      },
    }),
    handleSignApple: builder.query<iSignUpEmail, any>({
      async queryFn(_args) {
        try {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          });

          if (!appleAuthRequestResponse.identityToken) {
            return {error: 'Apple Sign-In failed - no identify token returned'};
          }

          const {identityToken, nonce} = appleAuthRequestResponse;
          const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce,
          );
          const tokens = await auth().signInWithCredential(appleCredential);
          return new Promise((res, reject) => {
            auth().onAuthStateChanged(userProfile => {
              try {
                Alert.alert(JSON.stringify(userProfile, null, 5));
                const responce = {data: {tokens, userProfile}};
                res(responce);
                return responce;
              } catch (e) {
                reject({error: e?.message});
              }
            });
          });
        } catch (e) {
          return {error: e.message};
        }
      },
    }),
    signUpQuery: builder.query<iSignUpEmail, any>({
      async queryFn(_args, queryApi) {
        const emailEndpoints = registerApi.endpoints.emailSignUp;
        const phoneEndpoints = registerApi.endpoints.phoneSignUp;

        const [data, password, agreements] = R.pipe(
          R.path([REDUCER_PATH.USER]),
          R.paths([
            ['email'],
            ['password'],
            ['agreements'],
            ['name'],
            ['image'],
          ]),
        )(queryApi.getState());

        if (!agreements) {
          return {
            data: null,
            error: {
              msg: 'error',
              args: {data, password, agreements},
              extra: {
                data: {error: false, value: ''},
                password: {error: false, value: ''},
                agreements: {error: true, value: ''},
              },
            },
          };
        }

        const {args, phone, email} = isCheckElement(data);
        if (phone) {
          const responce = await registerCallbackEndpoints({
            endpoints: phoneEndpoints,
            args: {phone: args, email: null, password: password.trim()},
            dispatch: queryApi.dispatch,
          });
          return responce;
        }
        if (email) {
          const responce = await registerCallbackEndpoints({
            endpoints: emailEndpoints,
            args: {phone: null, email: args, password: password.trim()},
            dispatch: queryApi.dispatch,
          });
          return responce;
        }

        return {
          data: null,
          error: {
            msg: 'error',
            args: {data, password, agreements},
            extra: {
              data: {error: true, value: ''},
              password: {error: true, value: ''},
              agreements: {error: false, value: ''},
            },
          },
        };
      },
    }),
    loginQuery: builder.query<iSignUpEmail, any>({
      async queryFn(_args, queryApi) {
        const emailEndpoints = registerApi.endpoints.emailLogin;
        const phoneEndpoints = registerApi.endpoints.phoneLogin;

        const [data, password, agreements] = R.pipe(
          R.path([REDUCER_PATH.USER]),
          R.paths([
            ['email'],
            ['password'],
            ['agreements'],
            ['name'],
            ['image'],
          ]),
        )(queryApi.getState());

        const {args, phone, email} = isCheckElement(data);
        if (phone) {
          const responce = await registerCallbackEndpoints({
            endpoints: phoneEndpoints,
            args: {phone: args, email: null, password: password.trim()},
            dispatch: queryApi.dispatch,
          });
          return responce;
        }
        if (email) {
          const responce = await registerCallbackEndpoints({
            endpoints: emailEndpoints,
            args: {phone: null, email: args, password: password.trim()},
            dispatch: queryApi.dispatch,
          });
          return responce;
        }

        return {
          data: null,
          error: {
            msg: 'error',
            args: {data, password, agreements},
            extra: {
              data: {error: true, value: ''},
              password: {error: true, value: ''},
              agreements: {error: false, value: ''},
            },
          },
        };
      },
    }),
  }),
});
