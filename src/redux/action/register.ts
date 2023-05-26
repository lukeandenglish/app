import {createAction, createReducer} from '@reduxjs/toolkit';

export const actionChangeEmail = createAction('changeEmail');
export const actionChangePassword = createAction('changePassword');
export const actionChangeReset = createAction('changeReset');
export const actionChangeAgreements = createAction('changeAgreements');

export interface IUserProfile {
  email: string;
  password: string;
  agreements: boolean;
}

const initialState = {email: '', password: '', agreements: false};

export const reducerBranch = createReducer(initialState, (builder: any) => {
  builder
    .addCase(
      actionChangeEmail,
      (state: IUserProfile, action: {payload: IUserProfile['email']}) => {
        state.email = action.payload;
      },
    )
    // You can chain calls, or have separate `builder.addCase()` lines each time
    .addCase(
      actionChangePassword,
      (state: IUserProfile, action: {payload: IUserProfile['password']}) => {
        state.password = action.payload;
      },
    )
    .addCase(actionChangeAgreements, (state: IUserProfile) => {
      state.agreements = !state?.agreements;
    })
    .addCase(actionChangeReset, (state: IUserProfile) => {
      state.email = initialState.email;
      state.password = initialState.password;
      state.agreements = initialState.agreements;
    });
});
