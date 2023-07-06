import yaml from 'yaml';

const CTX = `
USER: USER
REGISTER: REGISTER
DECK_CARD: DECK_CARD
HOME_CARD: HOME_CARD
`;

export type tRoute = 'USER' | 'REGISTER' | 'DECK_CARD' | 'HOME_CARD';

export default yaml.parse(CTX) as Record<tRoute, string>;
