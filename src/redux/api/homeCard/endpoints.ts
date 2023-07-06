import {ENPOINTS} from '../../../api/endpoints/register';

export const REGISTER_ENDPOINTS = {
  listCard: {
    query: () => ({
      url: '/list/card.json',
      method: ENPOINTS.GET,
    }),
  },
  listVideo: {
    query: () => ({
      url: '/list/video.json',
      method: ENPOINTS.GET,
    }),
  },
  listUser: {
    query: () => ({
      url: '/list/user.json',
      method: ENPOINTS.GET,
    }),
  },
};
