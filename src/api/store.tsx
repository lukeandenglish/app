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
// import { createLogger } from 'redux-logger';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {registerApi} from '../redux/api/registerApi';
import {homeApi} from '../redux/api/homeCard';

export const PERSIST_STORAGE = {
  auth: {
    key: REDUCER_PATH.USER,
    storage: AsyncStorage,
  },
};

const rootReducer = combineReducers({
  [REDUCER_PATH.USER]: persistReducer(PERSIST_STORAGE.auth, reducerBranch),
  [registerApi.reducerPath]: registerApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
}) as any;

const debounceNotify = _.debounce(notify => notify());

const store = configureStore({
  enhancers: [batchedSubscribe(debounceNotify), Reactotron.createEnhancer!()],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(thunkMiddleware)
      .concat(registerApi.middleware)
      .concat(homeApi.middleware)
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
