import {fetchBaseQuery} from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.lukeandenglish.com/',
  prepareHeaders: headers => {
    headers.set(
      'x-api-key',
      'a5de976afb69939cd1e0bfc0da797ca5ab10047ecc0a54301dcc01f2bc2a7142',
    );
    headers.set('Access-Control-Allow-Origin', '*');

    return headers;
  },
});
