/* eslint-disable @typescript-eslint/no-shadow */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import REDUCER_PATH from '../../../config/reducer';
import {getCatalogDeck} from './helper';

export interface iSignUpEmail {
  email: string;
  password: string;
}
export interface iSignUpPhone {
  phone: string;
  password: string;
}

export const deckCard = createApi({
  reducerPath: REDUCER_PATH.DECK_CARD,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.lukeandenglish.com/',
    prepareHeaders: headers => {
      headers.set(
        'x-api-key',
        'a5de976afb69939cd1e0bfc0da797ca5ab10047ecc0a54301dcc01f2bc2a7142',
      );
      headers.set('Access-Control-Allow-Origin', '*');

      return headers;
    },
  }),
  endpoints: builder => ({
    deckCardHome: builder.query<iSignUpEmail, any>({
      queryFn(_args, queryApi) {
        return {data: getCatalogDeck()};
      },
    }),
  }),
});
