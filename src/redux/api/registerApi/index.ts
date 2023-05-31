import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import REDUCER_PATH from '../../../config/reducer';
import * as R from 'ramda';
import {registerCallbackEndpoints} from '../../../api/store';
import {t} from '@lingui/macro';
import {Alert} from 'react-native';

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
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.lukeandenglish.com/'}),
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
