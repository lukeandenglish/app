import {ENPOINTS} from '../../../api/endpoints/register';

export const REGISTER_ENDPOINTS = {
  putNewWordStack: {
    query: ({stackId, title, translatedText}) => ({
      url: ENPOINTS.CARD.CREATE.ROUTE,
      method: ENPOINTS.CARD.CREATE.METHOD,
      body: {stackId, title, translatedText},
    }),
  },
  currentStack: {
    query: () => ({
      url: ENPOINTS.STACK.ONE_STACK.ROUTE,
      method: ENPOINTS.STACK.ONE_STACK.METHOD,
    }),
  },
  translateText: {
    query: ({title}: {title: string}) => ({
      url: ENPOINTS.HELPER.TRANSLATE_TEXT.ROUTE,
      method: ENPOINTS.HELPER.TRANSLATE_TEXT.METHOD,
      body: {title},
    }),
  },
  addedFavour: {
    query: ({stackId}: {stackId: string}) => ({
      url: ENPOINTS.USER.FAVORITE.ROUTE,
      method: ENPOINTS.USER.FAVORITE.METHOD,
      body: {stackId},
    }),
  },
  copyStack: {
    query: ({stackId}: {stackId: string}) => ({
      url: ENPOINTS.STACK.COPY_STACK.ROUTE,
      method: ENPOINTS.STACK.COPY_STACK.METHOD,
      body: {stackId},
    }),
  },
  listCard: {
    query: () => ({
      url: ENPOINTS.USER.STACK_FOVORITE.ROUTE,
      method: ENPOINTS.USER.STACK_FOVORITE.METHOD,
      body: {limit: 30, offset: 0},
      transformResponse: (response, meta, arg) => {
        console.log({response});
        return response;
      },
    }),
  },
  listLuke: {
    query: () => ({
      url: ENPOINTS.USER.STACK_FOVORITE.ROUTE,
      method: ENPOINTS.USER.STACK_FOVORITE.METHOD,
      body: {limit: 30, offset: 0},

      transformResponse: (response, meta, arg) => {
        console.log({response});
        return response;
      },
    }),
  },
  listVideo: {
    query: () => ({
      url: ENPOINTS.STACK.LUKE_SEARCH.ROUTE,
      method: ENPOINTS.STACK.LUKE_SEARCH.METHOD,
      body: {limit: 30, offset: 0},

      transformResponse: (response, meta, arg) => {
        console.log({response});
        return response;
      },
    }),
  },
  listUser: {
    query: () => ({
      url: ENPOINTS.USER.FAVORITES_LIST.ROUTE,
      method: ENPOINTS.USER.FAVORITES_LIST.METHOD,
      body: {limit: 30, offset: 0},
      transformResponse: (response, meta, arg) => {
        console.log({response});
        return response;
      },
    }),
  },
} as Record<iStack, any>;

type iStack =
  | 'listUser'
  | 'addedFavour'
  | 'copyStack'
  | 'listVideo'
  | 'translateText'
  | 'listLuke'
  | 'putNewWordStack'
  | 'listCard'
  | 'currentStack';
