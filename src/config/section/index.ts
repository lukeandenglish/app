import yaml from 'yaml';

const yamlString = `
HOME:
    WLC_STACK: WLC_STACK
    MY_STACK: MY_STACK
    APPEND_STACK: APPEND_STACK
    VIDEO_STACK: VIDEO_STACK
CARD:
    MY_IMAGE: MY_IMAGE
    MY_RESULT: MY_RESULT
    MY_COLLECTION: MY_COLLECTION
`;

export default yaml.parse(yamlString);
