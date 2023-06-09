import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {batchedSubscribe} from 'redux-batched-subscribe';
import {persistStore} from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import Reactotron from '../../ReactotronConfig';
// import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({}) as any;

const debounceNotify = _.debounce(notify => notify());

const store = configureStore({
  enhancers: [batchedSubscribe(debounceNotify), Reactotron.createEnhancer!()],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: true,
    })
      .concat(thunkMiddleware)
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
