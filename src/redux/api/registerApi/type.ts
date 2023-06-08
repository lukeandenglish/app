export interface iSignUpEmail {
  email: string;
  password: string;
}
export interface iCurrentUserId {
  user_id: number;
}
export interface iCurrentToken {
  token: string;
}
export interface iSignUpPhone {
  phone: string;
  password: string;
}
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
