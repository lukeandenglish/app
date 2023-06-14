import yaml from 'yaml';

const yamlString = `
POST: POST
PHONE_TOKEN: phone-token
EMAIL_TOKEN: email-token
PHONE_VERIFY: phone-verify
PASSWORD_RESET: password-reset
EMAIL_SIGNUP: email-signup
EMAIL_LOGIN: email-login
PHONE_SIGNUP: phone-signup
PHONE_LOGIN: phone-login
ME: me
USERS: users
`;

export const ENPOINTS = yaml.parse(yamlString);
