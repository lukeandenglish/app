import yaml from 'yaml';

const yamlString = `
GET: GET
POST: POST
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
        METHOD: DELETE
        ROUTE: card
    UPDATE:
        METHOD: DELETE
        ROUTE: card
    DELETE:
        METHOD: DELETE
        ROUTE: card

`;

export const ENPOINTS = yaml.parse(yamlString);
