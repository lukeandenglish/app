import {ENPOINTS} from '../../../api/endpoints/register';

export const REGISTER_ENDPOINTS = {
  createNewStack: {
    query: ({title, color, fileId, description}) => ({
      url: ENPOINTS.STACK.CREATE.ROUTE,
      method: ENPOINTS.STACK.CREATE.METHOD,
      body: {
        title: [title ?? ''].join().trim(),
        color,
        fileId,
        description: [description ?? ''].join('').trim(),
      },
    }),
  },
  putNewWordStack: {
    query: ({stackId, title, translatedText, cardId}) => ({
      url: ENPOINTS.CARD.UPDATE.ROUTE,
      method: ENPOINTS.CARD.UPDATE.METHOD,
      body: {stackId, title, translatedText, cardId},
    }),
  },
  deleteNewWordStack: {
    query: ({stackId, cardId}) => ({
      url: ENPOINTS.CARD.DELETE.ROUTE,
      method: ENPOINTS.CARD.DELETE.METHOD,
      body: {stackId, cardId},
    }),
  },
  createNewWordStack: {
    query: ({stackId, title, translatedText}) => ({
      url: ENPOINTS.CARD.CREATE.ROUTE,
      method: ENPOINTS.CARD.CREATE.METHOD,
      body: {stackId, title, translatedText},
    }),
  },
  getListIllustration: {
    query: () => ({
      url: [
        ENPOINTS.STACK.ILUSTRATION.ROUTE,
        '?',
        'limit=50',
        '&offset=0',
      ].join(''),
      method: ENPOINTS.STACK.ILUSTRATION.METHOD,
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
  | 'deleteNewWordStack'
  | 'putNewWordStack'
  | 'createNewWordStack'
  | 'listUser'
  | 'addedFavour'
  | 'copyStack'
  | 'getListIllustration'
  | 'listVideo'
  | 'translateText'
  | 'listLuke'
  | 'listCard'
  | 'createNewStack'
  | 'currentStack';
