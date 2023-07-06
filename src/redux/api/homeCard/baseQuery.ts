import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import cred from '../../../../cred';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/',
  prepareHeaders: headers => {
    headers.set('x-api-key', cred.XAPI_KEY);
    headers.set('Access-Control-Allow-Origin', '*');

    return headers;
  },
});
