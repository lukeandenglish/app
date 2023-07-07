/* eslint-disable @typescript-eslint/no-shadow */
import {createApi} from '@reduxjs/toolkit/query';
import REDUCER_PATH from '../../../config/reducer';
import {REGISTER_ENDPOINTS} from './endpoints';
import {iCurrentUserId} from './type';
import {baseQuery} from '../../../api/baseQuery';

export const homeApi = createApi({
  reducerPath: REDUCER_PATH.HOME_CARD,
  baseQuery,
  endpoints: builder => ({
    currentStack: builder.query(REGISTER_ENDPOINTS.currentStack),
    addedFavour: builder.query(REGISTER_ENDPOINTS.addedFavour),
    copyStack: builder.query(REGISTER_ENDPOINTS.copyStack),
    translateText: builder.query(REGISTER_ENDPOINTS.translateText),
    putNewWordStack: builder.query(REGISTER_ENDPOINTS.putNewWordStack),

    listCard: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.listCard),
    listVideo: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.listVideo),
    listUser: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.listUser),
    listLuke: builder.query<iCurrentUserId, any>(REGISTER_ENDPOINTS.listLuke),
  }),
});
