import AsyncStorage from '@react-native-async-storage/async-storage';

export const PERSIST_STORAGE = {
  auth: {
    key: 'auth',
    storage: AsyncStorage,
  },
  env: {
    key: 'env',
    storage: AsyncStorage,
  },
  shop: {
    key: 'shop',
    storage: AsyncStorage,
  },
  user: {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['activeUserID', 'list'],
  },
};
