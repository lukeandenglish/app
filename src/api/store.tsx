import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {batchedSubscribe} from 'redux-batched-subscribe';
import {persistReducer, persistStore} from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import Reactotron from '../../ReactotronConfig';
import {reducerBranch} from '../redux/action/register';
import REDUCER_PATH from '../config/reducer';
import * as R from 'ramda';
// import { createLogger } from 'redux-logger';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {registerApi} from '../redux/api/registerApi';
import {Notifier, NotifierComponents} from 'react-native-notifier';

export const PERSIST_STORAGE = {
  auth: {
    key: REDUCER_PATH.USER,
    storage: AsyncStorage,
  },
};

const rootReducer = combineReducers({
  [REDUCER_PATH.USER]: persistReducer(PERSIST_STORAGE.auth, reducerBranch),
  [REDUCER_PATH.REGISTER]: registerApi.reducer,
}) as any;

const debounceNotify = _.debounce(notify => notify());

const store = configureStore({
  enhancers: [batchedSubscribe(debounceNotify), Reactotron.createEnhancer!()],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: true,
    })
      .concat(thunkMiddleware)
      .concat(registerApi.middleware)
      .concat(promiseMiddleware),
  // .concat(createLogger({ diff: false }))
  preloadedState: {},
  reducer: rootReducer,
}) as any;

type AppDispatch = ReturnType<(typeof store)['dispatch']>;
type RootState = ReturnType<(typeof store)['getState']>;

export const useAppDispatch = () => useDispatch();
export const useTypedSelector = useSelector;

export const persistor = persistStore(store);
export {store};
export type {AppDispatch, RootState};
setupListeners(store.dispatch);

export const registerCallbackEndpoints = async ({
  endpoints,
  args,
  dispatch,
}: {
  endpoints: any;
  args: any;
  dispatch: AppDispatch;
}) => {
  try {
    const customDispatch = dispatch ?? store.dispatch;
    const result = await customDispatch(
      endpoints.initiate(args, {forceRefetch: true}),
    );
    if (result.isError) {
      Notifier.showNotification({
        title: 'The request was failed',
        description: result.error.data?.error,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }

    return R.pickAll(['data', 'error'])(result);
  } catch (e) {
    Notifier.showNotification({
      title: 'The request was failed',
      description: e.message,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error',
      },
    });
    return {
      data: null,
      error: JSON.stringify(e.message),
    };
  }
};
