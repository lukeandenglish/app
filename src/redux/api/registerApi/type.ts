interface iTypeRegister {
  email: string;
  password: string;
  type: 'EMAIL' | 'PHONE';
  phone: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  accountId: string;
  access_token: string;
  idToken: string;
  token: string;
}

export interface iGmailPassword {
  email: iTypeRegister['email'];
  accountId: iTypeRegister['accountId'];
  access_token: iTypeRegister['access_token'];
  idToken: iTypeRegister['idToken'];
}

export interface iResetPassword {
  userId: iTypeRegister['userId'];
  token: iTypeRegister['accessToken'];
  password: iTypeRegister['password'];
}

export interface iSignUpEmail {
  email: iTypeRegister['email'];
  password: iTypeRegister['password'];
  type?: iTypeRegister['type'];
  phone: iTypeRegister['phone'];
}
export interface iCurrentUserId {
  userId: iTypeRegister['userId'];
}
export interface iCurrentToken extends iTokenResieve {
  userId: iTypeRegister['userId'];
}
export interface iSignUpPhone {
  phone: iTypeRegister['phone'];
  password: iTypeRegister['password'];
}
export interface IUserProfile {
  email: iTypeRegister['email'];
  phone: iTypeRegister['phone'];
  password: iTypeRegister['password'];
}

export interface iGmailToken extends iTokenResieve {
  userProfile: any;
  idToken: string;
  modeRegister?: string;
  createdAt?: number;
}
export interface iResetPassword extends iTokenResieve {
  userId: iTypeRegister['userId'];
  password: iTypeRegister['password'];
}

export interface iVerifyPassword {
  userId: iTypeRegister['userId'];
  token: iTypeRegister['token'];
}

export interface iTokenResieve {
  accessToken: iTypeRegister['accessToken'];
  refreshToken: iTypeRegister['refreshToken'];
}
