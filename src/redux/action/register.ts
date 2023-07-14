import {createAction, createReducer} from '@reduxjs/toolkit';
import {IUserProfile} from '../api/registerApi/type';
import {apiResponceGauder} from './apiResponceGauder';

export const actionChangeUserEmail = createAction('actionChangeUserEmail');
export const actionChangeUserName = createAction('actionChangeUserName');
export const actionChangeUserSurName = createAction('actionChangeUserSurName');
export const actionChangeUserPhone = createAction('actionChangeUserPhone');

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
      .addCase(actionSignOut, () => {
        return initialState;
      })
      .addCase(actionChangeImage, (state, action: {payload}) => {
        state.image = action.payload;
        return state;
      })
      .addCase(actionChangeUserEmail, (state, action: {payload}) => {
        state.email = action.payload;
        return state;
      })
      .addCase(actionChangeUserPhone, (state, action: {payload}) => {
        state.phone = action.payload;
        return state;
      })
      .addCase(actionChangeUserName, (state, action: {payload}) => {
        state.name = action.payload;
        return state;
      })
      .addCase(actionChangeUserSurName, (state, action: {payload}) => {
        state.surname = action.payload;
        return state;
      }),
  );
});

export {IUserProfile};
