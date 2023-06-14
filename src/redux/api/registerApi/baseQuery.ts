import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import cred from '../../../../cred';

export const baseQuery = fetchBaseQuery({
  baseUrl: cred.URI,
  prepareHeaders: headers => {
    headers.set('x-api-key', cred.XAPI_KEY);
    headers.set('Access-Control-Allow-Origin', '*');

    return headers;
  },
});
