import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as R from 'ramda';
import {Alert} from 'react-native';
import {registerApi} from './index';
import {GOOGLE_ID} from '../../../../cred';
import {
  errorBuilderMessage,
  registerCallbackEndpoints,
} from '../../../api/registerCallbackEndpoints';
import {RootState} from '../../../api/store';
import REDUCER_PATH from '../../../config/reducer';
import {isCheckElement} from '../../../helper';
import {iGmailToken} from './type';

const selectorUserProfile = (store: RootState) => {
  const [data, password, agreements] = R.pipe(
    R.path([REDUCER_PATH.USER]),
    R.paths([['email'], ['password'], ['agreements'], ['name'], ['image']]),
  )(store);
  return [data, password, agreements];
};

export const FUNCTION = {
  receiveQuery: {
    async queryFn(_args, queryApi) {
      const [data, password, agreements] = selectorUserProfile(
        queryApi.getState(),
      );

      const emailEndpoints = registerApi.endpoints.emailSignUp;
      const phoneEndpoints = registerApi.endpoints.phoneSignUp;
      if (!agreements) {
        return errorBuilderMessage({
          args: {data, password, agreements},
          extra: {
            data: {error: false, value: ''},
            password: {error: false, value: ''},
            agreements: {error: true, value: ''},
          },
        });
      }

      const {args, phone, email} = isCheckElement(data);
      if (phone) {
        const responce = await registerCallbackEndpoints({
          endpoints: phoneEndpoints,
          args: {phone: args, email: null, password: password.trim()},
          dispatch: queryApi.dispatch,
        });
        return responce;
      }
      if (email) {
        const responce = await registerCallbackEndpoints({
          endpoints: emailEndpoints,
          args: {phone: null, email: args, password: password.trim()},
          dispatch: queryApi.dispatch,
        });
        return responce;
      }

      return errorBuilderMessage({
        args: {data, password, agreements},
        extra: {
          data: {error: false, value: ''},
          password: {error: false, value: ''},
          agreements: {error: true, value: ''},
        },
      });
    },
  },
  signUpQuery: {
    async queryFn(_args, queryApi) {
      const [data, password, agreements] = selectorUserProfile(
        queryApi.getState(),
      );
      const emailEndpoints = registerApi.endpoints.emailSignUp;
      const phoneEndpoints = registerApi.endpoints.phoneSignUp;
      if (!agreements) {
        return errorBuilderMessage({
          args: {data, password, agreements},
          extra: {
            data: {error: false, value: ''},
            password: {error: false, value: ''},
            agreements: {error: true, value: ''},
          },
        });
      }

      const {args, phone, email} = isCheckElement(data);
      if (phone) {
        const responce = await registerCallbackEndpoints({
          endpoints: phoneEndpoints,
          args: {phone: args, email: null, password: password.trim()},
          dispatch: queryApi.dispatch,
        });
        return responce;
      }
      if (email) {
        const responce = await registerCallbackEndpoints({
          endpoints: emailEndpoints,
          args: {phone: null, email: args, password: password.trim()},
          dispatch: queryApi.dispatch,
        });
        return responce;
      }

      return errorBuilderMessage({
        args: {data, password, agreements},
        extra: {
          data: {error: false, value: ''},
          password: {error: false, value: ''},
          agreements: {error: true, value: ''},
        },
      });
    },
  },
  loginQuery: {
    async queryFn(_args, queryApi) {
      const [data, password, agreements] = selectorUserProfile(
        queryApi.getState(),
      );

      const emailEndpoints = registerApi.endpoints.emailLogin;
      const phoneEndpoints = registerApi.endpoints.phoneLogin;

      const {args, phone, email} = isCheckElement(data);
      if (phone) {
        const responce = await registerCallbackEndpoints({
          endpoints: phoneEndpoints,
          args: {phone: args, email: null, password: password.trim()},
          dispatch: queryApi.dispatch,
        });
        return responce;
      }
      if (email) {
        const responce = await registerCallbackEndpoints({
          endpoints: emailEndpoints,
          args: {phone: null, email: args, password: password.trim()},
          dispatch: queryApi.dispatch,
        });
        return responce;
      }

      return errorBuilderMessage({
        args: {data, password, agreements},
        extra: {
          data: {error: false, value: ''},
          password: {error: false, value: ''},
          agreements: {error: true, value: ''},
        },
      });
    },
  },
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
};
