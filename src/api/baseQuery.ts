import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import cred from '../../cred';
import {store} from './store';
import * as R from 'ramda';
import REDUCER_PATH from '../config/reducer';

export const baseQuery = fetchBaseQuery({
  baseUrl: cred.URI,
  prepareHeaders: headers => {
    const token = R.pipe(
      x => x?.getState(),
      R.path([REDUCER_PATH.USER]),
      R.path(['token', 'accessToken']),
    )(store);
    headers.set('x-api-key', cred.XAPI_KEY);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Authorization', `Bearer ${token}`);

    return headers;
  },
});
