import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as R from 'ramda';
import {Alert} from 'react-native';
import {GOOGLE_ID} from '../../../../cred';
import {errorBuilderMessage} from '../../../api/registerCallbackEndpoints';
import {RootState} from '../../../api/store';
import REDUCER_PATH from '../../../config/reducer';
import {iGmailToken} from './type';
import {registerApi} from '.';

export const selectorUserProfile = (store: RootState) => {
  const [email, password, agreements, name, image, passwordRepeat] = R.pipe(
    R.path([REDUCER_PATH.USER]),
    R.paths([
      ['email'],
      ['password'],
      ['agreements'],
      ['username'],
      ['image'],
      ['passwordRepeat'],
    ]),
  )(store);
  return [email, password, agreements, name, image, passwordRepeat];
};

export const selectorAuthUserProfile = (store: RootState) => {
  const [email, phone, name, image] = R.pipe(
    R.path([REDUCER_PATH.USER, 'userProfile', 'user']),
    R.paths([['email'], ['phone'], ['username'], ['image']]),
  )(store);
  return [email, phone, name, image];
};

export const FUNCTION = {
  handleSignApple: {
    async queryFn(_args) {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        return errorBuilderMessage({
          args: {},
          extra: {
            apple: {
              error: false,
              value: 'Apple Sign-In failed - no identify token returned',
            },
          },
        });
      }

      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const tokens = await auth().signInWithCredential(appleCredential);
      return new Promise((res, reject) => {
        auth().onAuthStateChanged(userProfile => {
          try {
            Alert.alert(JSON.stringify(userProfile, null, 5));
            const responce = {data: {tokens, userProfile}};
            res(responce);
            return responce;
          } catch (e) {
            const errorMsg = errorBuilderMessage({
              args: {},
              extra: {
                apple: {
                  error: false,
                  value: e.message,
                },
              },
            });
            reject(errorMsg);
          }
        });
      });
    },
  },
  handleSignGoogle: {
    async queryFn(_args) {
      try {
        await auth().signOut().catch(console.log);
        await GoogleSignin.hasPlayServices();
        const userProfile = await GoogleSignin.signIn();

        const [tokens] = [await GoogleSignin.getTokens()] as [iGmailToken];
        return new Promise((res, reject) => {
          try {
            auth().onAuthStateChanged(() => {
              const responce = {data: {tokens, userProfile}};
              console.log(JSON.stringify(responce));
              res(responce);
            });
          } catch (e) {
            const errorMsg = errorBuilderMessage({
              args: {},
              extra: {
                apple: {
                  error: false,
                  value: e.message,
                },
              },
            });
            reject(errorMsg);
          }
        });
      } catch (e) {
        return errorBuilderMessage({
          args: {},
          extra: {
            apple: {
              error: false,
              value: e.message,
            },
          },
        });
      }
    },
  },
  initialGoogleSignUp: {
    queryFn(_args) {
      try {
        GoogleSignin.configure({
          webClientId: GOOGLE_ID,
        });
        return {data: 'success'};
      } catch (e) {
        return errorBuilderMessage({
          args: {},
          extra: {
            apple: {
              error: false,
              value: e.message,
            },
          },
        });
      }
    },
  },
} as unknown as Record<iStack, any>;

type iStack =
  | 'loginQuery'
  | 'signUpQuery'
  | 'initialGoogleSignUp'
  | 'handleSignApple'
  | 'handleSignGoogle';
