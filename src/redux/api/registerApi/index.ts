/* eslint-disable @typescript-eslint/no-shadow */
import {createApi} from '@reduxjs/toolkit/query';
import {baseQuery} from './baseQuery';

import REDUCER_PATH from '../../../config/reducer';
import {REGISTER_ENDPOINTS} from './endpoints';
import {FUNCTION} from './functions';
import {
  iCurrentUserId,
  iCurrentToken,
  iSignUpEmail,
  iSignUpPhone,
} from './type';

export const registerApi = createApi({
  reducerPath: REDUCER_PATH.REGISTER,

  baseQuery,
  endpoints: builder => ({
    emailToken: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.emailToken,
    ),
    phoneToken: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.phoneToken,
    ),

    phoneVerify: builder.query<iCurrentToken, any>(
      REGISTER_ENDPOINTS.phoneVerify,
    ),
    passwordReset: builder.query<{email: iSignUpEmail['email']}, any>(
      REGISTER_ENDPOINTS.passwordReset,
    ),
    smsPassword: builder.query<{phone: iSignUpPhone['phone']}, any>(
      REGISTER_ENDPOINTS.smsPassword,
    ),

    emailSignUp: builder.query<iSignUpEmail, any>(
      REGISTER_ENDPOINTS.emailSignUp,
    ),
    emailLogin: builder.query<iSignUpEmail, any>(REGISTER_ENDPOINTS.emailLogin),
    phoneSignUp: builder.query<iSignUpPhone, any>(
      REGISTER_ENDPOINTS.phoneSignUp,
    ),
    phoneLogin: builder.query<iSignUpPhone, any>(REGISTER_ENDPOINTS.phoneLogin),
    logOutUser: builder.query<iSignUpEmail, any>(REGISTER_ENDPOINTS.logOutUser),
    deleteUser: builder.query<iSignUpEmail, any>(REGISTER_ENDPOINTS.deleteUser),
    initialGoogleSignUp: builder.query<iSignUpEmail, any>(
      FUNCTION.initialGoogleSignUp,
    ),
    handleSignGoogle: builder.query<iSignUpEmail, any>(
      FUNCTION.handleSignGoogle,
    ),
    handleSignApple: builder.query<iSignUpEmail, any>(FUNCTION.handleSignApple),
    receiveQuery: builder.query<iSignUpEmail, any>(FUNCTION.receiveQuery),
    signUpQuery: builder.query<iSignUpEmail, any>(FUNCTION.signUpQuery),
    loginQuery: builder.query<iSignUpEmail, any>(FUNCTION.loginQuery),
  }),
});
