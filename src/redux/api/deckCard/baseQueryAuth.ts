import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import REDUCER_PATH from '../../../config/reducer';
import * as R from 'ramda';

export const baseQueryAuth = fetchBaseQuery({
  baseUrl: 'https://api.lukeandenglish.com/',
  prepareHeaders: (headers, appStore) => {
    headers.set(
      'x-api-key',
      'a5de976afb69939cd1e0bfc0da797ca5ab10047ecc0a54301dcc01f2bc2a7142',
    );
    const token = R.path([REDUCER_PATH.USER, 'tokens', 'accessToken'])(
      appStore.getState(),
    );
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('authorization', ['Bearer', token].join(' '));

    return headers;
  },
});
