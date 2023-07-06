/* eslint-disable @typescript-eslint/no-shadow */
import {createApi} from '@reduxjs/toolkit/query';
import {baseQuery} from './baseQuery';

import REDUCER_PATH from '../../../config/reducer';
import {REGISTER_ENDPOINTS} from './endpoints';
import {iCurrentUserId} from './type';

export const homeApi = createApi({
  reducerPath: REDUCER_PATH.HOME_CARD,
  baseQuery,
  endpoints: builder => ({
    listCard: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.listCard),
    listVideo: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.listVideo),
    listUser: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.listUser),
  }),
});
