import {createAction, createReducer} from '@reduxjs/toolkit';

export const actionChangeEmail = createAction('changeEmail');
export const actionChangeName = createAction('changeName');
export const actionChangePassword = createAction('changePassword');
export const actionChangeReset = createAction('changeReset');
export const actionChangeAgreements = createAction('changeAgreements');
export const actionChangeApperance = createAction('changeApperance');
export const actionChangeImage = createAction('changeImage');
export interface IUserProfile {
  email: string;
  password: string;
  agreements: boolean;
  name: string;
  apperance: number;
  image: string | null;
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

    .addCase(actionChangeAgreements, (state: IUserProfile) => {
      state.agreements = !state?.agreements;
    })

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
    });
});
