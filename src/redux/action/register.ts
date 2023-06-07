import {createAction, createReducer} from '@reduxjs/toolkit';
import {registerApi} from '../api/registerApi';
import {MODERATE_STYLE} from '../extraReducer/helper';

export const actionChangeEmail = createAction('changeEmail');
export const actionChangeName = createAction('changeName');
export const actionChangePassword = createAction('changePassword');
export const actionChangePasswordRepeat = createAction('changePasswordRepeat');
export const actionChangeReset = createAction('changeReset');
export const actionChangeAgreements = createAction('changeAgreements');
export const actionChangeApperance = createAction('changeApperance');
export const actionChangeImage = createAction('changeImage');
export const actionSignOut = createAction('changeSignOut');

export interface IUserProfile {
  email: string;
  password: string;
  passwordRepeat: string;
  agreements: boolean;
  name: string;
  apperance: number;
  image: string | null;
  loading: boolean;
}

export interface iGmailToken {
  userProfile: any;
  accessToken: string;
  idToken: string;
  modeRegister?: string;
  createdAt?: number;
}

const initialState = {
  email: '',
  password: '',
  agreements: false,
  name: '',
  apperance: 2,
  image: null,
};

export const reducerBranch = createReducer(initialState, (builder: any) => {
  builder
    .addCase(
      actionChangeEmail,
      (state: IUserProfile, action: {payload: IUserProfile['email']}) => {
        state.email = action.payload;
      },
    )
    .addCase(actionSignOut, () => {
      return initialState;
    })
    .addCase(
      actionChangeImage,
      (state: IUserProfile, action: {payload: IUserProfile['image']}) => {
        state.image = action.payload;
      },
    )
    // You can chain calls, or have separate `builder.addCase()` lines each time
    .addCase(
      actionChangePassword,
      (state: IUserProfile, action: {payload: IUserProfile['password']}) => {
        state.password = action.payload;
      },
    )
    .addCase(
      actionChangePasswordRepeat,
      (
        state: IUserProfile,
        action: {payload: IUserProfile['passwordRepeat']},
      ) => {
        state.passwordRepeat = action.payload;
      },
    )

    .addCase(
      actionChangeAgreements,
      (state: IUserProfile, action: {payload?: boolean}) => {
        state.agreements = action?.payload ?? !state?.agreements;
      },
    )

    .addCase(
      actionChangeApperance,
      (state: IUserProfile, action: {payload: IUserProfile['apperance']}) => {
        state.apperance = action.payload;
      },
    )
    .addCase(
      actionChangeName,
      (state: IUserProfile, action: {payload: IUserProfile['name']}) => {
        state.name = action.payload;
      },
    )
    .addCase(actionChangeReset, (state: IUserProfile) => {
      state.email = initialState.email;
      state.password = initialState.password;
      state.agreements = initialState.agreements;
      state.name = initialState.name;
    })
    .addMatcher(
      registerApi.endpoints.handleSignGoogle.matchFulfilled,
      (state, responce: {payload: {tokens: iGmailToken; userProfile: any}}) => {
        const data = responce.payload.tokens as iGmailToken;
        const userProfile = responce.payload.userProfile as iGmailToken;
        return MODERATE_STYLE(MODERATE_STYLE(state).DIS_LOADING()).GMAIL_LOGIN(
          data,
          userProfile,
        );
      },
    )
    // API START
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
    // API PENDING
    .addMatcher(registerApi.endpoints.emailLogin.matchPending, state => {
      return MODERATE_STYLE(state).IS_LOADING();
    })
    .addMatcher(registerApi.endpoints.handleSignGoogle.matchRejected, state => {
      return MODERATE_STYLE(state).GMAIL_LOGIN_REJECT();
    })
    .addMatcher(registerApi.endpoints.emailSignUp.matchPending, state => {
      return MODERATE_STYLE(state).IS_LOADING();
    })
    .addMatcher(registerApi.endpoints.phoneSignUp.matchPending, state => {
      return MODERATE_STYLE(state).IS_LOADING();
    })
    .addMatcher(registerApi.endpoints.phoneLogin.matchPending, state => {
      return MODERATE_STYLE(state).IS_LOADING();
    })
    // API REJECT
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
});
