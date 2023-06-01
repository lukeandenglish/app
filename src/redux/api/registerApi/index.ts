/* eslint-disable @typescript-eslint/no-shadow */
import {t} from '@lingui/macro';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import * as R from 'ramda';
import {Alert} from 'react-native';
import {registerCallbackEndpoints} from '../../../api/store';
import REDUCER_PATH from '../../../config/reducer';
import {GOOGLE_ID} from '../../../../cred';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {actionSignOut, iGmailToken} from '../../action/register';
import auth from '@react-native-firebase/auth';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export interface iSignUpEmail {
  email: string;
  password: string;
}
export interface iSignUpPhone {
  phone: string;
  password: string;
}

export const registerApi = createApi({
  reducerPath: REDUCER_PATH.REGISTER,

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.lukeandenglish.com/',
    prepareHeaders: (headers, {getState}) => {
      headers.set('x-api-key', 'dQ3vI8XMdqRV-zmIxAlVylBedyb9BhwF');
      headers.set('Access-Control-Allow-Origin', '*');

      console.log(headers);

      return headers;
    },
  }),
  endpoints: builder => ({
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

        Alert.alert('success');
        if (!agreements) {
          return {data: null, error: t`error.agreements.not.select`};
        }
        const responce = await registerCallbackEndpoints({
          endpoints: Number(data) ? phoneEndpoints : emailEndpoints,
          args: {phone: data, email: data, password},
          dispatch: queryApi.dispatch,
        });
        return responce;
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

        Alert.alert('success');
        if (!agreements) {
          return {data: null, error: t`error.agreements.not.select`};
        }
        const responce = await registerCallbackEndpoints({
          endpoints: Number(data) ? phoneEndpoints : emailEndpoints,
          args: {phone: data, email: data, password},
          dispatch: queryApi.dispatch,
        });
        return responce;
      },
    }),
  }),
});
