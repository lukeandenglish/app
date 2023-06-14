/* eslint-disable @typescript-eslint/no-shadow */
import {createApi} from '@reduxjs/toolkit/query';
import {ENPOINTS} from '../../../api/endpoints/register';
import REDUCER_PATH from '../../../config/reducer';
import {getCatalogDeck} from './helper';
import * as R from 'ramda';
import {registerCallbackEndpoints} from '../../../api/registerCallbackEndpoints';
import {baseQueryAuth} from './baseQueryAuth';

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
  baseQuery: baseQueryAuth,
  endpoints: builder => ({
    myProfile: builder.query<iSignUpEmail, any>({
      query: () => ({
        url: ENPOINTS.ME,
        method: ENPOINTS.GET,
      }),
    }),
    updateMyFuncProfile: builder.query({
      query: ({id, username, avatar, language, receiveReminders}) => ({
        url: [ENPOINTS.USERS, id].join('/'),
        method: ENPOINTS.POST,
        body: {
          username,
          avatar,
          language,
          receiveReminders,
        },
      }),
    }),
    updateMyProfile: builder.query<iSignUpEmail, any>({
      async queryFn(
        args: {
          username?: string;
          avatar_url?: string;
          language?: string;
          receiveReminders?: true;
        },
        {getState, dispatch},
      ) {
        try {
          const userProfile = getState()?.[REDUCER_PATH.USER].userProfile?.user;

          const data = {
            id: userProfile.id,
            username: args.username ?? userProfile.username,
            avatar: args.avatar_url ?? userProfile.avatar_url,
            language: args.language ?? userProfile.language ?? 'RU',
            receiveReminders:
              args.receiveReminders ?? userProfile.receiveReminders ?? false,
          };

          const updateProfile = await registerCallbackEndpoints({
            endpoints: deckCard.endpoints.updateMyFuncProfile,
            dispatch,
            args: data,
          });

          if (R.isNil(updateProfile?.data)) {
            return updateProfile;
          }

          const myProfile = await registerCallbackEndpoints({
            endpoints: deckCard.endpoints.myProfile,
            dispatch,
            args: {},
          });
          if (R.isNil(myProfile?.data)) {
            return myProfile;
          }

          return {data: myProfile, error: null};
        } catch (e) {
          console.log(e);
        }
      },
    }),
    deckCardHome: builder.query<iSignUpEmail, any>({
      queryFn(_args) {
        return {data: getCatalogDeck()};
      },
    }),
  }),
});
