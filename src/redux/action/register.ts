import {createAction, createReducer} from '@reduxjs/toolkit';
import {registerApi} from '../api/registerApi';
import {MODERATE_STYLE} from '../extraReducer/helper';
import {apiResponceGauder} from './apiResponceGauder';
import {IUserProfile, iGmailToken} from '../api/registerApi/type';

export const actionChangeEmail = createAction('changeEmail');
export const actionChangeName = createAction('changeName');
export const actionChangePassword = createAction('changePassword');
export const actionChangePasswordRepeat = createAction('changePasswordRepeat');
export const actionChangeReset = createAction('changeReset');
export const actionChangeAgreements = createAction('changeAgreements');
export const actionChangeApperance = createAction('changeApperance');
export const actionChangeImage = createAction('changeImage');
export const actionSignOut = createAction('changeSignOut');

const initialState = {
  email: '',
  password: '',
  agreements: false,
  name: '',
  apperance: 2,
  image: null,
};

export const reducerBranch = createReducer(initialState, (builder: any) => {
  apiResponceGauder(
    builder
      .addCase(
        actionChangeEmail,
        (state: IUserProfile, action: {payload: IUserProfile['email']}) => {
          state.email = action.payload;
          console.log(state);
          return state;
        },
      )
      .addCase(actionSignOut, () => {
        return initialState;
      })
      .addCase(
        actionChangeImage,
        (state: IUserProfile, action: {payload: IUserProfile['image']}) => {
          state.image = action.payload;
          return state;
        },
      )
      .addCase(
        actionChangePassword,
        (state: IUserProfile, action: {payload: IUserProfile['password']}) => {
          state.password = action.payload;
          return state;
        },
      )
      .addCase(
        actionChangePasswordRepeat,
        (
          state: IUserProfile,
          action: {payload: IUserProfile['passwordRepeat']},
        ) => {
          state.passwordRepeat = action.payload;
          return state;
        },
      )

      .addCase(
        actionChangeAgreements,
        (state: IUserProfile, action: {payload?: boolean}) => {
          state.agreements = action?.payload ?? !state?.agreements;
          return state;
        },
      )

      .addCase(
        actionChangeApperance,
        (state: IUserProfile, action: {payload: IUserProfile['apperance']}) => {
          state.apperance = action.payload;
          return state;
        },
      )
      .addCase(
        actionChangeName,
        (state: IUserProfile, action: {payload: IUserProfile['name']}) => {
          state.name = action.payload;
          return state;
        },
      )
      .addCase(actionChangeReset, (state: IUserProfile) => {
        state.email = initialState.email;
        state.password = initialState.password;
        state.agreements = initialState.agreements;
        state.name = initialState.name;
        return state;
      })
      .addMatcher(
        registerApi.endpoints.handleSignGoogle.matchFulfilled,
        (
          state,
          responce: {payload: {tokens: iGmailToken; userProfile: any}},
        ) => {
          const data = responce.payload.tokens as iGmailToken;
          const userProfile = responce.payload.userProfile as iGmailToken;
          return MODERATE_STYLE(
            MODERATE_STYLE(state).DIS_LOADING(),
          ).GMAIL_LOGIN(data, userProfile);
        },
      ),
  );
});

export {IUserProfile};
