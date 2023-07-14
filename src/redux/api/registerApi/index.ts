import {createApi} from '@reduxjs/toolkit/query';
import {baseQuery} from './baseQuery';

import REDUCER_PATH from '../../../config/reducer';
import {REGISTER_ENDPOINTS} from './endpoints';
import {FUNCTION} from './functions';
import {iCurrentUserId, iSignUpEmail} from './type';

export const registerApi = createApi({
  reducerPath: REDUCER_PATH.REGISTER,

  baseQuery,
  endpoints: builder => ({
    login: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.login),
    signUp: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.signUp),
    deleteUser: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.deleteUser,
    ),
    forgotPassword: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.forgotPassword,
    ),
    gmailAuth: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.gmailAuth),
    logOutUser: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.logOutUser,
    ),
    phoneVerify: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.phoneVerify,
    ),
    refreshToken: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.refreshToken,
    ),
    resetPassword: builder.query<iCurrentUserId, any>(
      REGISTER_ENDPOINTS.resetPassword,
    ),
 
    handleSignApple: builder.query<iSignUpEmail, any>(FUNCTION.handleSignApple),
    loginQuery: builder.query<iSignUpEmail, any>(FUNCTION.loginQuery),
    handleSignGoogle: builder.query(FUNCTION.handleSignGoogle),
    initialGoogleSignUp: builder.query(FUNCTION.initialGoogleSignUp),
    signUpQuery: builder.query<iSignUpEmail, any>(FUNCTION.signUpQuery),
  }),
});
