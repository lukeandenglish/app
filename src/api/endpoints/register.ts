import yaml from 'yaml';

const yamlString = `
GET: GET
POST: POST
HELPER:
    TRANSLATE_TEXT:
        METHOD: POST
        ROUTE: card/translate
USER:
    LEVEL:
        METHOD: POST
        ROUTE: user/level
    FAVORITE:
        METHOD: POST
        ROUTE: favorite
    FAVORITES_LIST:
        METHOD: GET
        ROUTE: favorite/stack-list
    STACK_FOVORITE:
        METHOD: GET
        ROUTE: favorite/stack-ids
AUTH:
    SIGN_UP:
        METHOD: POST
        ROUTE: auth/sign-up
    VERIFY:
        METHOD: POST
        ROUTE: auth/verification
    LOGIN:
        METHOD: POST
        ROUTE: auth/login
    REFRESH:
        METHOD: POST
        ROUTE: auth/refresh-token
    FORGOT:
        METHOD: POST
        ROUTE: auth/forgot-password
    RESET_PASSWORD:
        METHOD: POST
        ROUTE: auth/reset-password
    GOOGLE:
        METHOD: POST
        ROUTE: auth/google
STACK:
    LUKE_SEARCH:
        METHOD: GET
        ROUTE: stack/admin-list
    USER_LIST:
        METHOD: GET
        ROUTE: stack/user-list
    ONE_STACK:
        METHOD: GET
        ROUTE: stack
    ILUSTRATION:
        METHOD: GET
        ROUTE: file/illustrations
    COPY_STACK:
        METHOD: POST
        ROUTE: stack/copy
    CREATE: 
        METHOD: POST
        ROUTE: stack
    UPDATE: 
        METHOD: PUT
        ROUTE: stack
    DELETE: 
        METHOD: DELETE
        ROUTE: stack
CARD:
    CREATE:
        METHOD: POST
        ROUTE: card
    UPDATE:
        METHOD: PUT
        ROUTE: card
    DELETE:
        METHOD: DELETE
        ROUTE: card
`;

type iUserList = 'LEVEL' | 'FAVORITE' | 'STACK_FOVORITE' | 'FAVORITES_LIST';
type iCardList = 'CREATE' | 'UPDATE' | 'DELETE';
type iHelperList = 'TRANSLATE_TEXT';

type iStackList =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'USER_LIST'
  | 'LUKE_SEARCH'
  | 'ONE_STACK'
  | 'ILUSTRATION'
  | 'COPY_STACK';

type iAuthList =
  | 'SIGN_UP'
  | 'VERIFY'
  | 'LOGIN'
  | 'REFRESH'
  | 'FORGOT'
  | 'VERIFY'
  | 'RESET_PASSWORD'
  | 'GOOGLE';

type iResponce = {
  METHOD: string;
  ROUTE: string;
};

type iHelper = Record<iHelperList, iResponce>;
type iUser = Record<iUserList, iResponce>;
type iCard = Record<iCardList, iResponce>;
type iStack = Record<iStackList, iResponce>;
type iAuth = Record<iAuthList, iResponce>;

export const ENPOINTS = yaml.parse(yamlString) as {
  GET: string;
  AUTH: iAuth;
  STACK: iStack;
  CARD: iCard;
  USER: iUser;
  HELPER: iHelper;
};
